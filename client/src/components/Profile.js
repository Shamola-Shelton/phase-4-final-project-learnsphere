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

  
