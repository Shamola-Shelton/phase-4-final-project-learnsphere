import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  Home,
  Library,
  MessageSquare,
  Trophy,
  User,
  LogOut,
  Star,
  Award,
} from "lucide-react";
// import "./NavBar.css";

const NavBar = ({ user, onLogout }) => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/courses", icon: Library, label: "Courses" },
    { path: "/chat", icon: MessageSquare, label: "Chat" },
    { path: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/dashboard" className="logo">
          <div className="logo-icon">
            <BookOpen />
          </div>
          <span className="logo-text">LearnSphere</span>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={isActive(item.path) ? "nav-link active" : "nav-link"}
            >
              <item.icon className="icon" />
              <span className="label">{item.label}</span>
            </Link>
          ))}
        </div>

        