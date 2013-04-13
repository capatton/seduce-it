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
            #self.redirect('/choose/{}'.format(user_id))
        else:
            self.response.headers['Content-Type'] = 'text/html'
            path = os.path.join(os.path.dirname(__file__), 'check.html')
            self.response.out.write(template.render(path, {'user_name': user.user_name, 'user_id': user.user_id}))
            #self.redirect('/dashboard/{}'.format(user_id))

    def post(self):
        user_id = self.request.get('id')
        user_name = self.request.get('name')

        q = db.Query(UserProfile)
        q.filter('user_id = ', user_id)

        user = q.get()
        if user is None:
            new_profile = UserProfile(user_id = user_id, user_name = user_name)
            new_profile.put()

app = webapp2.WSGIApplication([('/check/(\d*)', CheckPage)], debug=True)