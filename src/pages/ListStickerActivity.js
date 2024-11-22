import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./ListStickerActivity.css";

export default function ListStickerActivity() {
  const [stickers, setStickers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const itemsPerPage = 15; // Jumlah data per halaman

  useEffect(() => {
    const fetchStickers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://bymykel.github.io/CSGO-API/api/en/stickers.json"
        );
        setStickers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching stickers:", error);
        setIsLoading(false);
      }
    };
    fetchStickers();
  }, []);

  // Filter data berdasarkan pencarian
  const filteredStickers = stickers.filter((sticker) =>
    sticker.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const pageCount = Math.ceil(filteredStickers.length / itemsPerPage);
  const pageVisited = currentPage * itemsPerPage;
  const displayStickers = filteredStickers.slice(
    pageVisited,
    pageVisited + itemsPerPage
  );

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <main className="stickers-container">
      <h1 className="stickers-title">CS:GO Stickers</h1>
      <div className="stickers-filter">
        <input
          type="text"
          placeholder="Search stickers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="stickers-search-input"
        />
      </div>
      {isLoading ? (
        <div className="stickers-loading">Loading stickers...</div>
      ) : (
        <>
          <div className="stickers-grid">
            {displayStickers.map((sticker) => (
              <div className="sticker-card" key={sticker.id}>
                <img
                  src={sticker.image}
                  alt={sticker.name}
                  className="sticker-image"
                />
                <h3 className="sticker-name">{sticker.name}</h3>
                <p className="sticker-description">{sticker.description}</p>
                <div className="sticker-details">
                  <span
                    className="sticker-rarity"
                    style={{ color: sticker.rarity.color }}
                  >
                    {sticker.rarity.name}
                  </span>
                  <span className="sticker-event">
                    {sticker.tournament_event}
                  </span>
                </div>
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
