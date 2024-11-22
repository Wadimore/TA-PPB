import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Leaderboard from '../component/Leaderboard/Leaderboard';
import './Leaderboard.css';
import Loader from "react-loader-spinner";
import HeaderLeaderboard from '../component/Leaderboard/HeaderLeaderboard';
import { useLeaderboard } from '../context/LeaderboardContext';

export default function LeaderboardActivity() {
    const { leaderboardData, setLeaderboardData } = useLeaderboard();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState("2023-09-14"); // Default date

    // Fungsi untuk memformat tanggal ke yyyy-mm-dd
    const formatDate = (date) => {
        const d = new Date(date);
        const month = `${d.getMonth() + 1}`.padStart(2, "0");
        const day = `${d.getDate()}`.padStart(2, "0");
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const handleDateChange = (event) => {
        setSelectedDate(formatDate(event.target.value));
    };

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://api.sportsdata.io/v3/csgo/stats/json/BoxScores/${selectedDate}?key=4c7de96cf9f04da9b1e7feb4cfdd8273`);
                if (response.status === 200) {
                    // Flatten data and set to leaderboardData in context
                    const allPlayers = response.data.flatMap(game => game.Maps.flatMap(map => map.Leaderboards));
                    setLeaderboardData(allPlayers);
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching leaderboard data", error);
                setIsLoading(false);
            }
        };

        fetchLeaderboard();
    }, [selectedDate, setLeaderboardData]);

    // Sort leaderboardData by rating in descending order
    const sortedLeaderboardData = leaderboardData
        .slice() // Create a copy to avoid modifying the original array
        .sort((a, b) => (b.Rating || 0) - (a.Rating || 0)); // Sort by rating, handling null or undefined values

    return (
        <main>
            <div className="date-picker">
                <label htmlFor="date">Select Date: </label>
                <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    max={formatDate(new Date())} // Prevent future dates
                />
            </div>
            {isLoading ? (
                <div className="loading">
                    <Loader type="Rings" color="#00BFFF" height={200} width={200} />
                </div>
            ) : (
                <div className="container-teams">
                    <div className="player-desc">
                        <h1>Leaderboard</h1>
                    </div>
                    <HeaderLeaderboard rankDesc="Rank" teamsDesc="Player" rateDesc="Rating" />
                    {sortedLeaderboardData.map((player, index) => (
                        <Leaderboard
                            key={`${player.PlayerId}-${player.GameId}-${index}`} // Unique key
                            name={player.Name}
                            team={player.Team}
                            kills={player.Kills}
                            assists={player.Assists}
                            deaths={player.Deaths}
                            rating={player.Rating}
                            number={index + 1}
                            playerId={player.PlayerId}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}
