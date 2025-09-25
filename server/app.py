from flask import Flask, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_socketio import SocketIO
from config import app, db, api
from resources.user import Signup, Login
from resources.course import CourseList
from resources.review import ReviewList, ReviewById
from resources.enrollment import EnrollmentList
from resources.module import ModuleList

socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def home():
    return "LearnSphere Server Running", 200

api.add_resource(Signup, '/api/signup')
api.add_resource(Login, '/api/login')
api.add_resource(CourseList, '/api/courses')
api.add_resource(ReviewList, '/api/reviews')
api.add_resource(ReviewById, '/api/reviews/<int:id>')
api.add_resource(EnrollmentList, '/api/enrollments')
api.add_resource(ModuleList, '/api/modules')

@socketio.on('message')
def handle_message(data):
    socketio.emit('message', data, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, port=5555)
    