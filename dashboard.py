import webapp2
import os
import urlparse
import logging
from userprofile import UserProfile
from google.appengine.ext.webapp import template
from google.appengine.ext import db

class DashboardPage(webapp2.RequestHandler):
    def get(self, uid):
    	user_id = uid
    	q = db.Query(UserProfile)
    	q.filter('user_id = ', user_id)
    	user = q.get()

    	user_name = user.user_name
    	crush_id = user.crush_id
    	crush_name = user.crush_name
    	crush_pic = user.crush_pic

    	

app = webapp2.WSGIApplication([('/dashboard/(\d*)', DashboardPage)], debug=True)