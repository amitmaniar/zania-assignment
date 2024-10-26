# app.py
from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

from .routes import routes
from . import settings
from . import event_handlers

middleware = [
    Middleware(CORSMiddleware, allow_origins=['*'])
]

app = Starlette(
    debug=settings.DEBUG, 
    routes=routes,
    middleware=middleware,
    on_startup=event_handlers.on_startup,
    on_shutdown=event_handlers.on_shutdown,
)
