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


