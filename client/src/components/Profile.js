import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Mail, 
  Calendar, 
  Award, 
  Star, 
  Trophy, 
  BookOpen,
  Target,
  TrendingUp,
  Settings,
  Edit3,
  Save,
  X
} from 'lucide-react';
import AvatarCustomizer from './AvatarCustomizer';
// import './index.css';

const Profile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user || {});

  const achievements = [
    { id: '1', name: 'First Steps', description: 'Complete your first course', icon: '🎯', rarity: 'common', earned: true, earnedDate: '2024-01-15' },
    { id: '2', name: 'Quiz Master', description: 'Score 100% on 5 quizzes', icon: '🧠', rarity: 'rare', earned: true, earnedDate: '2024-01-20' },
    { id: '3', name: 'Speed Learner', description: 'Complete a course in under 24 hours', icon: '⚡', rarity: 'epic', earned: false, earnedDate: null },
    { id: '4', name: 'Social Butterfly', description: 'Chat with 50 different users', icon: '🦋', rarity: 'rare', earned: false, earnedDate: null },
    { id: '5', name: 'Perfectionist', description: 'Maintain 100% quiz accuracy for a week', icon: '💎', rarity: 'legendary', earned: false, earnedDate: null },
    { id: '6', name: 'Night Owl', description: 'Complete lessons after midnight 10 times', icon: '🦉', rarity: 'common', earned: true, earnedDate: '2024-01-25' }
  ];

  const stats = [
    { label: 'Courses Completed', value: '8', icon: BookOpen, color: 'blue-purple' },
    { label: 'Total Points', value: (user?.points ?? 0).toLocaleString(), icon: Star, color: 'yellow-orange' },
    { label: 'Quizzes Taken', value: '47', icon: Target, color: 'green-teal' },
    { label: 'Learning Streak', value: '12 days', icon: TrendingUp, color: 'red-pink' },
  ];

  const recentActivity = [
    { action: 'Completed', item: 'JavaScript Arrays Quiz', points: 150, time: '2 hours ago' },
    { action: 'Started', item: 'React Hooks Course', points: 0, time: '5 hours ago' },
    { action: 'Earned', item: 'Quiz Master Badge', points: 500, time: '1 day ago' },
    { action: 'Completed', item: 'CSS Flexbox Module', points: 200, time: '2 days ago' },
    { action: 'Joined', item: 'JavaScript Study Group', points: 0, time: '3 days ago' }
  ];

  const getRarityClass = (rarity) => {
    switch (rarity) {
      case 'common': return 'rarity-common';
      case 'rare': return 'rarity-rare';
      case 'epic': return 'rarity-epic';
      case 'legendary': return 'rarity-legendary';
      default: return 'rarity-common';
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user || {});
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="header-gradient"></div>
          <div className="edit-buttons">
            {!isEditing ? (
              <button className="btn edit" onClick={() => setIsEditing(true)}>
                <Edit3 className="icon" /> Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button className="btn save" onClick={handleSave}>
                  <Save className="icon" /> Save
                </button>
                <button className="btn cancel" onClick={handleCancel}>
                  <X className="icon" /> Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="profile-body">
          <div className="profile-info">
            <div className="avatar-box">
              <div className="avatar-circle">
                <UserIcon className="avatar-icon" />
              </div>
              <div className="trophy-badge">
                <Trophy className="icon" />
              </div>
            </div>
            <div className="user-info">
              {isEditing ? (
                <div className="edit-fields">
                  <input 
                    type="text" 
                    value={editedUser.username ?? ''} 
                    onChange={(e) => setEditedUser({...editedUser, username: e.target.value})} 
                  />
                  <input 
                    type="email" 
                    value={editedUser.email ?? ''} 
                    onChange={(e) => setEditedUser({...editedUser, email: e.target.value})} 
                  />
                </div>
              ) : (
                <>
                  <h1>{user?.username ?? "Guest"}</h1>
                  <div className="user-details">
                    <span><Mail className="icon" /> {user?.email ?? "No email provided"}</span>
                    <span><Calendar className="icon" /> Joined Jan 2024</span>
                  </div>
                </>
              )}
              <div className="stats-summary">
                <div><span>{user?.level ?? 0}</span><p>Level</p></div>
                <div><span>{user?.stars ?? 0}</span><p>Stars</p></div>
                <div><span>{achievements.filter(a => a.earned).length}</span><p>Badges</p></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="main-grid">
          <div className="main-content">
            {/* Stats */}
            <div className="stats-grid">
              {stats.map((s, i) => (
                <div key={i} className={`stat-card ${s.color}`}>
                  <div>
                    <div className="stat-value">{s.value}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                  <div className="stat-icon"><s.icon /></div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="recent-activity">
              <h2><TrendingUp className="icon" /> Recent Activity</h2>
              {recentActivity.map((a, i) => (
                <div key={i} className="activity-card">
                  <div className="activity-info">
                    <div className="activity-icon">{a.action.charAt(0)}</div>
                    <div>
                      <p><strong>{a.action}</strong> <span>{a.item}</span></p>
                      <small>{a.time}</small>
                    </div>
                  </div>
                  {a.points > 0 && <div className="points">+{a.points} pts</div>}
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="achievements">
              <h2><Award className="icon" /> Achievements</h2>
              <div className="achievements-grid">
                {achievements.map((ach) => (
                  <div key={ach.id} className={`achievement ${ach.earned ? 'earned' : 'locked'}`}>
                    <div className={`achievement-icon ${getRarityClass(ach.rarity)}`}>
                      {ach.earned ? ach.icon : '🔒'}
                    </div>
                    <div>
                      <h3>{ach.name}</h3>
                      <p>{ach.description}</p>
                      <div className="achievement-footer">
                        <span className={`rarity-tag ${getRarityClass(ach.rarity)}`}>{ach.rarity}</span>
                        {ach.earned && ach.earnedDate && <span>{new Date(ach.earnedDate).toLocaleDateString()}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            <div className="sidebar-card">
              <h2><Settings className="icon" /> Customize Avatar</h2>
              <AvatarCustomizer user={user} />
            </div>

            <div className="sidebar-card progress-card">
              <h2>Level Progress</h2>
              <div className="progress-level">{user?.level ?? 0}</div>
              <div className="progress-bar">
                <div style={{ width: `${((user?.points ?? 0) % 1000) / 10}%` }}></div>
              </div>
              <div className="progress-footer">
                <span>{(user?.points ?? 0) % 1000} / 1000 XP</span>
                <span>Next: Level {(user?.level ?? 0) + 1}</span>
              </div>
            </div>

            <div className="sidebar-card quick-stats">
              <h2>Quick Stats</h2>
              <div><span>Courses in Progress</span><strong>3</strong></div>
              <div><span>Average Quiz Score</span><strong>87%</strong></div>
              <div><span>Study Time This Week</span><strong>12.5h</strong></div>
              <div><span>Global Rank</span><strong>#234</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
