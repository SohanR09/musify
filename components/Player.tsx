import React, { useState, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react"; // Icons from lucide-react for play/pause
import { Button } from "@/components/ui/button"; // shadcn button component
import GetPlayPause from "@/utils/api-spotify/track/PlayPause";
import GetVolume from "@/utils/api-spotify/track/GetVolume";

const Player = ({ accessToken }: { accessToken: any }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0); // Current position of the track
  const [trackDuration, setTrackDuration] = useState(180); // Placeholder for track duration
  const [volume, setVolume] = useState(50); // Volume state (default: 50%)
  const [playerId, setPlayerId] = useState();

  useEffect(() => {
    const id: any = window.sessionStorage.getItem("playerId");
    id && setPlayerId(id);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setTrackProgress((prev) => (prev < trackDuration ? prev + 1 : prev));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, trackDuration]);

  const playPauseTrack = async () => {
    const method = isPlaying ? "pause" : "play";

    if (accessToken && playerId && method) {
      GetPlayPause({ accessToken, playerId, method }).then((data) => {
        console.log(data, "data");
      });
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const changeVolume = async (newVolume: number) => {
    setVolume(newVolume);
    GetVolume({ accessToken, volume: newVolume / 100 }).then((data) => {
      console.log(data);
    });
    // Make the API call or SDK method to adjust volume
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-900 text-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src="/path/to/album_cover.jpg" // replace with your dynamic album cover
          alt="Album Cover"
          className="w-12 h-12 object-cover rounded-lg"
        />
        <div>
          <h3 className="text-lg font-semibold">Track Title</h3>
          <p className="text-sm text-gray-400">Artist Name</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button onClick={playPauseTrack}>
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </Button>
        <div className="flex items-center space-x-2 w-64">
          <span>{formatTime(trackProgress)}</span>
          <input
            type="range"
            min="0"
            max={trackDuration}
            value={trackProgress}
            onChange={(e) => setTrackProgress(Number(e.target.value))}
            className="w-full bg-gray-600"
          />
          <span>{formatTime(trackDuration)}</span>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <Volume2 size={20} />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => changeVolume(Number(e.target.value))}
            className="w-24 bg-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
