import React, { useState, useEffect, useMemo } from "react";
import { gameData } from "./data/games";

const GameList = () => {
  /* 
    instruction: set up the following states
    - games: array of games. use gameData as initial value
    - perPage: number of games per page
    - currentPage: current page number
    - totalPages: total number of pages
    - searchTerm: search term for title search
    - sort: sort by title or rating
  */

  const [games, setGames] = useState(gameData);
  const [sort, setSort] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const genres = useMemo(() => {
    let options = [];
    // instruction: get all genres from gameData
    gameData.forEach((game) => {
      game.genres.forEach((g) => {
        if (!options.includes(g)) {
          options.push(g);
        }
      });
    });

    return options;
  }, [gameData]);

  useEffect(() => {
    let newGames = [...gameData];

    // instruction: do title search using the searchTerm state
    if (searchTerm !== "") {
      newGames = newGames.filter((game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // instruction: do genre filter using the selectedGenre state
    if (selectedGenre !== "") {
      newGames = newGames.filter((g) => g.genres.includes(selectedGenre));
    }

    // instruction: retrieve total pages
    const total = Math.ceil(newGames.length / perPage);
    const pages = [];
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    // instruction: set totalPages state
    setTotalPages(pages);

    // instruction: sort by title or rating
    switch (sort) {
      case "title":
        newGames = newGames.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
        break;
      case "rating":
        newGames = newGames.sort((a, b) => {
          return b.rating - a.rating;
        });
        break;
      default:
      case "title":
        newGames = newGames.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
        break;
    }

    // instruction: do pagination using the currentPage and perPage states
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    newGames = newGames.slice(start, end);

    // instruction: set games state with newGames variable
    setGames(newGames);
  }, [gameData, selectedGenre, sort, searchTerm, perPage, currentPage]);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-6">
          <input
            type="text"
            placeholder="Search"
            // instruction: assign searchTerm state to value
            value={searchTerm}
            onChange={(e) => {
              // instruction: set searchTerm state
              // instruction: reset current page back to 1
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="col-6 text-end mb-3">
          <select
            className="me-1 mb-1"
            // instruction: assign sort state to value
            value={sort}
            onChange={(e) => {
              // instruction: set sort state
              // instruction: reset current page back to 1
              setSort(e.target.value);
              setCurrentPage(1);
            }}>
            <option value="title">Sort by Title</option>
            <option value="rating">Sort by Rating</option>
          </select>

          <select
            className="me-1 mb-1"
            // instruction: assign selectedGenre state to value
            value={selectedGenre}
            onChange={(e) => {
              // instruction: set selectedGenre state
              // instruction: reset current page back to 1
              setSelectedGenre(e.target.value);
              setCurrentPage(1);
            }}>
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select
            className="me-1 mb-1"
            // instruction: assign perPage state to value
            value={perPage}
            onChange={(e) => {
              // instruction: set perPage state
              // instruction: reset current page back to 1
              setPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}>
            <option value={6}>6 per page</option>
            <option value={10}>10 per page</option>
            <option value={gameData.length}>All</option>
          </select>
        </div>
      </div>
      {/* 
        instruction: 
        - display the games here
        - responsive layout: 1 column for mobile, 2 columns for tablet, 3 columns for desktop
      */}
      <div className="row">
        {games.map((game) => (
          <div className="col-lg-4 col-md-6 col-sm-12 my-5" key={game.title}>
            <div className="card">
              <img
                src={"/images/" + game.image}
                alt={game.title}
                className="img-fluid"
              />
              <div className="card-body">
                <h2 className="card-title">{game.title}</h2>
                <span>Genres: {game.genres.join(", ")}</span>
                <p className="card-text">Rating: {game.rating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2">
        {/* instruction: display pagination buttons here */}
        <div>
          <span
            style={{
              marginRight: "10px",
            }}>
            Page {currentPage} of {totalPages.length}
          </span>
          {totalPages.map((page) => {
            return (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                }}>
                {page}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameList;
