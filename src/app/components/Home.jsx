"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import { useSoundEffects } from "../hooks/useSoundEffects";

export default function Home({ onStartGame }) {
  const [gameMode, setGameMode] = useState("2player"); // "2player" or "bot"
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { playPressSound } = useSoundEffects(soundEnabled);

  const handleStartGame = () => {
    playPressSound();
    onStartGame(gameMode === "bot", soundEnabled);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-2 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14 plastic-panel border-[3px] sm:border-[4px] md:border-[5px] lg:border-[6px] xl:border-[7px] 2xl:border-[8px] border-black overflow-hidden" style={{ backgroundImage: 'url(/background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-1 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
        {/* Title */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5 2xl:gap-6 mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 2xl:mb-9">
          <h1 className="text-5xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white text-center tracking-tight font-jua drop-shadow-lg">
            Dice Pop
          </h1>
        </div>

        {/* Game Mode Selection - Sliding Toggle */}
        <div className="w-full max-w-[240px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[300px] xl:max-w-[340px] 2xl:max-w-[380px] mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8">
          <div className="relative bg-gray-200 rounded-2xl sm:rounded-3xl md:rounded-4xl p-1 sm:p-1.5 md:p-2 lg:p-2.5 xl:p-3 2xl:p-3.5 border-3 border-gray-300 shadow-lg overflow-hidden">
            {/* Sliding Indicator */}
            <div 
              className={`absolute top-1 sm:top-1.5 md:top-2 lg:top-2.5 xl:top-3 2xl:top-3.5 bottom-1 sm:bottom-1.5 md:bottom-2 lg:bottom-2.5 xl:bottom-3 2xl:bottom-3.5 w-[45%] rounded-xl sm:rounded-2xl md:rounded-3xl transition-all duration-300 ease-out ${gameMode === "2player" ? "left-1 sm:left-1.5 md:left-2 lg:left-2.5 xl:left-3 2xl:left-3.5 bg-gradient-to-r from-pink-500 to-pink-600" : "left-[52.5%] sm:left-[52.5%] md:left-[52.5%] lg:left-[52.5%] xl:left-[52.5%] 2xl:left-[52.5%] bg-gradient-to-r from-cyan-500 to-cyan-600"}`}
            ></div>
            
            {/* Options */}
            <div className="relative flex items-center justify-between">
              <button
                onClick={() => { playPressSound(); setGameMode("2player"); }}
                className={`flex-1 py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4 2xl:py-4.5 rounded-xl sm:rounded-2xl md:rounded-3xl font-bold text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl uppercase tracking-wide transition-all flex items-center justify-center gap-1 sm:gap-1 md:gap-1.5 lg:gap-2 xl:gap-2.5 2xl:gap-3 z-10 ${gameMode === "2player" ? "text-white" : "text-gray-600"}`}
              >
                <MdPeopleAlt className="w-4 h-4 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
                <span className="text-[10px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg">2 Players</span>
              </button>
              <button
                onClick={() => { playPressSound(); setGameMode("bot"); }}
                className={`flex-1 py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4 2xl:py-4.5 rounded-xl sm:rounded-2xl md:rounded-3xl font-bold text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl uppercase tracking-wide transition-all flex items-center justify-center gap-1 sm:gap-1 md:gap-1.5 lg:gap-2 xl:gap-2.5 2xl:gap-3 z-10 ${gameMode === "bot" ? "text-white" : "text-gray-600"}`}
              >
                <RiRobot2Fill className="w-4 h-4 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
                <span className="text-[10px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg">Bot</span>
              </button>
            </div>
          </div>
        </div>

        {/* Rules Button */}
        <div className="w-full max-w-[240px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[300px] xl:max-w-[340px] 2xl:max-w-[380px] mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8">
          <button
            onClick={() => { playPressSound(); setShowRulesModal(true); }}
            className="w-full py-3 sm:py-2 md:py-3 lg:py-4 xl:py-5 2xl:py-6 rounded-2xl sm:rounded-3xl md:rounded-4xl font-bold text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl uppercase tracking-wide transition-all shadow-lg border-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 border-yellow-600"
          >
            <span className="inline-block hover:scale-110 active:scale-95 transition-transform">View Rules</span>
          </button>
        </div>

        {/* Start Game Button */}
        <button
          onClick={handleStartGame}
          className="w-full max-w-[240px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[300px] xl:max-w-[340px] 2xl:max-w-[380px] py-3.5 sm:py-2.5 md:py-3.5 lg:py-4.5 xl:py-5.5 2xl:py-6.5 rounded-2xl sm:rounded-3xl md:rounded-4xl font-black text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl uppercase tracking-wide transition-all shadow-2xl border-4 bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white border-green-700"
        >
          <span className="inline-block hover:scale-110 active:scale-95 transition-transform">Start Game</span>
        </button>
      </div>

      {/* Rules Modal */}
      {showRulesModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12 bg-black/60 backdrop-blur-sm" onClick={() => setShowRulesModal(false)}>
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] xl:max-w-[440px] 2xl:max-w-[480px] p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 2xl:p-8 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-black plastic-panel" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => { playPressSound(); setShowRulesModal(false); }}
              className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 md:top-3 md:right-3 lg:top-4 lg:right-4 xl:top-5 xl:right-5 2xl:top-6 2xl:right-6 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-all shadow-md border-2 border-black"
            >
              <IoClose className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-slate-800" />
            </button>

            <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold text-slate-800 mb-2 sm:mb-3 md:mb-4 uppercase pr-6 sm:pr-8 md:pr-10 lg:pr-12 xl:pr-14 2xl:pr-16 font-jua plastic-text-emboss">
              How to Play
            </h3>
            <ul className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl text-slate-700 space-y-1.5 sm:space-y-2 md:space-y-3">
              <li className="flex items-start gap-1.5 sm:gap-2">
                <span className="font-semibold text-purple-600">•</span>
                <span>Roll the dice to accumulate points</span>
              </li>
              <li className="flex items-start gap-1.5 sm:gap-2">
                <span className="font-semibold text-purple-600">•</span>
                <span>If you roll a 1, you lose all current points and turn passes</span>
              </li>
              <li className="flex items-start gap-1.5 sm:gap-2">
                <span className="font-semibold text-purple-600">•</span>
                <span>Click PASS to bank your points and end your turn</span>
              </li>
              <li className="flex items-start gap-1.5 sm:gap-2">
                <span className="font-semibold text-purple-600">•</span>
                <span>First player to reach 100 points wins!</span>
              </li>
              <li className="flex items-start gap-1.5 sm:gap-2">
                <span className="font-semibold text-purple-600">•</span>
                <span>In Bot mode, the bot plays automatically</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
