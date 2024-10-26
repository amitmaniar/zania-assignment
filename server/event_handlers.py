# event_handlers.py

from .resources import database

on_startup = [
    database.connect
]

on_shutdown = [
    database.disconnect
]