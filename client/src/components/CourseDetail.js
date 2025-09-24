import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import CourseModule from "../components/CourseModule";



function CourseDetail({ courses, user, onComplete }) {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);

  const [safeUser] = useState(user || { stars: 0, points: 0 });

  if (!course) return <p>Course not found</p>;

  const completedModules = course.modules.filter((m) => m.completed).length;
  const progressPercentage = (completedModules / course.modules.length) * 100;

  return (
    <div className="course-detail">
      <Link to="/courses" className="back-link">
        ← Back to Courses
      </Link>

      <div className="course-header">
        <img src={course.thumbnail} alt={course.title} className="course-img" />
        <div className="course-info">
          <h1>{course.title}</h1>
          <p>by {course.instructor}</p>
          <p className="description">{course.description}</p>
          <p>
            👥 {course.studentsCount.toLocaleString()} | ⏳ {course.duration} | ⭐{" "}
            {course.rating}
          </p>
          <div className="tags">
            {course.languages.map((lang, i) => (
              <span key={i} className="tag">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="progress-card">
        <h3>Your Progress</h3>
        <p>
          Completed: {completedModules}/{course.modules.length} modules
        </p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p>⭐ Stars: {safeUser.stars} | 🏆 Points: {safeUser.points}</p>
      </div>

      <h2>Course Modules</h2>
      <div className="modules">
        {course.modules.map((module, i) => (
          <CourseModule
            key={module.id}
            module={module}
            index={i}
            courseId={course.id}
            safeUser={safeUser}
          />
        ))}
      </div>
    </div>
  );
}

export default CourseDetail;
