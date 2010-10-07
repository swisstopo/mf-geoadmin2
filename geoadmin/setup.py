try:
    from setuptools import setup, find_packages
except ImportError:
    from ez_setup import use_setuptools
    use_setuptools()
    from setuptools import setup, find_packages

setup(
    name='geoadmin',
    version='0.1',
    description='',
    author='',
    author_email='',
    url='',
    install_requires=[
        "Pylons>=1.0,<=1.0.99",
        "Babel<=0.9.99"
    ],
    #setup_requires=["PasteScript>=1.6.3"],
    packages=find_packages(exclude=['ez_setup']),
    include_package_data=True,
    test_suite='nose.collector',
    package_data={'geoadmin': ['i18n/*/LC_MESSAGES/*.mo']},
    message_extractors={'geoadmin': [
            ('**.py', 'python', None),
            ('templates/**', 'mako', {'input_encoding': 'utf-8'}),
            ('public/**', 'ignore', None)]},
    zip_safe=False,
    entry_points="""
    [paste.app_factory]
    main = geoadmin.config.middleware:make_app

    [paste.app_install]
    main = pylons.util:PylonsInstaller
    """,
)
