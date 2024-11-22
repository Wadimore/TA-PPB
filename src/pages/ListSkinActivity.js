import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './ListSkinActivity.css';

const weaponCategories = {
    "Melee": ["Bayonet", "Bowie Knife", "Butterfly Knife", "Classic Knife", "Falchion Knife", "Flip Knife", "Gut Knife", "Huntsman Knife", "Karambit", "Navaja Knife", "Nomad Knife", "Paracord Knife", "Shadow Daggers", "Skeleton Knife", "Stiletto Knife", "Survival Knife", "Talon Knife", "Ursus Knife"],
    "Pistols": ["CZ75-Auto", "Desert Eagle", "Dual Berettas", "Five-SeveN", "Glock-18", "P2000", "P250", "R8 Revolver", "Tec-9", "USP-S"],
    "Shotguns": ["MAG-7", "Nova", "Sawed-Off", "XM1014"],
    "Machine Guns": ["M249", "Negev"],
    "SMGs": ["MAC-10", "MP5-SD", "MP7", "MP9", "P90", "PP-Bizon", "UMP-45"],
    "Assault Rifles": ["AK-47", "AUG", "FAMAS", "Galil AR", "M4A1-S", "M4A4", "SG 553"],
    "Sniper Rifles": ["AWP", "G3SG1", "SCAR-20", "SSG 08"],
    "Gloves": ["Broken Fang Gloves", "Bloodhound Gloves", "Sport Gloves"]
};

export default function ListSkinsActivity() {
    const [skins, setSkins] = useState([]);
    const [filteredSkins, setFilteredSkins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 15; // Jumlah item per halaman

    useEffect(() => {
        const fetchSkins = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('https://bymykel.github.io/CSGO-API/api/en/skins.json');
                setSkins(response.data || []);
                setFilteredSkins(response.data || []); // Initialize with all skins
            } catch (error) {
                console.error("Error fetching skins data", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSkins();
    }, []);

    // Filter berdasarkan kategori senjata
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);

        if (selectedCategory === 'All') {
            setFilteredSkins(skins);
        } else {
            const filtered = skins.filter(skin => weaponCategories[selectedCategory]?.includes(skin.weapon.name));
            setFilteredSkins(filtered);
        }
        setCurrentPage(0); // Reset ke halaman pertama setelah filter
    };

    // Pagination
    const pageCount = Math.ceil(filteredSkins.length / itemsPerPage);
    const pageVisited = currentPage * itemsPerPage;
    const displaySkins = filteredSkins.slice(pageVisited, pageVisited + itemsPerPage);

    const changePage = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <main className="list-skins">
            <h1 className="title">List of Skins</h1>
            
            <div className="filter-container">
                <label htmlFor="categoryFilter">Filter by Weapon Category:</label>
                <select id="categoryFilter" value={category} onChange={handleCategoryChange}>
                    <option value="All">All</option>
                    {Object.keys(weaponCategories).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {isLoading ? (
                <div className="loading">Loading...</div>
            ) : (
                <>
                    <div className="skins-container">
                        {displaySkins.map((skin) => (
                            <div key={skin.id} className="skin-card">
                                <img
                                    src={skin.image || 'fallback_image_url.png'}
                                    alt={skin.name || 'Unknown Skin'}
                                    className="skin-image"
                                    loading="lazy"
                                />
                                <h2 className="skin-name" style={{ color: skin.rarity.color || '#ffffff' }}>{skin.name || 'Unknown Name'}</h2>
                                <p className="skin-description">{skin.description || 'No description available.'}</p>
                                <p><strong>Category:</strong> {skin.category?.name || 'N/A'}</p>
                                <p><strong>Pattern:</strong> {skin.pattern?.name || 'N/A'}</p>
                                <p><strong>Min Float:</strong> {skin.min_float ?? 'N/A'}</p>
                                <p><strong>Max Float:</strong> {skin.max_float ?? 'N/A'}</p>
                                <p><strong>Rarity:</strong> <span style={{ color: skin.rarity?.color || '#000' }}>{skin.rarity?.name || 'N/A'}</span></p>
                                <p><strong>Wears:</strong> {skin.wears ? skin.wears.map(wear => wear.name).join(', ') : 'N/A'}</p>
                            </div>
                        ))}
                    </div>
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
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
                </>
            )}
        </main>
    );
}
