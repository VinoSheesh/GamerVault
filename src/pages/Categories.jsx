import React, { useState, useEffect } from "react";
import filterListData from "../data/filterListData";
import GameCard from "../components/GameCard";

function Categories({ games, reference }) {
  const [data, setData] = useState(games);
  const [filters, setFilters] = useState(filterListData);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [likedGames, setLikedGames] = useState([]);

  useEffect(() => {
    const activeFilter = filters.find((filter) => filter.active);

    if (activeFilter && activeFilter.name !== "All") {
      const filteredGames = games.filter(
        (game) => game.category === activeFilter.name
      );
      setData(filteredGames);
    } else {
      setData(games);
    }
  }, [filters, games]);

  const handleFilterGames = (category) => {
    setFilters(
      filters.map((filter) => {
        filter.active = false;
        if (filter.name === category) {
          filter.active = true;
        }
        return filter;
      })
    );
  };

  const toggleLike = (gameId) => {
    setLikedGames((prev) => {
      if (prev.includes(gameId)) {
        return prev.filter((id) => id !== gameId);
      } else {
        return [...prev, gameId];
      }
    });
  };

  const [text, setText] = useState("");

  const handleSearchGames = (e) => {
    setData(
      games.filter((game) =>
        game.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setText(e.target.value);
  };

  return (
    <section id="categories" className="text-2xl text-white" ref={reference}>
      <div className="container-fluid mt-2">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <ul className="filters flex flex-wrap list-none gap-[12px] p-0">
            {filters.map((filter) => (
              <li
                key={filter._id}
                onClick={() => handleFilterGames(filter.name)}
                className={`text-white p-[4px_12px] text-lg transition duration-300 cursor-pointer rounded-[10px] font-montserrat uppercase hover:bg-zinc-700
                  ${filter.active ? "bg-zinc-700 shadow-custom" : ""}`}
              >
                {filter.name}
              </li>
            ))}
          </ul>
          <div className="search w-fit h-10 bg-zinc-800 inline-flex gap-[15px] items-center p-[8px_12px] rounded-[10px] font-poppins">
            <i className="bi bi-search text-gray-400 grid place-items-center text-[18px]"></i>
            <input
              type="text"
              name="search"
              placeholder="Search"
              value={text}
              onChange={handleSearchGames}
              className="outline-none border-none bg-transparent text-lg focus:text-white placeholder:text-zinc-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {data.length > 0 ? (
            data.map((game) => (
              <GameCard
                key={game._id}
                game={game}
                hoveredCardId={hoveredCard}
                onHover={setHoveredCard}
                onLikeToggle={toggleLike}
                likedGames={likedGames}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-400">
              No games found for this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Categories;
