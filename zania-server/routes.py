# routes.py
from starlette.routing import Route
from . import views
from . import apis

routes = [
    Route("/", endpoint=views.home, name="home"),
    Route("/records", endpoint=apis.list_records, methods=["GET"]),
    Route("/records", endpoint=apis.create_record, methods=["POST"]),
    Route("/records/batch", endpoint=apis.batch_update_record, methods=["POST"]),
    Route("/records/{id:int}", endpoint=apis.update_record, methods=["PUT"]),
    Route("/records/{id:int}", endpoint=apis.delete_records, methods=["DELETE"]),
]
