import React from 'react';
import { Link } from 'react-router-dom';
import AvatarCustomizer from './AvatarCustomizer';

function Dashboard({ user }) {
  // Safe fallback for undefined user
  const safeUser = {
    username: user?.username || 'Guest',
    points: user?.points || 0,
  };

  const recentCourses = [
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      progress: 75,
      thumbnail:
        'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=300',
      nextLesson: 'Async/Await Patterns',
    },
    {
      id: '2',
      title: 'Python for Data Science',
      progress: 45,
      thumbnail:
        'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=300',
      nextLesson: 'Pandas DataFrames',
    },
    {
      id: '3',
      title: 'React Development',
      progress: 60,
      thumbnail:
        'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300',
      nextLesson: 'State Management',
    },
  ];

const achievements = [
    { name: 'First Steps', icon: '🎯', description: 'Complete your first course', earned: true },
    { name: 'Quiz Master', icon: '🧠', description: 'Score 100% on 5 quizzes', earned: true },
    { name: 'Streak Keeper', icon: '🔥', description: '7-day learning streak', earned: false },
    { name: 'Social Learner', icon: '👥', description: 'Chat with 10 different users', earned: false },
  ];

  const stats = [
    { label: 'Courses Enrolled', value: '12' },
    { label: 'Hours Learned', value: '47' },
    { label: 'Points Earned', value: safeUser.points.toLocaleString() },
    { label: 'Rank', value: '#234' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Welcome Section */}
        <div className="welcome-box">
          <h1>Welcome back, {safeUser.username}! 🚀</h1>
          <p>Ready to continue your learning journey?</p>
          <div className="welcome-actions">
            <Link to="/courses" className="btn-light">
              Browse Courses
            </Link>
            <Link to="/quiz/random" className="btn-dark">
              Quick Quiz
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="dashboard-main">
          {/* Continue Learning */}
          <div className="learning-box">
            <div className="learning-header">
              <h2>▶ Continue Learning</h2>
              <Link to="/courses">View All</Link>
            </div>

            <div
              className="courses-list"
              style={{
                display: 'flex',
                overflowX: 'auto',
                gap: '15px',
                paddingBottom: '10px',
                scrollbarWidth: 'thin',
                scrollbarColor: '#9333ea #f3f4f6'
              }}
            >
              {recentCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/course/${course.id}`}
                  className="course-card"
                  style={{ minWidth: '250px', flexShrink: 0 }}
                >
                  <img src={course.thumbnail} alt={course.title} />
                  <div className="course-info">
                    <h3>{course.title}</h3>
                    <p>Next: {course.nextLesson}</p>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <span>{course.progress}%</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="dashboard-sidebar">
            {/* Avatar */}
            <div className="sidebar-box">
              <h2>Customize Avatar</h2>
              <AvatarCustomizer user={user || { avatar: {}, stars: 0 }} />
            </div>

            {/* Achievements */}
            <div className="sidebar-box">
              <h2>🏆 Achievements</h2>
              <div className="achievements">
                {achievements.map((achievement, i) => (
                  <div
                    key={i}
                    className={`achievement ${achievement.earned ? 'earned' : ''}`}
                  >
                    <span className="icon">{achievement.icon}</span>
                    <div>
                      <h3>{achievement.name}</h3>
                      <p>{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Streak */}
            <div className="sidebar-box streak-box">
              <h2>🔥 Learning Streak</h2>
              <div className="streak">
                <div className="streak-days">5</div>
                <p>Days in a row!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
