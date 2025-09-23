// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./Navbar";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import CourseDetail from "./CourseDetail";
import ModuleContent from "./ModuleContent"; // ✅ new import
import Leaderboard from "./Leaderboard";
import Profile from "./Profile";
import Quiz from "./Quiz";
import Auth from "./Auth";
import Chat from "./Chat";
import AvatarCustomizer from "./AvatarCustomizer";

function App() {
  // ✅ sample state (replace with fetch later)
  const [courses] = useState([
    {
      id: "1",
      title: "JavaScript Basics",
      instructor: "John Doe",
      description: "Learn JS fundamentals step by step.",
      thumbnail: "https://via.placeholder.com/300x200",
      studentsCount: 1200,
      duration: "3h 45m",
      rating: 4.5,
      languages: ["JavaScript", "HTML", "CSS"],
      modules: [
        { id: "m1", title: "Intro to JS", completed: false },
        { id: "m2", title: "Functions", completed: true },
      ],
    },
  ]);

  const user = { stars: 10, points: 200 };

  return (
    <Router>
      <Navbar />
      <Switch>
        {/* Public Routes */}
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={Auth} />

        {/* Main App Routes */}
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/courses" component={Courses} />
        <Route
          exact
          path="/course/:id"
          render={(props) => <CourseDetail {...props} courses={courses} user={user} />}
        />
        <Route
          path="/course/:courseId/module/:moduleId"
          render={(props) => <ModuleContent {...props} courses={courses} />}
        />
        <Route path="/quiz" component={Quiz} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/chat" component={Chat} />
        <Route path="/avatar" component={AvatarCustomizer} />

        {/* Catch-all redirect */}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
