from flask import Response, request
from flask_restful import Resource
from models import LikePost, db, Following, Post, User
import json

class PostLikesListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    
    def post(self):
        # create a new "like_post" based on the data posted in the body 
        body = request.get_json()
        print(body)

        #check if post id is an int or not
        try:
            print(body.get('post_id'))
            num = int(body.get('post_id'))
            print(type(num))
        except:
            return Response(json.dumps({'error': 'Incorrect format, The post_id is not an int'}),mimetype="application/json", status=400)

         # check and make sure the post actually exist

        post_exist = Post.query.get(body.get('post_id'))
        if(post_exist == None):
            return Response(json.dumps({'error': 'The post you are trying to bookmark does not exist/ invalid post id'}),mimetype="application/json", status=404)

        print("the post exist ", post_exist)
        print("printing the owner of the post", post_exist.user_id)

         #get users that we are following 
        following = Following.query.filter(Following.user_id==self.current_user.id).all()
        print("printing following ", following)
        following_users = []
        for result in following:
            following_users.append(result.following_id)

        print("printing the users the current user is following: ", following_users)
        if(post_exist.user_id not in following_users):
            print("is this running")
            return Response(json.dumps({'error': 'The post you are trying to like you are not following the current user'}),mimetype="application/json", status=404)

        new_like = LikePost(
            user_id=self.current_user.id,
            post_id=body.get('post_id')
        )

        likes = LikePost.query.filter_by(user_id =self.current_user.id).all()

        print("now going to print likes")
        print(likes)

        list_of_post_ids_in_likes = []
        for like in likes:
            list_of_post_ids_in_likes.append(like.post_id)
        
        print("printing list of post ids from currently liked post by current user: ", list_of_post_ids_in_likes)

        if(new_like.post_id in list_of_post_ids_in_likes):
            print("like already exist")
            return Response(json.dumps({'error': 'This post is already liked'}),mimetype="application/json", status=400)
        

        db.session.add(new_like)
        db.session.commit()
        # print("printing new bookmark before to_dict(): ",new_bookmark)
        # print("printing new bookmark after to_dict(): ", new_bookmark.to_dict())

        return Response(json.dumps(new_like.to_dict()), mimetype="application/json", status=201)

class PostLikesDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    
    def delete(self, id):
        # delete "like_post" where "id"=id
        print("printing bookmark id: ",id)

        likes = LikePost.query.filter_by(user_id =self.current_user.id).all()
        print(likes)
        like_ids = []
        for ids in likes:
            like_ids.append(ids.id)
        print("now printing like ids ", like_ids)
        if(id in like_ids):
            print("are we running in the if statement ")
            LikePost.query.filter_by(id=id).delete()
            db.session.commit()
            return Response(json.dumps(None), mimetype="application/json", status=200)
        else:
            return Response(json.dumps(None), mimetype="application/json", status=404)



def initialize_routes(api):
    api.add_resource(
        PostLikesListEndpoint, 
        '/api/posts/likes', 
        '/api/posts/likes/', 
        resource_class_kwargs={'current_user': api.app.current_user}
    )

    api.add_resource(
        PostLikesDetailEndpoint, 
        '/api/posts/likes/<int:id>', 
        '/api/posts/likes/<int:id>/',
        resource_class_kwargs={'current_user': api.app.current_user}
    )
