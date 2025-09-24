#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Course, Module, Review, Enrollment, Message,Chat

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        print("Clearing database...")
        db.drop_all()
        db.create_all()

        print("Creating users...")
        users = []
        for _ in range(50):
            user=User(
                username=fake.user_name(),
                email=fake.email(),
                password_hash=fake.password()
            )
            users.append(user)
        db.session.add_all(users)
        db.session.commit()

        print("Creating courses and modules...")
        courses = []
        for _ in range(15):
            course=Course(
                name=fake.catch_phrase(),
                description=fake.text(max_nb_chars=200)
            )     
            courses.append(course)
            for i in range(1, 6):
                module = Module(
                    title=f"Module {i}: {fake.bs()}",
                    content=fake.paragraph(nb_sentences=10),
                    course=course
                )
                db.session.add(module)
        db.session.add_all(courses)
        db.session.commit()


        print("Creating reviews...")
        reviews = []
        for _ in range(100):
            review = Review(
                rating=randint(1, 5),
                user=rc(users),
                course=rc(courses)
            )
            reviews.append(review)
        db.session.add_all(reviews)
        db.session.commit()

        print("Creating enrollments...")
        enrollments = []
        enrolled_courses = set()
        for user in users:
            for _ in range(randint(1, 5)):
                course = rc(courses)
                if (user.id, course.id) not in enrolled_courses:
                    enrollment = Enrollment(
                        user=user,
                        course=course,
                        completion_status=rc(['in_progress', 'completed', 'dropped'])
                    )
                    enrollments.append(enrollment)
                    enrolled_courses.add((user.id, course.id))
        db.session.add_all(enrollments)
        db.session.commit()
        print("Creating messages and chats...")
        chats = []
        for _ in range(10):
            chat = Chat(
                name=f"{rc(users).username}'s Chat",
                members=rc(users, k=randint(2, 5))
            )
            chats.append(chat)
        db.session.add_all(chats)
        db.session.commit()
        messages = []
        for chat in chats:
            for _ in range(randint(5, 20)):
                message = Message(
                    content=fake.sentence(),
                    chat=chat,
                    user=rc(chat.members)
                )
                messages.append(message)
        db.session.add_all(messages)
        db.session.commit()
        print("Seed complete!")









