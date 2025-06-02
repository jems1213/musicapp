import React, { useState, useEffect } from "react";
import LibrarySong from "./LibrarySong";
import { FiX, FiMusic } from "react-icons/fi";

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  setLibraryStatus,
  libraryStatus,
  currentSong, // Make sure this is being passed as a prop
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredSongs, setFilteredSongs] = useState(songs);

  useEffect(() => {
    let results = songs;
    
    if (searchTerm) {
      results = results.filter(song =>
        song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (activeFilter !== "all") {
      results = results.filter(song => song.category === activeFilter);
    }
    
    setFilteredSongs(results);
  }, [searchTerm, activeFilter, songs]);

  const categories = ["all", ...new Set(songs.map(song => song.category || "uncategorized"))];

  const handleSongClick = () => {
    if (window.innerWidth < 768) {
      setLibraryStatus(false);
    }
  };

  return (
    <div className={`library ${libraryStatus ? "active" : ""}`}>
      <div className="library-header">
        <button 
          onClick={() => setLibraryStatus(false)} 
          className="close-button"
          aria-label="Close library"
        >
          <FiX />
        </button>
        <h2>Your Library</h2>
        
        <div className="library-search">
          {/* <FiSearch className="search-icon" /> */}
          <input
          
            type="text"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="library-filters">
          {categories.map(category => (
            <button
              key={category}
              className={activeFilter === category ? "active" : ""}
              onClick={() => setActiveFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="library-songs">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <LibrarySong
              setSongs={setSongs}
              isPlaying={isPlaying}
              audioRef={audioRef}
              songs={songs}
              song={song}
              setCurrentSong={setCurrentSong}
              id={song.id}
              key={song.id}
              handleSongClick={handleSongClick}
              isCurrent={currentSong && currentSong.id === song.id} // Added null check
            />
          ))
        ) : (
          <div className="library-empty">
            <FiMusic size={48} />
            <p>No songs found</p>
            {searchTerm && (
              <button 
                className="clear-search"
                onClick={() => setSearchTerm("")}
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;