import logging

from pylons import request, response, config, tmpl_context as c
from pylons.controllers.util import abort
from pylons.i18n import set_lang

from geoadmin.lib.base import BaseController, render

log = logging.getLogger(__name__)

class EntryController(BaseController):

    def index(self):
        c.debug = "debug" in request.params
        default_lang = config.get("default_lang")
        for lang in request.languages:
            if lang[:2] in ['de','fr','rm','it','en']:
                default_lang = lang[:2]
                break
        c.lang = str(request.params.get("lang", default_lang))
        if c.lang == 'rm':
           set_lang('fi', fallback=True)
        else:
           set_lang(c.lang, fallback=True)

        c.mobilegeoadmin_host = config.get("mobilegeoadmin_host")
        c.mapgeoadmin_host = config.get("mapgeoadmin_host")

        return render("index.html")
