import webapp2
import os
import urlparse
import logging
from userprofile import UserProfile
from google.appengine.ext.webapp import template
from google.appengine.ext import db

class DashboardPage(webapp2.RequestHandler):
    def get(self):


app = webapp2.WSGIApplication([('/dashboard/(\d*)', DashboardPage)], debug=True)