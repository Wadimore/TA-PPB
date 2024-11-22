import React from 'react';
import Logo from '../../assets/default.png';
import { FaSteam } from 'react-icons/fa';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.pathname);

    return (
        <header>
            <div className="header">
                {location.pathname !== '/teams' && location.pathname !== '/leaderboard' && (
                    <MdOutlineArrowBackIosNew
                        className="arrow-back"
                        size="30px"
                        onClick={() => navigate(-1)}
                    />
                )}
                <img src={Logo} alt="Logo" id="logo" />
                <h1 id="title">Welcome To CSInfo!</h1>
                {/* Tambahkan onClick untuk membuka halaman Steam */}
                <FaSteam
                    size="40px"
                    className="steam-icon"
                    onClick={() => window.open('https://store.steampowered.com/app/730/CounterStrike_2/', '_blank')}
                    title="Go to Steam Counter-Strike 2"
                />
            </div>
        </header>
    );
}
