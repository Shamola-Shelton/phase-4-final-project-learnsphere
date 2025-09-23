from flask_restful import Resource
from flask import request, session
from models import Module, db

class ModuleList(Resource):
    def get(self):
        return [m.to_dict() for m in Module.query.all()], 200
    def post(self):
        if session.get('user_id') is None:
            return {'error': 'Unauthorized'}, 401
        data = request.get_json()
        module = Module(
            course_id=data['course_id'],
            title=data['title'],
            type=data['type'],
            content=data.get('content'),
            stars_required=data.get('stars_required', 0)
        )
        db.session.add(module)
        db.session.commit()
        return module.to_dict(), 201