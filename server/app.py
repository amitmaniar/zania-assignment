# app.py
from starlette.applications import Starlette

from .routes import routes
from . import settings
from . import event_handlers

app = Starlette(
    debug=settings.DEBUG, 
    routes=routes,
    on_startup=event_handlers.on_startup,
    on_shutdown=event_handlers.on_shutdown,
)
