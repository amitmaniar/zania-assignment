# views.py
from starlette.responses import PlainTextResponse
from starlette.responses import JSONResponse
from .resources import records, database

async def home(request):
    return PlainTextResponse("Nothing here as Its just a small App for assignment.")

async def list_records(request):
    query = records.select()
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
