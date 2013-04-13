import webapp2
import os
import urlparse
from userprofile import UserProfile
from google.appengine.ext.webapp import template
from google.appengine.ext import db

class CheckPage(webapp2.RequestHandler):
    def get(self, uid):
        user_id = uid

        profiles = db.GqlQuery("SELECT * "
                              "FROM UserProfile "
                              "WHERE id IS :1",
                              user_id)

        if profiles.count() > 0:
            self.redirect('dashboard/{}'.format(user_id))
        else:
          new_profile = UserProfile(user_id = user_id)
          new_profile.put()
          self.redirect('choose/{}'.format(user_id))

    def post(self):
        user_id = self.request.get('id')
        user_name = self.request.get('name')

        profiles = db.GqlQuery("SELECT * "
                               "FROM UserProfile "
                               "WHERE id IS :1",
                               user_id)

        if profiles.count() == 0:
            new_profile = UserProfile(user_id = user_id, user_name = user_name)
            new_profile.put()

app = webapp2.WSGIApplication([('/check/(\d*)', CheckPage)], debug=True)