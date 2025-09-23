import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  Trophy,
  Zap,
  Star,
  Target,
  Gamepad2,
  MessageSquare,
} from "lucide-react";
// import "./LandingPage.css";


function LandingPage() {
  const features = [
    {
      icon: <BookOpen size={32} />,
      title: "Interactive Learning",
      description:
        "Engage with dynamic content including videos, notes, and hands-on exercises",
    },
    {
      icon: <Users size={32} />,
      title: "Collaborative Environment",
      description:
        "Connect with peers and instructors through real-time chat and group activities",
    },
    {
      icon: <Trophy size={32} />,
      title: "Gamified Experience",
      description:
        "Earn points, unlock achievements, and compete on leaderboards",
    },
    {
      icon: <Zap size={32} />,
      title: "AI-Powered Summarizer",
      description:
        "Get instant summaries of complex topics with our intelligent content analyzer",
    },
    {
      icon: <Gamepad2 size={32} />,
      title: "Kahoot-Style Quizzes",
      description:
        "Compete in real-time multiplayer quizzes with friends and classmates",
    },
    {
      icon: <MessageSquare size={32} />,
      title: "Real-Time Chat",
      description:
        "Ask questions, share ideas, and study together with integrated messaging",
    },
  ];

  const courses = [
    { name: "Software Engineering", students: "12,500+" },
    { name: "Cybersecurity", students: "8,300+" },
    { name: "Data Science", students: "15,700+" },
    { name: "Web Development", students: "22,100+" },
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">LearnSphere</h1>
          <p className="hero-subtitle">
            Transform your learning journey with our gamified, interactive
            platform. Compete, collaborate, and conquer knowledge like never
            before.
          </p>
          <div className="hero-buttons">
            <Link to="/auth" className="btn-primary">
              Start Learning Today
            </Link>
            <div className="hero-learners">
              <Star size={20} className="star-icon" />
              <span>Join 50,000+ active learners</span>
            </div>
          </div>
        </div>

        <div className="courses">
          {courses.map((course, index) => (
            <div key={index} className="course-card">
              <div className="course-icon">
                <Target size={28} />
              </div>
              <h3>{course.name}</h3>
              <p>{course.students} students</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-header">
          <h2>Why Choose LearnSphere?</h2>
          <p>
            Experience learning like never before with our cutting-edge features
            designed to maximize engagement and retention.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Level Up Your Learning?</h2>
        <p>
          Join thousands of students and teachers already using LearnSphere to
          achieve their educational goals.
        </p>
        <Link to="/auth" className="btn-secondary">
          Get Started Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <h3>LearnSphere</h3>
        <p>Empowering education through gamification and collaboration</p>
        <p>&copy; 2025 LearnSphere. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
