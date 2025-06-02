import React, { useState, useEffect } from "react";
import { FaVolumeUp, FaVolumeDown, FaVolumeMute } from "react-icons/fa";

import "../styles/VolumeControl.scss";

const VolumeControl = ({ audioRef }) => {
  const [volume, setVolume] = useState(0.07); // Set default volume to 30%
  const [isMuted, setIsMuted] = useState(false);

  // Set the initial volume when the component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [audioRef, volume]); // Runs on component mount and when volume state changes

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    if (newVolume === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume;
    } else {
      audioRef.current.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  const increaseVolume = () => {
    const newVolume = Math.min(1, volume + 0.03);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const decreaseVolume = () => {
    const newVolume = Math.max(0, volume - 0.04);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  return (
    <div className="volume-control">
      <button onClick={toggleMute}>
        {isMuted || volume === 0 ? <FaVolumeMute /> : volume < 0.5 ? <FaVolumeDown /> : <FaVolumeUp />}
      </button>
      <button onClick={decreaseVolume}>-</button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={isMuted ? 0 : volume}
        onChange={handleVolumeChange}
      />
      <button onClick={increaseVolume}>+</button>
    </div>
  );
};

export default VolumeControl;
