from flask import Response, request
from flask_restful import Resource
import json
from models import db, Comment, Post, Following, User

class CommentListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    
    def post(self):
        # create a new "Comment" based on the data posted in the body 
        body = request.get_json()
        print(body)

        if not body.get('text'):
            return Response(json.dumps({'error': 'text required to comment'}), status=400)


        #check if post id is an int or not
        try:
            print(body.get('post_id'))
            num = int(body.get('post_id'))
            print(type(num))
        except:
            return Response(json.dumps({'error': 'Incorrect format, The post_id is not an int'}),mimetype="application/json", status=400)


        # Check if the post actually exist
        post_exist = Post.query.get(body.get('post_id'))
        if(post_exist == None):
            return Response(json.dumps({'error': 'The post you are trying to comment on does not exist'}),mimetype="application/json", status=404)
        

        #get users that we are following 
        following = Following.query.filter(Following.user_id==self.current_user.id).all()
        print("printing following ", following)
        following_users = []
        for result in following:
            following_users.append(result.following_id)

        #add current user to the list
        following_users.append(self.current_user.id)
        print("printing the users the current user is following: ", following_users)
        if(post_exist.user_id not in following_users):
            print("is this running")
            return Response(json.dumps({'error': 'The post you are trying to comment on you are not following the current user'}),mimetype="application/json", status=404)


        new_comment = Comment(
            text=body.get('text'),
            user_id=self.current_user.id,
            post_id=body.get('post_id')
        )

        db.session.add(new_comment)
        db.session.commit()

        return Response(json.dumps(new_comment.to_dict()), mimetype="application/json", status=201)
        
class CommentDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
  
    def delete(self, id):
        # delete "Comment" record where "id"=id
        print("printing comment id: ",id)

        comment = Comment.query.filter_by(id=id).all()
        print("printing what was retrieved from comment: ", comment)

        if (comment == []):
            return Response(json.dumps(None), mimetype="application/json", status=404)

        comment_dict = comment[0].to_dict()
        print("printing comment_dict: ", comment_dict)
        print("testing how tf to access stuff in comment_dict")
        # print(comment_dict.id)


        # TRYING SOMETHING
        id_in_comment = []
        for ids in comment:
            id_in_comment.append(ids.user.id)
        print("testing dumb idea")
        print(id_in_comment)


        if(self.current_user.id in id_in_comment):

            # print("printing comment_dict user: ", comment_dict.user)
            Comment.query.filter_by(id=id).delete()
            db.session.commit()
            return Response(json.dumps(None), mimetype="application/json", status=200)
        
        return Response(json.dumps(None), mimetype="application/json", status=404)



def initialize_routes(api):
    api.add_resource(
        CommentListEndpoint, 
        '/api/comments', 
        '/api/comments/',
        resource_class_kwargs={'current_user': api.app.current_user}

    )
    api.add_resource(
        CommentDetailEndpoint, 
        '/api/comments/<int:id>', 
        '/api/comments/<int:id>/',
        resource_class_kwargs={'current_user': api.app.current_user}
    )
