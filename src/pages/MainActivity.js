import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Loader from "react-loader-spinner";
import './MainActivity.css';

export default function MainActivity() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [filter, setFilter] = useState(""); 

    useEffect(() => {
        const fetchTeams = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("https://api.sportsdata.io/v3/csgo/scores/json/Teams?key=4c7de96cf9f04da9b1e7feb4cfdd8273");
                if (response.status === 200) {
                    setData(response.data);
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching teams data", error);
                setIsLoading(false);
            }
        };
        fetchTeams();
    }, []);

    const perPage = 16; 
    const pageVisited = currentPage * perPage;
    const filteredData = data.filter(team =>
        team.Name.toLowerCase().includes(filter.toLowerCase())
    );
    const currentData = filteredData.slice(pageVisited, pageVisited + perPage);
    const pageCount = Math.ceil(filteredData.length / perPage);

    const changePage = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <main className="main-content" style={{ paddingBottom: "80px" }}>
            <div className="header-filter">
                <h1>Teams</h1>
                <input
                    type="text"
                    placeholder="Search team..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="filter-input"
                />
            </div>
            {isLoading ? (
                <div className="loading">
                    <Loader type="Rings" color="#00BFFF" height={200} width={200} />
                </div>
            ) : (
                <>
                    {/* Grid untuk kartu tim */}
                    <div className="container-team grid-layout">
                        {currentData.map((team) => (
                            <NavLink
                                to={`/teams/${team.TeamId}`}
                                key={team.TeamId}
                                className="team-card"
                            >
                                <div className="team-name">{team.Name || "Unknown Team"}</div>
                            </NavLink>
                        ))}
                    </div>
                    {/* Pagination */}
                    <div className="pagination-container">
                        <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationBtn"}
                            previousLinkClassName={"previousBtn"}
                            nextLinkClassName={"nextBtn"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                        />
                    </div>
                </>
            )}
        </main>
    );
}
