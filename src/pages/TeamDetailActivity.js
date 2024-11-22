import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DefaultImage from '../assets/default.png';
import Loader from "react-loader-spinner";
import './TeamDetail.css';

export default function TeamDetailActivity() {
    const { teamId } = useParams();
    const [team, setTeam] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTeamDetails = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://api.sportsdata.io/v3/csgo/scores/json/Teams?key=4c7de96cf9f04da9b1e7feb4cfdd8273`);
                if (response.status === 200) {
                    const teamData = response.data.find((t) => t.TeamId === parseInt(teamId));
                    setTeam(teamData);
                }
            } catch (error) {
                console.error("Error fetching team details", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeamDetails();
    }, [teamId]);

    return (
        <div className="page-container">
            <main className="content-wrap">
                {isLoading ? (
                    <div className="loading">
                        <Loader type="Rings" color="#00BFFF" height={200} width={200} />
                    </div>
                ) : (
                    <div className="team-detail">
                        {team ? (
                            <>
                                <h1>{team.Name}</h1>
                                <img
                                    src={team.WikipediaLogoUrl || DefaultImage}
                                    alt={team.Name}
                                    onError={(e) => (e.target.src = DefaultImage)}
                                />
                                {team.AreaName && <p>Area: {team.AreaName}</p>}
                                {team.Founded && <p>Founded: {team.Founded}</p>}
                                {team.Type && <p>Type: {team.Type}</p>}
                                {team.Website && (
                                    <p>
                                        Website:{" "}
                                        <a href={team.Website} target="_blank" rel="noopener noreferrer">
                                            {team.Website}
                                        </a>
                                    </p>
                                )}
                                {team.Facebook && (
                                    <p>
                                        Facebook:{" "}
                                        <a href={team.Facebook} target="_blank" rel="noopener noreferrer">
                                            {team.Facebook}
                                        </a>
                                    </p>
                                )}
                                {team.Twitter && (
                                    <p>
                                        Twitter:{" "}
                                        <a href={team.Twitter} target="_blank" rel="noopener noreferrer">
                                            {team.Twitter}
                                        </a>
                                    </p>
                                )}
                                {team.YouTube && (
                                    <p>
                                        YouTube:{" "}
                                        <a href={team.YouTube} target="_blank" rel="noopener noreferrer">
                                            {team.YouTube}
                                        </a>
                                    </p>
                                )}
                                {team.Instagram && (
                                    <p>
                                        Instagram:{" "}
                                        <a href={team.Instagram} target="_blank" rel="noopener noreferrer">
                                            {team.Instagram}
                                        </a>
                                    </p>
                                )}
                            </>
                        ) : (
                            <p>Team data not available</p>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
