import React from 'react';
import { useParams } from 'react-router-dom';
import { useLeaderboard } from '../context/LeaderboardContext';
import './PlayerDetail.css'; // Buat file CSS terpisah untuk gaya

export default function PlayerDetail() {
    const { playerId } = useParams();
    const { leaderboardData } = useLeaderboard();

    // Cari data pemain berdasarkan playerId
    const playerData = leaderboardData.find(player => player.PlayerId.toString() === playerId);

    return (
        <main className="player-detail-container">
            {playerData ? (
                <div className="player-card">
                    <h2 className="match-name">{playerData.MatchName || "Match Not Available"}</h2>
                    <div className="player-info">
                        <img src="https://via.placeholder.com/150" alt="Player Avatar" className="player-avatar" />
                        <div className="stats">
                            <h1 className="player-name">{playerData.Name}</h1>
                            <p className="team-name">Team: <span>{playerData.Team}</span></p>
                            <div className="stat-details">
                                <p>Kills: <span>{playerData.Kills || 'N/A'}</span></p>
                                <p>Assists: <span>{playerData.Assists || 'N/A'}</span></p>
                                <p>Deaths: <span>{playerData.Deaths || 'N/A'}</span></p>
                                <p>Headshots: <span>{playerData.Headshots || 'N/A'}</span></p>
                                <p>Avg Damage/Round: <span>{playerData.AverageDamagePerRound || 'N/A'}</span></p>
                                <p>Kast: <span>{playerData.Kast || 'N/A'}</span></p>
                                <p>Rating: <span>{playerData.Rating || 'N/A'}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Player data not available</p>
            )}
        </main>
    );
}
