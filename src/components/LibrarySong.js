import React from "react";
import "../styles/LibrarySong.scss";
const LibrarySong = ({
    song,
    setCurrentSong,
    audioRef,
    handleSongClick, // Receive the click handler as a prop
}) => {

    const songSelectHandler = () => {
        setCurrentSong(song); // Set the current song
        audioRef.current.play(); // Play the song
        handleSongClick(); // Close the library
    };

    return (
        
        <div onClick={songSelectHandler} className="library-song">
            
            <img src={song.cover} alt={song.name} />
            <div className="library-song-info">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;
