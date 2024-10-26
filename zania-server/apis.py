# views.py
from starlette.responses import PlainTextResponse
from starlette.responses import JSONResponse
from webargs import fields
from webargs_starlette import use_args, use_annotations, parser

from .resources import records, database

async def list_records(request):
    fields.Str()
    query = records.select().order_by(records.c.position)
    results = await database.fetch_all(query)
    content = [
        {
            "id": result["id"],
            "type": result["type"],
            "title": result["title"],
            "position": result["position"]
        }
        for result in results
    ]
    return JSONResponse(content)

@use_args(
    {"type": fields.Str(required=True), "title": fields.Str(required=True), "position": fields.Int(required=True)}
)
async def create_record(request, args):
    
    query = records.insert().values(type=args['type'], title=args['title'], position=args['position'])
    
    await database.execute(query=query)
    return JSONResponse({"status": "success", "msg": "Record inserted."})

@use_args(
    {"type": fields.Str(required=True), "title": fields.Str(required=True), "position": fields.Int(required=True)}
)
async def update_record(request, args):
    record_id = request.path_params['id']
    
    query = records.update().where(records.c.id==record_id).values(type=args['type'], title=args['title'], position=args['position'])
    await database.execute(query=query)
    
    return JSONResponse({"status": "success", "msg": "Record updated."})

async def batch_update_record(request):
    request_body = await request.json()
    
    for obj in request_body:
        query = records.update().where(records.c.id==obj['id']).values(type=obj['type'], title=obj['title'], position=obj['position'])
        print(obj)
        await database.execute(query=query)
    return JSONResponse({"status": "success", "msg": "Record updated."})

async def delete_records(request):
    record_id = request.path_params['id']
    
    query = records.delete().where(records.c.id==record_id)
    await database.execute(query=query)

    return JSONResponse({"status": "success", "msg": "Record deleted."})
