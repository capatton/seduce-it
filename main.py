import webapp2
import os
from google.appengine.ext.webapp import template

class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/html'
        path = os.path.join(os.path.dirname(__file__), 'master.html')
        self.response.out.write(template.render(path, {}))

    # Shortcut for writing to webpage
    def output(self, x):
        self.response.out.write(x)

        


app = webapp2.WSGIApplication([('/', MainPage)], debug=True)