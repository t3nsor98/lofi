import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, Clock, Quote } from "lucide-react";

const LofiApp = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState("rain");
  const [volume, setVolume] = useState(0.5);
  const [currentQuote, setCurrentQuote] = useState(0);
  const audioRef = useRef(null);

  // Motivational quotes
  const quotes = [
    "Focus on the journey, not the destination. Joy is found not in finishing an activity but in doing it.",
    "The successful warrior is the average person with laser-like focus.",
    "Concentrate all your thoughts upon the work in hand. The sun's rays do not burn until brought to a focus.",
    "Where focus goes, energy flows and results show.",
    "The art of being wise is knowing what to overlook.",
    "Deep work is like a superpower in our increasingly competitive twenty-first-century economy.",
    "The key to success is to focus our conscious mind on things we desire not things we fear.",
    "Your attention is your most precious resource. Guard it wisely.",
  ];

  // Sound options with simulated audio URLs
  const sounds = {
    rain: { name: "Rain", color: "from-blue-600 to-blue-800", icon: "🌧️" },
    coffee: {
      name: "Coffee Shop",
      color: "from-amber-600 to-amber-800",
      icon: "☕",
    },
    forest: {
      name: "Forest",
      color: "from-green-600 to-green-800",
      icon: "🌲",
    },
    waves: {
      name: "Ocean Waves",
      color: "from-cyan-600 to-cyan-800",
      icon: "🌊",
    },
    fireplace: {
      name: "Fireplace",
      color: "from-orange-600 to-orange-800",
      icon: "🔥",
    },
    lofi: {
      name: "Lofi Beats",
      color: "from-purple-600 to-purple-800",
      icon: "🎵",
    },
  };

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Change quote every 30 seconds
  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 30000);

    return () => clearInterval(quoteTimer);
  }, []);

  // Simulate audio functionality
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real app, you'd control actual audio here
  };

  const handleSoundChange = (soundKey) => {
    setCurrentSound(soundKey);
    // In a real app, you'd switch audio sources here
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${sounds[currentSound].color} transition-all duration-1000 ease-in-out`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-5 rounded-full animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-white opacity-3 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white opacity-2 rounded-full animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Digital Clock */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Clock className="text-white/80 mr-3" size={32} />
            <h1 className="text-white text-2xl font-light">Focus Time</h1>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="text-6xl md:text-8xl font-mono text-white font-light tracking-wider mb-2">
              {formatTime(currentTime)}
            </div>
            <div className="text-white/70 text-lg font-light">
              {formatDate(currentTime)}
            </div>
          </div>
        </div>

        {/* Sound Selection */}
        <div className="mb-8">
          <h2 className="text-white/90 text-xl font-light mb-6 text-center">
            Choose Your Atmosphere
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(sounds).map(([key, sound]) => (
              <button
                key={key}
                onClick={() => handleSoundChange(key)}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  currentSound === key
                    ? "bg-white/20 scale-105 shadow-lg"
                    : "bg-white/10 hover:bg-white/15"
                } backdrop-blur-sm border border-white/10`}
              >
                <div className="text-2xl mb-2">{sound.icon}</div>
                <div className="text-white font-light text-sm">
                  {sound.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Play/Pause Controls */}
        <div className="flex items-center space-x-6 mb-8">
          <button
            onClick={togglePlay}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-300 border border-white/20 hover:scale-110"
          >
            {isPlaying ? (
              <Pause className="text-white" size={32} />
            ) : (
              <Play className="text-white ml-1" size={32} />
            )}
          </button>

          <div className="flex items-center space-x-3">
            <Volume2 className="text-white/70" size={20} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Status indicator */}
        {isPlaying && (
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white/70 text-sm">
              Playing {sounds[currentSound].name}
            </span>
          </div>
        )}

        {/* Motivational Quote */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-start space-x-4">
              <Quote className="text-white/60 mt-1 flex-shrink-0" size={24} />
              <div>
                <p className="text-white/90 text-lg font-light leading-relaxed mb-4">
                  "{quotes[currentQuote]}"
                </p>
                <div className="flex justify-center">
                  <div className="flex space-x-2">
                    {quotes.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentQuote ? "bg-white/80" : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-white/50 text-sm font-light">
            Take a deep breath. Focus on what matters.
          </p>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default LofiApp;
