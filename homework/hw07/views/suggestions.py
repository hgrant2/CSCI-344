from flask import Response, request
from flask_restful import Resource
from models import User, following
from views import get_authorized_user_ids
import json

class SuggestionsListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    
    def get(self):
        # suggestions should be any user with an ID that's not in this list:
        print(get_authorized_user_ids(self.current_user))

        users = User.query.filter(~User.id.in_(get_authorized_user_ids(self.current_user))).limit(7)
        print("now printing users not in list of following: ", users)

        final = []
        for result in users:
            final.append(result.to_dict())
        print("now printing structure of the final answer: ", final)
        


        return Response(json.dumps(final), mimetype="application/json", status=200)


def initialize_routes(api):
    api.add_resource(
        SuggestionsListEndpoint, 
        '/api/suggestions', 
        '/api/suggestions/', 
        resource_class_kwargs={'current_user': api.app.current_user}
    )
