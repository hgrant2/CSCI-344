from flask import Response, request
from flask_restful import Resource
from models import Following, User, db
import json
import flask_jwt_extended    


def get_path():
    return request.host_url + 'api/posts/'

class FollowingListEndpoint(Resource):
    def __init__(self, current_user):
        self.current_user = current_user
    @flask_jwt_extended.jwt_required()
    def get(self):
        # return all of the "following" records that the current user is following
        print("About to Query following")
        # following = Following.query.filter(Following.user_id==current_user_id).all()
        following = Following.query.filter(Following.user_id==self.current_user.id).all()
        print("printing following ", following)
        following_users = []
        for result in following:
            following_users.append(result.to_dict_following())
        
        print("Now printing following_users, It should be a list: ", following_users)
        return Response(json.dumps(following_users), mimetype="application/json", status=200)
    
    @flask_jwt_extended.jwt_required()
    def post(self):
        
        body = request.get_json()
        user_id = body.get('user_id') 

        #check if user_id is an int or not
        try:
            print(body.get('user_id'))
            num = int(body.get('user_id'))
            print(type(num))
        except:
            return Response(json.dumps({'error': 'Incorrect format, The post_id is not an int'}),mimetype="application/json", status=400)

        user = User.query.get(user_id)
        if not user:
            return Response(
                json.dumps({
                    'message': 'User id={0} does not exist'.format(user_id)
                }), mimetype="application/json", status=404)
        try:
            following = Following(self.current_user.id, user_id)
            db.session.add(following)
            db.session.commit() 
        except Exception:
            import sys
            print(sys.exc_info()[1])
            return Response(
                json.dumps({
                    'message': 'Database Insert error. Are you already following user={0}? Please see the log files.'.format(user_id)}
                ), 
                mimetype="application/json", 
                status=400
            ) 
        return Response(json.dumps(following.to_dict_following()), mimetype="application/json", status=201)


    #old idea
        # # create a new "following" record based on the data posted in the body 
        # body = request.get_json()
        # print("Printing body : ", body)

        # #check if user actually exist
        # user_exist = User.query.get(body.get('user_id'))
        # if(user_exist == None):
        #     return Response(json.dumps({'error': 'The user you are trying to follow on does not exist'}),mimetype="application/json", status=404)


        # #get users we are already following

        # #if not already following them create the follow (maybe make sure it isn't current user?)
        # print("checking things inside body and how to access")
        # print("body.get('user_id')  ")
        # print(body.get('user_id'))
        # theID = body.get('user_id')

        # user_to_follow = User.query.filter(User.id==theID).all()
        # print("now printing user_to_follow")
        # print(user_to_follow)
        # print("creating new_follow")
        # new_follow = Following(
        #     user_id=body.get('id'),
        #     following=user_to_follow
        # )

        # print("if this runs then we made a correct new_follow")
        # db.session.add(new_follow)
        # db.session.commit()
        # return Response(json.dumps(new_follow.to_dict_following), mimetype="application/json", status=201)

class FollowingDetailEndpoint(Resource):
    def __init__(self, current_user):
        self.current_user = current_user

    @flask_jwt_extended.jwt_required() 
    def delete(self, id):
        # delete "following" record where "id"=id
        print("printing following id: ",id)

        following_obj = Following.query.filter_by(id=id).all()
        print("printing what was retrieved from following_obj: ", following_obj)

        if(following_obj == []):
            return Response(json.dumps(None), mimetype="application/json", status=404)
        
        following = Following.query.filter(Following.user_id==self.current_user.id).all()
        print("printing following ", following)
        following_users = []
        for result in following:
            following_users.append(result.id)
        
        print("Now printing following_users: ", following_users)

        if(id in following_users):
            Following.query.filter_by(id=id).delete()
            db.session.commit()
            return Response(json.dumps(None), mimetype="application/json", status=200)
        else:
            return Response(json.dumps(None), mimetype="application/json", status=404)


        # return Response(json.dumps({}), mimetype="application/json", status=200)




def initialize_routes(api):
    api.add_resource(
        FollowingListEndpoint, 
        '/api/following', 
        '/api/following/', 
        resource_class_kwargs={'current_user': flask_jwt_extended.current_user}
    )
    api.add_resource(
        FollowingDetailEndpoint, 
        '/api/following/<int:id>', 
        '/api/following/<int:id>/', 
        resource_class_kwargs={'current_user': flask_jwt_extended.current_user}
    )
