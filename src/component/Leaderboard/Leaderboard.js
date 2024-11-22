import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Leaderboard.css';

export default function Leaderboard({ name, team, kills, assists, deaths, rating, number, playerId }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/player/${playerId}`);
    };

    return (
        <div className="container-lead" onClick={handleClick}>
            <div className="container-text">
                <p>{number}</p>
            </div>
            <div className="container-profile">
                <p>{name} - {team}</p>
            </div>
            <div className="container-text">
                <p>{rating || 'N/A'}</p>
            </div>
        </div>
    );
}
