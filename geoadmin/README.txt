Installation
============

Install the buildout environment:

  python bootstrap.py --distribute

Install the project:

  buildout/bin/buildout

If you have a custom buildout config file, you should instead run:

  buildout/bin/buildout -c buildout_myconfig.cfg

Now look at apache/README.txt and go configure your Apache virtual host.

Internationalization
====================

Getting Started
---------------

1) Uncomment the 'message_extractors' option in setup.py.

2) Extract all messages from the project:

  buildout/bin/python setup.py extract_messages

3) Initialize a catalog for every supported language, for example:

  buildout/bin/python setup.py init_catalog -l fr
  buildout/bin/python setup.py init_catalog -l en

4) Edit the .po files in geoadmin/i18n/*/LC_MESSAGES/geoadmin.po

5) Finally, compile the .po file to a .mo file:

  buildout/bin/python setup.py compile_catalog

Source: http://wiki.pylonshq.com/display/pylonsdocs/Internationalization+and+Localization
