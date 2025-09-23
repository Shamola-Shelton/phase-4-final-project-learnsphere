from flask_restful import Resource
from flask import request, session
from models import Review, db

class ReviewList(Resource):
    def get(self):
        return [r.to_dict() for r in Review.query.all()], 200
    def post(self):
        data = request.get_json()
        if session.get('user_id') is None:
            return {'error': 'Unauthorized'}, 401
        review = Review(
            user_id=session.get('user_id'),
            course_id=data['course_id'],
            rating=data['rating'],
            comment=data['comment']
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict(), 201

class ReviewById(Resource):
    def get(self, id):
        review = Review.query.get_or_404(id)
        return review.to_dict(), 200
    def patch(self, id):
        review = Review.query.get_or_404(id)
        if review.user_id != session.get('user_id'):
            return {'error': 'Unauthorized'}, 403
        data = request.get_json()
        for key, value in data.items():
            if key in ['rating', 'comment']:
                setattr(review, key, value)
        db.session.commit()
        return review.to_dict(), 200
    def delete(self, id):
        review = Review.query.get_or_404(id)
        if review.user_id != session.get('user_id'):
            return {'error': 'Unauthorized'}, 403
        db.session.delete(review)
        db.session.commit()
        return {}, 204