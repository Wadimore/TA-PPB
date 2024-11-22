import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from "react-loader-spinner";
import './About.css';
import { FaInstagram, FaSteam, FaGithub } from 'react-icons/fa';

export default function AboutActivity() {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const request = await axios.get("https://api.github.com/users/Wadimore");
                if (request.status === 200) {
                    setData(request.data);
                    const timer = setTimeout(() => {
                        setIsLoaded(true);
                        setIsLoading(false);
                    }, 3000);
                    return () => clearTimeout(timer);
                }
            } catch (error) {
                console.log(error);
                setIsLoading(true);
            }
        };
        if (!isLoaded) {
            fetchData();
        }
    }, [isLoaded]);

    return (
        <main>
            {isLoading ? (
                <div className="loading">
                    <Loader type="Rings" color="#00BFFF" height={200} width={200} />
                </div>
            ) : (
                <div className="container-about">
                    <div className="about-profile">
                        <img id="avatar" src={data.avatar_url} alt="avatar" />
                        <div className="profile-name">
                            <p>{data.name}</p>
                            <div></div>
                        </div>
                        <div className="container-aboutDesc">
                            <p>{data.public_repos}<br />Repositories</p>
                            <p>{data.followers}<br />Followers</p>
                            <p>{data.following}<br />Following</p>
                        </div>
                        <div className="container-button">
                            <a href="https://steamcommunity.com/id/safeeq//" target="_blank" rel="noreferrer">
                                <FaSteam size="50px" />
                            </a>
                            <a href={data.html_url} target="_blank" rel="noreferrer">
                                <FaGithub size="50px" />
                            </a>
                            <a href="https://www.instagram.com/feat_savage/" target="_blank" rel="noreferrer">
                                <FaInstagram size="50px" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
