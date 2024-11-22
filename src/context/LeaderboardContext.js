import React, { createContext, useState, useContext } from 'react';

const LeaderboardContext = createContext();

export function LeaderboardProvider({ children }) {
    const [leaderboardData, setLeaderboardData] = useState([]);

    return (
        <LeaderboardContext.Provider value={{ leaderboardData, setLeaderboardData }}>
            {children}
        </LeaderboardContext.Provider>
    );
}

export function useLeaderboard() {
    return useContext(LeaderboardContext);
}
