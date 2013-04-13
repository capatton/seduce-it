from google.appengine.ext import db

class UserProfile(db.Model):
    user_name = db.StringProperty()
    user_id = db.StringProperty()
    crush_name = db.StringProperty()
    crush_id = db.StringProperty()
    crush_pic = db.StringProperty()