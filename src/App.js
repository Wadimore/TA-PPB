import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Header from './component/Header/Header';
import MainActivity from './pages/MainActivity';
import TeamDetailActivity from './pages/TeamDetailActivity';
import Footer from './component/Footer/Footer';
import LeaderboardActivity from './pages/LeaderboardActivity';
import AboutActivity from './pages/AboutActivity';
import PlayerDetail from './pages/PlayerDetail';
import { LeaderboardProvider } from './context/LeaderboardContext';
import ListSkinActivity from './pages/ListSkinActivity';
import ListStickerActivity from './pages/ListStickerActivity'; // Import halaman baru

function App() {
  return (
    <LeaderboardProvider>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/teams" />} />
            <Route path="/teams" element={<MainActivity />} />
            <Route path="/teams/:teamId" element={<TeamDetailActivity />} />
            <Route path="/leaderboard" element={<LeaderboardActivity />} />
            <Route path="/profile" element={<AboutActivity />} />
            <Route path="/player/:playerId" element={<PlayerDetail />}  />
            <Route path="/skins" element={<ListSkinActivity />} /> {/* New Route for Skins */}
            <Route path="/stickers" element={<ListStickerActivity />} /> {/* Tambahkan route */}
          </Routes>
          <Footer />
        </Router>
      </div>
    </LeaderboardProvider>
  );
}

export default App;
