import React, { useState } from "react";
import { Link } from "react-router-dom";

// ✅ Full dataset for all courses (kept inline for now)
export const courses = [
  {
    id: "1",
    title: "Data Science Fundamentals",
    description: "Learn data analysis, visualization, and machine learning basics.",
    category: "Data Science",
    difficulty: "Beginner",
    duration: "6 weeks",
    rating: 4.8,
    studentsCount: 1200,
    instructor: "Dr. Ada Lovelace",
    thumbnail: "https://source.unsplash.com/600x400/?data,science",
    languages: ["Python", "SQL"],
    modules: [
      { id: "1", title: "Introduction to Data Science", type: "notes", content: "Data Science is all about extracting insights from data using tools and algorithms.", completed: false },
      { id: "2", title: "Python for Data Science", type: "video", content: "https://www.youtube.com/embed/r-uOLxNrNk8", completed: false },
      { id: "3", title: "Mini Quiz: Data Basics", type: "quiz", content: "Test your understanding of basic Data Science concepts.", completed: false },
    ],
  },
  {
    id: "2",
    title: "Web Development Bootcamp",
    description: "Master HTML, CSS, JavaScript, and React to build full websites.",
    category: "Web Development",
    difficulty: "Intermediate",
    duration: "8 weeks",
    rating: 4.7,
    studentsCount: 2500,
    instructor: "Grace Hopper",
    thumbnail: "https://source.unsplash.com/600x400/?web,development",
    languages: ["HTML", "CSS", "JavaScript", "React"],
    modules: [
      { id: "1", title: "Intro to Web Development", type: "notes", content: "Web development involves building websites and applications for the internet.", completed: false },
      { id: "2", title: "Frontend Basics", type: "video", content: "https://www.youtube.com/embed/pQN-pnXPaVg", completed: false },
      { id: "3", title: "Mini Quiz: HTML & CSS", type: "quiz", content: "Answer questions on HTML and CSS fundamentals.", completed: false },
    ],
  },
  {
    id: "3",
    title: "Cyber Security Essentials",
    description: "Learn to secure systems, networks, and defend against cyber threats.",
    category: "Cyber Security",
    difficulty: "Advanced",
    duration: "10 weeks",
    rating: 4.9,
    studentsCount: 800,
    instructor: "Kevin Mitnick",
    thumbnail: "https://source.unsplash.com/600x400/?cyber,security",
    languages: ["Networking", "Linux"],
    modules: [
      { id: "1", title: "Intro to Cyber Security", type: "notes", content: "Cybersecurity protects systems from attacks and unauthorized access.", completed: false },
      { id: "2", title: "Ethical Hacking Basics", type: "video", content: "https://www.youtube.com/embed/3Kq1MIfTWCE", completed: false },
      { id: "3", title: "Mini Quiz: Security Concepts", type: "quiz", content: "Test your knowledge on cybersecurity fundamentals.", completed: false },
    ],
  },
  {
    id: "4",
    title: "Mobile App Development",
    description: "Create mobile applications for Android and iOS with React Native.",
    category: "Mobile Development",
    difficulty: "Intermediate",
    duration: "7 weeks",
    rating: 4.6,
    studentsCount: 1500,
    instructor: "Linus Torvalds",
    thumbnail: "https://source.unsplash.com/600x400/?mobile,app",
    languages: ["JavaScript", "React Native"],
    modules: [
      { id: "1", title: "Intro to Mobile Development", type: "notes", content: "Mobile apps run on phones and tablets and can be built natively or cross-platform.", completed: false },
      { id: "2", title: "React Native Basics", type: "video", content: "https://www.youtube.com/embed/0-S5a0eXPoc", completed: false },
      { id: "3", title: "Mini Quiz: Mobile Concepts", type: "quiz", content: "Quick questions on mobile application development basics.", completed: false },
    ],
  },
  {
    id: "5",
    title: "Programming Fundamentals",
    description: "Understand the foundations of programming with Python.",
    category: "Programming",
    difficulty: "Beginner",
    duration: "5 weeks",
    rating: 4.5,
    studentsCount: 3000,
    instructor: "Bjarne Stroustrup",
    thumbnail: "https://source.unsplash.com/600x400/?programming,code",
    languages: ["Python"],
    modules: [
      { id: "1", title: "What is Programming?", type: "notes", content: "Programming is giving instructions to a computer to perform tasks.", completed: false },
      { id: "2", title: "Python Basics", type: "video", content: "https://www.youtube.com/embed/kqtD5dpn9C8", completed: false },
      { id: "3", title: "Mini Quiz: Programming Logic", type: "quiz", content: "Test yourself on variables, loops, and conditionals.", completed: false },
    ],
  },
];

function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const categories = ["all", "Programming", "Data Science", "Web Development", "Cyber Security", "Mobile Development"];
  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"];

  // ✅ Defensive check (courses || []) avoids undefined.filter
  const filteredCourses = (courses || []).filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || course.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="courses-page">
      <h1>Explore Courses</h1>
      <p className="subtitle">Discover amazing courses and start your learning journey today</p>

      {/* Search + Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "All Categories" : c}
            </option>
          ))}
        </select>
        <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d === "all" ? "All Levels" : d}
            </option>
          ))}
        </select>
      </div>

      {/* Course Grid */}
      <div className="course-grid">
        {filteredCourses.map((course) => (
          <Link key={course.id} to={`/course/${course.id}`} className="course-card">
            <img src={course.thumbnail} alt={course.title} />
            <div className="course-info">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p>
                <strong>{course.difficulty}</strong> · {course.duration}
              </p>
              <p>{course.studentsCount.toLocaleString()} students</p>
              <p>⭐ {course.rating}</p>
              <small>By {course.instructor}</small>
              <div className="tags">
                {course.languages.map((lang, i) => (
                  <span key={i} className="tag">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
        {filteredCourses.length === 0 && (
          <p className="no-results">No courses found. Try adjusting your filters.</p>
        )}
      </div>
    </div>
  );
}

export default Courses;
