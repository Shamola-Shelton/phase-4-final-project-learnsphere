from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
bcrypt = Bcrypt()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String, nullable=False)
    role = db.Column(db.String, nullable=False)  # student/teacher
    avatar = db.Column(db.String)
    points = db.Column(db.Integer, default=0)
    reviews = db.relationship('Review', backref='user')
    enrollments = db.relationship('Enrollment', backref='user')
    serialize_rules = ('-reviews.user', '-enrollments.user')

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

class Course(db.Model, SerializerMixin):
    __tablename__ = 'courses'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    reviews = db.relationship('Review', backref='course')
    modules = db.relationship('Module', backref='course')
    enrollments = db.relationship('Enrollment', backref='course')
    serialize_rules = ('-reviews.course', '-modules.course', '-enrollments.course')

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    serialize_rules = ('-user.reviews', '-course.reviews')

class Enrollment(db.Model, SerializerMixin):
    __tablename__ = 'enrollments'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))
    progress = db.Column(db.Float, default=0.0)
    serialize_rules = ('-user.enrollments', '-course.enrollments')

class Module(db.Model, SerializerMixin):
    __tablename__ = 'modules'
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))
    title = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)  # notes/video/quiz
    content = db.Column(db.Text)
    stars_required = db.Column(db.Integer, default=0)
    serialize_rules = ('-course.modules',)