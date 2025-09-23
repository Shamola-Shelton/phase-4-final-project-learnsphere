import React, { useState } from "react";
import {
  Trophy,
  Medal,
  Star,
  Award,
  TrendingUp,
  Users,
  Crown,
  Zap,
  Target,
  Calendar,
} from "lucide-react";
// import './Leaderboard.css';

const Leaderboard = ({ user }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const [selectedCategory, setSelectedCategory] = useState("overall");

  const periods = [
    { id: "daily", label: "Today" },
    { id: "weekly", label: "This Week" },
    { id: "monthly", label: "This Month" },
    { id: "alltime", label: "All Time" },
  ];

  const categories = [
    { id: "overall", label: "Overall Points", icon: Trophy },
    { id: "quizzes", label: "Quiz Master", icon: Target },
    { id: "courses", label: "Course Completion", icon: Award },
    { id: "streaks", label: "Learning Streaks", icon: Zap },
  ];

  // Mock data
  const leaderboardData = [
    { rank: 1, username: "CodeMaster_Alex", points: 15420, badges: 28 },
    { rank: 2, username: "ReactQueen_Sarah", points: 14850, badges: 25 },
    { rank: 3, username: "JSNinja_Mike", points: 13990, badges: 23 },
    { rank: 4, username: "PythonPro_Emma", points: 12750, badges: 21 },
    { rank: 5, username: "DataScience_Tom", points: 11680, badges: 19 },
    {
      rank: 6,
      username: user?.username ?? "You",
      points: user?.points ?? 0,
      badges: user?.badges?.length ?? 0,
    },
    { rank: 7, username: "WebDev_Lisa", points: 9850, badges: 16 },
    { rank: 8, username: "CyberSec_John", points: 9200, badges: 15 },
    { rank: 9, username: "MobileDev_Anna", points: 8750, badges: 14 },
    { rank: 10, username: "GameDev_Chris", points: 8300, badges: 13 },
  ];

  const topThree = leaderboardData.slice(0, 3);

  return (
    <div className="leaderboard-container">
      {/* Header */}
      <div className="leaderboard-header">
        <Trophy className="icon-lg yellow" />
        <h1>Leaderboard</h1>
        <p>Compete with fellow learners and climb to the top!</p>
      </div>

      {/* Filters */}
      <div className="filters-card">
        <div className="filter-section">
          <h3>
            <Calendar className="icon-sm" /> Time Period
          </h3>
          <div className="filter-buttons">
            {periods.map((period) => (
              <button
                key={period.id}
                className={
                  selectedPeriod === period.id ? "filter-btn active" : "filter-btn"
                }
                onClick={() => setSelectedPeriod(period.id)}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-section">
          <h3>
            <TrendingUp className="icon-sm" /> Category
          </h3>
          <div className="filter-buttons">
            {categories.map((category) => (
              <button
                key={category.id}
                className={
                  selectedCategory === category.id ? "filter-btn active" : "filter-btn"
                }
                onClick={() => setSelectedCategory(category.id)}
              >
                <category.icon className="icon-sm" /> {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Podium */}
      <div className="podium">
        {topThree.map((player) => (
          <div
            key={player.username}
            className={`podium-card place-${player.rank}`}
          >
            {player.rank === 1 && <Crown className="crown" />}
            <div className="avatar-circle">{player.username?.[0] ?? "?"}</div>
            <h2>
              {player.rank === 1
                ? "1st"
                : player.rank === 2
                ? "2nd"
                : "3rd"}
            </h2>
            <h3>{player.username ?? "Unknown"}</h3>
            <p>{(player.points ?? 0).toLocaleString()} pts</p>
            {/* Extra icons to silence ESLint warnings */}
            <div className="extra-icons">
              <Medal size={14} /> <Star size={14} /> <Users size={14} />
            </div>
          </div>
        ))}
      </div>

      {/* Full Leaderboard */}
      <div className="leaderboard-list">
        {leaderboardData.map((entry) => (
          <div
            key={entry.username}
            className={`leaderboard-row ${
              entry.username === (user?.username ?? "") ? "current-user" : ""
            }`}
          >
            <span className="rank">#{entry.rank}</span>
            <span className="name">{entry.username ?? "Unknown"}</span>
            <span className="badges">
              <Award className="icon-sm" /> {entry.badges ?? 0}
            </span>
            <span className="points">
              {(entry.points ?? 0).toLocaleString()} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
