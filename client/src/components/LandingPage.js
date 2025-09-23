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

  