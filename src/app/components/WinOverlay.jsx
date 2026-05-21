"use client";

import { useState, useEffect } from "react";
import Lottie from "lottie-react";

export default function WinOverlay({ winner, vsBot, onRestart, onQuit }) {
  const [confettiData, setConfettiData] = useState(null);
  const [trophyData, setTrophyData] = useState(null);

  useEffect(() => {
    fetch('/lottie/Confetti.json')
      .then(res => res.json())
      .then(data => setConfettiData(data))
      .catch(err => console.error('Error loading confetti:', err));

    fetch('/lottie/Trophy.json')
      .then(res => res.json())
      .then(data => setTrophyData(data))
      .catch(err => console.error('Error loading trophy:', err));
  }, []);

  // Determine if should show win overlay
  let shouldShow = false;
  let winnerName = "";
  let winText = "Wins the Game";

  if (vsBot) {
    // Bot mode: only show win overlay if human player (Player 0) won
    if (winner === 0) {
      shouldShow = true;
      winnerName = "You";
      winText = "Won the Game";
    }
  } else {
    // Player vs Player: show win overlay for the winner
    if (winner !== null) {
      shouldShow = true;
      winnerName = winner === 0 ? "Player 1" : "Player 2";
      winText = "Wins the Game";
    }
  }

  if (!shouldShow) return null;
  const gradient = "from-yellow-400 to-yellow-600";

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl rounded-3xl animate-in fade-in duration-500">
      {/* Confetti Animation */}
      {confettiData && (
        <div className="absolute inset-0 pointer-events-none -mt-20 sm:-mt-24 md:-mt-28 lg:-mt-32 xl:-mt-36 2xl:-mt-40">
          <Lottie
            animationData={confettiData}
            loop={true}
            autoplay={true}
            className="w-full h-full"
          />
        </div>
      )}

      <div className="text-center transform transition-all p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14 relative z-10 -mt-10 sm:-mt-12 md:-mt-14 lg:-mt-16 xl:-mt-18 2xl:-mt-20">
        {/* Trophy Animation */}
        {trophyData && (
          <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 2xl:w-80 2xl:h-80 mx-auto mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-5 2xl:mb-6 -mt-8 sm:-mt-10 md:-mt-12 lg:-mt-14 xl:-mt-16 2xl:-mt-18">
            <Lottie
              animationData={trophyData}
              loop={true}
              autoplay={true}
            />
          </div>
        )}
        <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r ${gradient} drop-shadow-2xl mb-0 sm:mb-0 md:mb-0 lg:mb-0 xl:mb-0 2xl:mb-0 uppercase tracking-tighter mt-4 sm:mt-5 md:mt-6 lg:mt-7 xl:mt-8 2xl:mt-9`}>
          {winnerName}
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white font-bold drop-shadow-lg uppercase tracking-widest mt-1 sm:mt-1 md:mt-1 lg:mt-1 xl:mt-1 2xl:mt-1">
          {winText}!
        </p>

        {/* Buttons */}
        <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 2xl:mt-16">
          <button
            onClick={onRestart}
            className="flex-1 py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4 2xl:py-4.5 rounded-xl sm:rounded-2xl md:rounded-3xl font-bold text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl uppercase tracking-wide transition-all border-2 bg-green-400 text-white border-green-600"
          >
            Restart
          </button>
          <button
            onClick={onQuit}
            className="flex-1 py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4 2xl:py-4.5 rounded-xl sm:rounded-2xl md:rounded-3xl font-bold text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl uppercase tracking-wide transition-all border-2 bg-red-400 text-white border-red-600"
          >
            Quit
          </button>
        </div>
      </div>
    </div>
  );
}
