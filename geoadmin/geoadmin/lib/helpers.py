"""Helper functions

Consists of functions to typically be used within templates, but also
oavailable to Controllers. This module is available to templates as 'h'.
"""
from pylons import config

def versioned(path):
    version = config.get('version')
    if version is not None:
        if path.startswith('/'):
            return '/' + version + path
        else:
            return version + '/' + path
    else:
        return path
