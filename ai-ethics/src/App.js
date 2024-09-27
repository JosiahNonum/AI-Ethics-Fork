import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import DatabaseManTester from "./DatabaseManTester";
import AIGlossary from "./aiGlossary";
import Homepage from "./components/homepage";
import UserProfile from "./UserProfile";
import LoginForm from "./Loginform"; // Import LoginForm
import Registration from "./Registration"; // Import Registration component

// Placeholder components for the pages
const Explore = () => <div>Explore Page</div>;
const Lessons = () => <div>Lessons Page</div>;
const LinkedContent = () => <div>Linked Content Page</div>;
const Quizzes = () => <div>Quizzes Page</div>;
const Leaderboard = () => <div>Leaderboard Page</div>;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const [sidebarOpen, setSidebarOpen] = useState(true); // State to manage sidebar visibility

  return (
    <Router>
      <div className="app-container">
        {!isLoggedIn ? (
          <Routes>
            <Route path="/" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Registration />} /> {/* Route for registration */}
          </Routes>
        ) : (
          <>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setIsLoggedIn={setIsLoggedIn} /> {/* Pass setIsLoggedIn */}
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/lessons" element={<Lessons />} />
                <Route path="/linked-content" element={<LinkedContent />} />
                <Route path="/ai-term-glossary" element={<AIGlossary />} />
                <Route path="/quizzes" element={<Quizzes />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/databaseTest" element={<DatabaseManTester />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="*" element={<Navigate to="/" />} /> {/* Redirect all unknown routes */}
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
