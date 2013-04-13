import webapp2
import os
import urlparse
from userprofile import UserProfile
from google.appengine.ext.webapp import template
from google.appengine.ext import db

class CheckPage(webapp2.RequestHandler):
    def get(self, uid):
        user_id = uid

        q = db.Query(UserProfile)
        q.filter('user_id = ', user_id)
        # profiles = db.GqlQuery("SELECT * "
        #                       "FROM UserProfile "
        #                       "WHERE user_id IS :1",
        #                       user_id)

        user = q.get()

        if user is None:
            new_profile = UserProfile(user_id = user_id)
            new_profile.put()
            self.redirect('/choose/{}'.format(user_id))
        else:
            self.redirect('/dashboard/{}'.format(user_id))

app = webapp2.WSGIApplication([('/check/(\d*)', CheckPage)], debug=True)