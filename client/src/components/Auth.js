import React, { useState  } from 'react';
import { User, Mail, Lock, UserCheck, BookOpen } from 'lucide-react';

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock authentication
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      username: formData.username || formData.email.split('@')[0],
      email: formData.email,
      role: formData.role,
      avatar: {
        skinColor: '#F4A460',
        hairColor: '#8B4513',
        hairStyle: 'short',
        eyeColor: '#4B5563',
        outfit: 'casual',
        accessory: 'none'
      },
      points: 0,
      stars: 3,
      badges: [],
      level: 1
    };

    onLogin(userData);
  };

  