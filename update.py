import webapp2
import os
import urlparse
import logging
from userprofile import UserProfile
from google.appengine.ext.webapp import template
from google.appengine.ext import db

class UpdateHandler(webapp2.RequestHandler):
    def post(self):
        user_id = self.request.get('user_id')
        q = db.Query(UserProfile)
        q.filter('user_id = ', user_id)
        user = q.get()

        for arg in self.request.arguments():
            logging.error('arg:{}, value: {}'.format(arg, self.request.get(arg)))
            setattr(user, arg, self.request.get(arg))

        user.put()

        return


app = webapp2.WSGIApplication([('/update', UpdateHandler)], debug=True)