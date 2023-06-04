from flask import Response
from flask_restful import Resource
from models import Story, User, Following
from views import get_authorized_user_ids
import json
import flask_jwt_extended    


class StoriesListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    
    @flask_jwt_extended.jwt_required()
    def get(self):
        # get stories created by one of these users:
        # print(get_authorized_user_ids(self.current_user))

        #atempting to getting all of the info of users we are currently following
        # return all of the "following" records that the current user is following
        print("About to Query following")
        # following = Following.query.filter(Following.user_id==current_user_id).all()
        following = Following.query.filter(Following.user_id==self.current_user.id).all()
        print("printing following ", following)
        following_users = []
        for result in following:
            following_users.append(result.following_id)

        following_users.append(self.current_user.id)
        #now we need to add ourself
        #profile = User.query.get(self.current_user.id)
        print("Now printing following_users, It should be a list: ", following_users)

        #now select all stories 
        #posts = Post.query.filter(Post.user_id.in_(user_ids)).all()
        print("Now querying stories")
        stories = Story.query.filter(Story.user_id.in_(following_users)).all()
        print(stories)

        final = []
        for result in stories:
            final.append(result.to_dict())
        # for results in stories:
        #     if(following_users)
        
        print("printing the data structure of the final answer for how a story list should look ",final)
        return Response(json.dumps(final), mimetype="application/json", status=200)


def initialize_routes(api):
    api.add_resource(
        StoriesListEndpoint, 
        '/api/stories', 
        '/api/stories/', 
        resource_class_kwargs={'current_user': flask_jwt_extended.current_user}
    )
