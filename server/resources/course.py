from flask_restful import Resource
from flask import request, session
from models import Course, db

class CourseList(Resource):
    def get(self):
        return [c.to_dict() for c in Course.query.all()], 200
    def post(self):
        if session.get('user_id') is None:
            return {'error': 'Unauthorized'}, 401
        data = request.get_json()
        course = Course(
            title=data['title'],
            description=data.get('description'),
            category=data.get('category'),
            creator_id=session['user_id']
        )
        db.session.add(course)
        db.session.commit()
        return course.to_dict(), 201