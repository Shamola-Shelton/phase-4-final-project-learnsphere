from flask_restful import Resource
from flask import request, session
from models import Enrollment, db

class EnrollmentList(Resource):
    def get(self):
        return [e.to_dict() for e in Enrollment.query.all()], 200
    def post(self):
        if session.get('user_id') is None:
            return {'error': 'Unauthorized'}, 401
        data = request.get_json()
        enrollment = Enrollment(
            user_id=session['user_id'],
            course_id=data['course_id'],
            progress=data.get('progress', 0.0)
        )
        db.session.add(enrollment)
        db.session.commit()
        return enrollment.to_dict(), 201