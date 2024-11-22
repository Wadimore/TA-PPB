import React from 'react';
import './Leaderboard.css';

export default function HeaderLeaderboard({ rankDesc, teamsDesc, rateDesc }) {
    return (
        <div className="header-lead">
            <div className="container-text">
                <p>{rankDesc}</p>
            </div>
            <div className="container-profile">
                <p>{teamsDesc}</p>
            </div>
            <div className="container-text">
                <p>{rateDesc}</p>
            </div>
        </div>
    );
}
