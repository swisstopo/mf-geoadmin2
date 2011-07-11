# -*- coding: utf-8 -*-

from pylons import request, tmpl_context as c
from pylons.controllers.util import abort

from geoadmin.lib.base import *

import smtplib
from email.MIMEMultipart import MIMEMultipart
from email.MIMEBase import MIMEBase
from email.MIMEText import MIMEText
from email import Encoders

from simplejson import dumps

import os
import shutil
import urllib
import mimetypes
import unicodedata

class FeedbackController(BaseController):

    def index(self):
        self.create()

    def create(self):
        email = request.params.get('email','Anonymous')
        permalink = request.params.get('permalink', 'no permalink provided')
        feedback = request.params.get('feedback','no feedback provided')
        ua = request.params.get('ua','no user-agent found')
        self.mail('webgis@swisstopo.ch',"Customer feedback",email + " just sent a feedback:\n" + feedback + ". \nPermalink: "+ permalink + "\n\nUser-Agent: " + ua)

        return dumps({"success": True})

    def mail(self, to, subject, text):
        # http://kutuma.blogspot.com/2007/08/sending-emails-via-gmail-with-python.html
        msg = MIMEMultipart()

        msg['To'] = to
        msg['Subject'] = subject

        msg.attach(MIMEText(unicodedata.normalize('NFKD',unicode(text)).encode('ascii','ignore')))

        mailServer = smtplib.SMTP("127.0.0.1", 25)
        mailServer.ehlo()
        mailServer.starttls()
        mailServer.ehlo()
        mailServer.sendmail('webgis@swisstopo.ch', to, msg.as_string())
        mailServer.close()
