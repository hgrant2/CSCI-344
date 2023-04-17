from flask import Response, request
from flask_restful import Resource
from models import Post, Following, db
from views import get_authorized_user_ids
import access_utils

import json

def get_path():
    return request.host_url + 'api/posts/'

def get_list_of_user_ids_in_my_network(user_id):
    following = Following.query.filter_by(user_id=user_id).all()
    me_and_my_friend_ids = [rec.following_id for rec in following]
    me_and_my_friend_ids.append(user_id)
    return me_and_my_friend_ids

class PostListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):
        print("TESTING IDK WTF THIS IS I GOT SPA BRAIN", request.args.get('limit'))
        lim = 20
        try:
            if request.args.get('limit'):
                lim = int(request.args.get('limit'))
        except:
            return Response(
                json.dumps({'error': "Bad data. You can't put letters in as a limit."}), status=400
            ) 
        if lim > 20:
            #lim = 20
            return Response(
                json.dumps({'error': "Bad data fuck off ya hacker. Don't go over 20."}), status=400
            )
        
        

        # lim request.args.get('limit') or 20
        #like wtf is this python is so simple it is stupid

        # get posts created by one of these users:
        following = Following.query.filter_by(user_id=self.current_user.id).all()
       
        #building a list of our friend usernames       
        friend_ids = []
        for record in following:
            friend_ids.append(record.following_id)
        friend_ids.append(self.current_user.id)
        print(friend_ids)
        

        posts = Post.query.filter(Post.user_id.in_(friend_ids)).limit(lim)
        return Response(json.dumps([post.to_dict() for post in posts]), mimetype="application/json", status=200)
       
    def post(self):
       # request.get_json() is holding the data that the user
        # just sent over the network. Stored as a python dictionary
        body = request.get_json()
        if not body.get('image_url'):
            return Response(json.dumps({'error': 'image_url required'}), status=400)

        # convert the data that the user sent over HTTP to a SQLAlchemy object
        new_post = Post(
            image_url=body.get('image_url'),
            user_id=self.current_user.id, # must be a valid user_id or will throw an error
            caption=body.get('caption'),
            alt_text=body.get('alt_text')
        )
        # save it to the database
        db.session.add(new_post)    # issues the insert statement
        db.session.commit()   

        # send the new data object to the user
        return Response(json.dumps(new_post.to_dict()), mimetype="application/json", status=201)

class PostDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    @access_utils.can_modify_or_404
    def patch(self, id):
        '''
        If I want to update a post, what do I do?
        1. Go get the current post. And check if they're authorized.
        2. Update only the items that the user changed
        3. Save to the DB
        4. Return the final representation to the user
        '''
        # update post based on the data posted in the body 
        body = request.get_json()

        post = Post.query.get(id)

        # only update the data fields that the user wants to change:
        if body.get('image_url'):
            post.image_url = body.get('image_url') 
        if body.get('caption'):
            post.caption = body.get('caption')  
        if body.get('alt_text'):
            post.alt_text = body.get('alt_text')  

        # save back to database:
        db.session.commit() 

        return Response(json.dumps(post.to_dict()), mimetype="application/json", status=200)
    
    @access_utils.can_modify_or_404
    def delete(self, id):
        Post.query.filter_by(id=id).delete()
        db.session.commit()
        return Response(json.dumps(None), mimetype="application/json", status=200)

    # def get(self, id):
    #     # get the post based on the id
    #     print("what is the id")
    #     print(id)

    #     # post = Post.query.get(id)
    #     # print("PRINTING THE DAMN POST ", post)

    #      # get posts created by one of these users:
    #     following = Following.query.filter_by(user_id=self.current_user.id).all()
       
    #     #building a list of our friend usernames       
    #      # get the post based on the id
    #     # yourself and your friends
    #     post = Post.query.get(id)
    #     me_and_my_friend_ids = get_list_of_user_ids_in_my_network(self.current_user.id)
    #     if  post is None or post.user_id not in me_and_my_friend_ids:
    #         error_message = {
    #             'error': 'post {0} does not exist.'.format(id)
    #         }
    #         return Response(json.dumps(error_message), mimetype="application/json", status=404)
    #     else:
    #         return Response(json.dumps(post.to_dict()), mimetype="application/json", status=200)


    @access_utils.can_view_or_404
    def get(self, id):
        # get the post based on the id
        # yourself and your friends
        post = Post.query.get(id)
        return Response(json.dumps(post.to_dict()), mimetype="application/json", status=200)
    #check if post is there, then check if post was made by the user we are
    # else 404 because they do not have access???? please be fucking right

        # if post:
        #     print("The post is ", post)
        #     #print("POST TO DICT ", post.to_dict())
        #     if(post.user != self.current_user):
        #         print("THE USER IS NOT 12 IDK WHERE THIS IS RUNNING IF IT WILL RUN")
        #         return Response(
        #             json.dumps({'error': "This user does not have access to this post id."}), status=404
        #         )
        #     return Response(json.dumps(post.to_dict()), mimetype="application/json", status=200)
        # else:
        #     print("The post does not exist ", post)
        #     return Response(
        #         json.dumps({'error': "id not found."}), status=404
        #     )
        
def initialize_routes(api):
    api.add_resource(
        PostListEndpoint, 
        '/api/posts', '/api/posts/', 
        resource_class_kwargs={'current_user': api.app.current_user}
    )
    api.add_resource(
        PostDetailEndpoint, 
        '/api/posts/<int:id>', '/api/posts/<int:id>/',
        resource_class_kwargs={'current_user': api.app.current_user}
    )