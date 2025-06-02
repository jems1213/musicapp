// FileName: PlayerSong.js

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause,
} from "@fortawesome/free-solid-svg-icons";
   import "../styles/player.scss";
const Player = ({
    currentSong,
    isPlaying,
    setIsPlaying,
    audioRef,
    setSongInfo,
    songInfo,
    songs,
    setCurrentSong,
    setSongs,
}) => {
    
    const playAudio = () => {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    
                })
                .catch((error) => {
                    console.warn("Playback error:", error);
                });
        }
    };

    // Event Handlers
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    };

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
            playAudio();
        }
    };

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex(
            (song) => song.id === currentSong.id
        );

        if (direction === "skip-forward") {
            const nextSong = songs[(currentIndex + 1) % songs.length];
            await setCurrentSong(nextSong);
            activeLibraryHandler(nextSong);
        }

        if (direction === "skip-back") {
            const prevIndex =
                (currentIndex - 1 + songs.length) % songs.length;
            const prevSong = songs[prevIndex];
            await setCurrentSong(prevSong);
            activeLibraryHandler(prevSong);
        }
    };

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            return {
                ...song,
                active: song.id === nextPrev.id,
            };
        });
        setSongs(newSongs);
    };

    const getTime = (time) =>
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);

    // Animation styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
    };

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div
                    style={{
                        background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
                    }}
                    className="track"
                >
                    <input
                        min={0}
                        max={songInfo.duration || 0}
                        value={songInfo.currentTime}
                        onChange={dragHandler}
                        type="range"
                    />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>
                    {songInfo.duration ? getTime(songInfo.duration) : "00:00"}
                </p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler("skip-back")}
                    size="2x"
                    className="skip-back"
                    icon={faAngleLeft}
                />
                {!isPlaying ? (
                    <FontAwesomeIcon
                        onClick={playSongHandler}
                        size="2x"
                        className="play"
                        icon={faPlay}
                    />
                ) : (
                    <FontAwesomeIcon
                        onClick={playSongHandler}
                        size="2x"
                        className="pause"
                        icon={faPause}
                    />
                )}
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler("skip-forward")}
                    size="2x"
                    className="skip-forward"
                    icon={faAngleRight}
                />
            </div>
        </div>
    );
};

export default Player;
