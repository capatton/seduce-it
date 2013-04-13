import webapp2
import os
import urlparse
import logging
from userprofile import UserProfile
from google.appengine.ext.webapp import template
from google.appengine.ext import db

class CheckPage(webapp2.RequestHandler):
    def get(self, uid):
        user_id = uid

        q = db.Query(UserProfile)
        q.filter('user_id = ', user_id)

        user = q.get()
        if user is None or user.crush_id is None:
            new_profile = UserProfile(user_id = user_id)
            new_profile.put()
            self.redirect('/choose/{}'.format(user_id))
        else:
            self.redirect('/dashboard/{}'.format(user_id))

        return


app = webapp2.WSGIApplication([('/check/(\d*)', CheckPage)], debug=True)