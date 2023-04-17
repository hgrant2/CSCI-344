from flask import Response, request
from flask_restful import Resource
from models import Bookmark, db
import json

class BookmarksListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    
    def get(self):
        # get all bookmarks owned by the current user

        bookmarks = Bookmark.query.filter_by(user_id = 12).all()
        print("Now printing the bookmarks: ", [bookmark.to_dict() for bookmark in bookmarks])
        return Response(json.dumps([bookmark.to_dict() for bookmark in bookmarks]), mimetype="application/json", status=200)

    def post(self):
        # create a new "bookmark" based on the data posted in the body 
        body = request.get_json()
        print(body)

        #check if post id is an int or not
        try:
            num = int(body.post_id)
        except:
            return Response(json.dumps({'error': 'Incorrect format, The post_id is not an int'}),mimetype="application/json", status=400)

        
        new_bookmark = Bookmark(
            user_id=self.current_user.id,
            post_id=body.get('post_id')
        )

        bookmarks = Bookmark.query.filter_by(user_id =self.current_user.id).all()
        # print("bookmarks without to_dict()", bookmarks)
        # print("Now printing the bookmarks: ", [bookmark.to_dict() for bookmark in bookmarks])

        #idea
        #make a list of all of the post ids that are currently bookmarked by our current user
        #if bookmark exist send error saying it already exist
        #else make a new bookmark and add it to db

        list_of_post_ids_in_bookmarks = []
        for bookmark in bookmarks:
            list_of_post_ids_in_bookmarks.append(bookmark.post_id)
        
        print("printing list of post ids from currently bookmarked post by current user: ", list_of_post_ids_in_bookmarks)

        if(new_bookmark.post_id in list_of_post_ids_in_bookmarks):
            print("bookmark already exist")
            return Response(json.dumps({'error': 'This post is already bookmarked'}),mimetype="application/json", status=400)
        
        db.session.add(new_bookmark)
        db.session.commit()
        # print("printing new bookmark before to_dict(): ",new_bookmark)
        # print("printing new bookmark after to_dict(): ", new_bookmark.to_dict())

        return Response(json.dumps(new_bookmark.to_dict()), mimetype="application/json", status=201)

class BookmarkDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user
    
    def delete(self, id):
        # delete "bookmark" record where "id"=id
        print(id)
        return Response(json.dumps({}), mimetype="application/json", status=200)



def initialize_routes(api):
    api.add_resource(
        BookmarksListEndpoint, 
        '/api/bookmarks', 
        '/api/bookmarks/', 
        resource_class_kwargs={'current_user': api.app.current_user}
    )

    api.add_resource(
        BookmarkDetailEndpoint, 
        '/api/bookmarks/<int:id>', 
        '/api/bookmarks/<int:id>',
        resource_class_kwargs={'current_user': api.app.current_user}
    )
