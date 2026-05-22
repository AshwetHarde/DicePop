"use client";

import { useState, useEffect, useRef } from "react";
import { MdOutlineScreenRotation, MdRestartAlt, MdRefresh } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { GoUnmute, GoMute } from "react-icons/go";
import PlayerCard from "./PlayerCard";
import Controls from "./Controls";
import Dice3D from "./Dice3D";
import WinOverlay from "./WinOverlay";
import LossOverlay from "./LossOverlay";
import { useSoundEffects } from "../hooks/useSoundEffects";
import { useIconSize } from "../hooks/useIconSize";
import { useGameLogic } from "../hooks/useGameLogic";

export default function GameWrapper({ vsBot: initialVsBot = false, soundEnabled: initialSoundEnabled = true, onBack }) {
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(initialSoundEnabled);
  const bgmRef = useRef(null);
  const winSoundRef = useRef(null);
  const { playRollSound, stopRollSound, playPressSound } = useSoundEffects(true);
  const { iconSize, backIconRef, settingsIconRef } = useIconSize();
  const {
    scores,
    currentScore,
    activePlayer,
    playing,
    dice,
    winner,
    vsBot,
    isBotThinking,
    isRolling,
    rollDice,
    hold,
    initGame
  } = useGameLogic(playRollSound, stopRollSound, playPressSound, initialVsBot);

  // Background music
  useEffect(() => {
    if (soundEnabled) {
      // Stop any existing background music first
      if (bgmRef.current) {
        bgmRef.current.pause();
      }
      bgmRef.current = new Audio('/sound-effects/play-bgm.mp3');
      bgmRef.current.loop = true;
      bgmRef.current.volume = 0.3;
      bgmRef.current.play().catch(() => {});
    } else {
      // Stop background music if sound is disabled
      if (bgmRef.current) {
        bgmRef.current.pause();
      }
    }

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
    };
  }, [soundEnabled]);

  // Stop background music and play win/loss sound when winner changes
  useEffect(() => {
    if (winner !== null) {
      // Stop background music
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.currentTime = 0;
      }

      // Check if human player (Player 0) won or lost
      let isHumanPlayerWin;
      if (vsBot) {
        // Bot mode: check if human player (Player 0) won
        isHumanPlayerWin = winner === 0;
      } else {
        // Player vs Player: check if current player won
        isHumanPlayerWin = (activePlayer === 0 && winner === 0) || (activePlayer === 1 && winner === 1);
      }
      const soundFile = isHumanPlayerWin ? '/sound-effects/win.mp3' : '/sound-effects/loss.mp3';
      const sound = new Audio(soundFile);
      sound.volume = 0.2;
      sound.play().catch(() => {});
      winSoundRef.current = sound;
    } else {
      // Stop win/loss sound if playing
      if (winSoundRef.current) {
        winSoundRef.current.pause();
        winSoundRef.current.currentTime = 0;
        winSoundRef.current = null;
      }
      // Restart background music when winner is cleared (game restarts)
      if (soundEnabled && bgmRef.current) {
        bgmRef.current.play().catch(() => {});
      }
    };
  }, [winner, soundEnabled, activePlayer, vsBot]);

  // Handle tab visibility change to stop/resume background music
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is hidden, pause background music
        if (bgmRef.current) {
          bgmRef.current.pause();
        }
      } else {
        // Tab is visible again, resume background music if sound is enabled and game is playing
        if (soundEnabled && bgmRef.current && winner === null) {
          bgmRef.current.play().catch(() => {});
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [soundEnabled, winner]);

  // Request fullscreen when game starts
  useEffect(() => {
    const requestFullscreen = async () => {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          await document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          await document.documentElement.msRequestFullscreen();
        }
      } catch (err) {
        console.log('Fullscreen request failed:', err);
      }
    };

    requestFullscreen();

    return () => {
      // Exit fullscreen when component unmounts
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen().catch(() => {});
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen().catch(() => {});
      }
    };
  }, []);

  const handleBackClick = () => {
    playPressSound();
    setShowQuitModal(true);
  };

  const handleConfirmQuit = () => {
    playPressSound();
    setShowQuitModal(false);
    if (onBack) onBack();
  };

  const handleCancelQuit = () => {
    playPressSound();
    setShowQuitModal(false);
  };

  const handleSettingsClick = () => {
    playPressSound();
    setShowSettingsModal(true);
  };

  const handleCloseSettings = () => {
    playPressSound();
    setShowSettingsModal(false);
  };

  const toggleSound = () => {
    playPressSound();
    setSoundEnabled(!soundEnabled);
  };

  const handleRestartGame = () => {
    playPressSound();
    initGame(vsBot);
    setShowSettingsModal(false);
  };

  const handleWinnerRestart = () => {
    playPressSound();
    // Stop win/loss sound if playing
    if (winSoundRef.current) {
      winSoundRef.current.pause();
      winSoundRef.current.currentTime = 0;
      winSoundRef.current = null;
    }
    initGame(vsBot);
  };

  const handleWinnerQuit = () => {
    playPressSound();
    // Stop win/loss sound if playing
    if (winSoundRef.current) {
      winSoundRef.current.pause();
      winSoundRef.current.currentTime = 0;
      winSoundRef.current = null;
    }
    if (onBack) onBack();
  };

  return (
    <div className="relative w-full h-full flex flex-row overflow-hidden plastic-panel border-[3px] sm:border-[4px] md:border-[5px] lg:border-[6px] xl:border-[7px] 2xl:border-[8px] border-black">
      
      {/* Back Icon - Left */}
      <button
        ref={backIconRef}
        className="absolute top-4 left-4 z-50 bg-white rounded-full hover:opacity-80 transition-opacity shadow-lg"
        onClick={handleBackClick}
      >
        <IoIosArrowBack  className="text-black" />
      </button>

      {/* Settings Icon - Right Top */}
      <button
        ref={settingsIconRef}
        className="absolute top-4 right-4 z-50 bg-white rounded-full hover:opacity-80 transition-opacity shadow-lg"
        onClick={handleSettingsClick}
      >
        <LuSettings className="text-black" />
      </button>
      
      {/* Players */}
      <PlayerCard
        name="Player 1"
        score={scores[0]}
        isActive={activePlayer === 0 && playing}
        isWinner={winner === 0}
        index={0}
      />
      
      <PlayerCard
        name={vsBot ? "Bot" : "Player 2"}
        score={scores[1]}
        isActive={activePlayer === 1 && playing}
        isWinner={winner === 1}
        index={1}
      />

      {/* Top Center: Current Score */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[75%] sm:w-[65%] md:w-[55%] lg:w-[50%] xl:w-[45%] 2xl:w-[40%] max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[260px] xl:max-w-[300px] 2xl:max-w-[340px] h-[42px] sm:h-[48px] md:h-[54px] lg:h-[70px] xl:h-[80px] 2xl:h-[90px] overflow-hidden rounded-b-lg sm:rounded-b-xl md:rounded-b-2xl lg:rounded-b-3xl border-b-[3px] sm:border-b-[4px] md:border-b-[5px] lg:border-b-[6px] xl:border-b-[7px] border-x-[3px] sm:border-x-[4px] md:border-x-[5px] lg:border-x-[6px] xl:border-x-[7px] border-black plastic-board px-1 sm:px-1.5 md:px-2 lg:px-3 xl:px-4 pb-0.5 sm:pb-1 md:pb-1.5 lg:pb-2 xl:pb-2.5 pt-0.5 sm:pt-0.75 md:pt-1 lg:pt-1.25 xl:pt-1.5 z-40 flex flex-col items-center justify-center shadow-2xl">
        <p className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs xl:text-sm 2xl:text-base uppercase font-black text-gray-400 tracking-widest mb-0 sm:mb-0.25 md:mb-0.5 lg:mb-0.75 xl:mb-1 leading-none">
          Current
        </p>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-black text-black leading-tight">
          {dice === 1 ? 0 : (dice ?? 0)}
        </p>
      </div>

      {/* Center Divider Line (Independent of Player Opacity) */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] sm:w-[4px] md:w-[5px] lg:w-[6px] xl:w-[7px] 2xl:w-[8px] bg-black z-20 pointer-events-none"></div>

      {/* Center 3D Dice */}
      <div className="absolute inset-0 flex items-center justify-center z-30">
        <div
          className={`relative w-[55vw] sm:w-[50vw] md:w-[40vw] lg:w-[32vw] xl:w-[25vw] 2xl:w-[22vw] min-w-[80px] sm:min-w-[100px] md:min-w-[120px] lg:min-w-[140px] xl:min-w-[160px] 2xl:min-w-[180px] max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[260px] xl:max-w-[300px] 2xl:max-w-[340px] aspect-square flex items-center justify-center shadow-2xl rounded-full ${(activePlayer === 1 && vsBot) || isBotThinking || isRolling ? 'pointer-events-none' : 'cursor-pointer'}`}
          onClick={rollDice}
        >
          {/* Background Circle */}
          <div className="absolute inset-0 plastic-circle rounded-full border-[3px] sm:border-[4px] md:border-[5px] lg:border-[6px] xl:border-[7px] 2xl:border-[8px] border-black z-0"></div>
          
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Dice3D value={dice} isRolling={isRolling} />
          </div>
        </div>
      </div>

      {/* Bottom Center: Controls */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-40 w-[92%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[60%] 2xl:w-[55%] max-w-[150px] sm:max-w-[190px] md:max-w-[230px] lg:max-w-[270px] xl:max-w-[310px] 2xl:max-w-[350px] h-[42px] sm:h-[48px] md:h-[54px] lg:h-[70px] xl:h-[80px] 2xl:h-[90px] overflow-hidden rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl lg:rounded-t-3xl border-t-[3px] sm:border-t-[4px] md:border-t-[5px] lg:border-t-[6px] xl:border-t-[7px] border-x-[3px] sm:border-x-[4px] md:border-x-[5px] lg:border-x-[6px] xl:border-x-[7px] border-black plastic-board-bottom px-1 sm:px-1.5 md:px-2 lg:px-3 xl:px-4 pt-0.75 sm:pt-1 md:pt-1.5 lg:pt-2 xl:pt-2.5 pb-0.75 sm:pb-1 md:pb-1.5 lg:pb-2 xl:pb-2.5 shadow-2xl">
        <Controls
          onRoll={rollDice}
          onHold={hold}
          isPlaying={playing}
          isRolling={isRolling}
          isBotTurn={(activePlayer === 1 && vsBot) || isBotThinking}
        />
      </div>

      <WinOverlay winner={winner} vsBot={vsBot} onRestart={handleWinnerRestart} onQuit={handleWinnerQuit} />
      <LossOverlay winner={winner} vsBot={vsBot} onRestart={handleWinnerRestart} onQuit={handleWinnerQuit} />

      {/* Quit Confirmation Modal */}
      {showQuitModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14 bg-black/60 backdrop-blur-sm" onClick={() => setShowQuitModal(false)}>
          <div className="relative w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px] xl:max-w-[360px] 2xl:max-w-[400px] p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-9 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-black plastic-panel" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-slate-800 mb-3 sm:mb-4 md:mb-5 uppercase font-jua plastic-text-emboss">
              Quit Game?
            </h3>
            <p className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl text-slate-700 mb-4 sm:mb-5 md:mb-6">
              Are you sure you want to quit? Your progress will be lost.
            </p>
            <div className="flex gap-2 sm:gap-3 md:gap-4">
              <button
                onClick={handleCancelQuit}
                className="flex-1 py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4 2xl:py-4.5 rounded-xl sm:rounded-2xl md:rounded-3xl font-bold text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl uppercase tracking-wide transition-all shadow-lg border-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white border-gray-600"
              >
                <span className="inline-block hover:scale-110 active:scale-95 transition-transform">Cancel</span>
              </button>
              <button
                onClick={handleConfirmQuit}
                className="flex-1 py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4 2xl:py-4.5 rounded-xl sm:rounded-2xl md:rounded-3xl font-bold text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl uppercase tracking-wide transition-all shadow-lg border-3 bg-gradient-to-r from-red-400 to-red-500 text-white border-red-600"
              >
                <span className="inline-block hover:scale-110 active:scale-95 transition-transform">Quit</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14 bg-black/60 backdrop-blur-sm" onClick={() => setShowSettingsModal(false)}>
          <div className="relative w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px] xl:max-w-[360px] 2xl:max-w-[400px] p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-9 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-black plastic-panel" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-slate-800 mb-4 sm:mb-5 md:mb-6 uppercase font-jua plastic-text-emboss">
              Settings
            </h3>

            {/* Music Toggle */}
            <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
              <span className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl text-slate-700 font-semibold">Music</span>
              <button
                onClick={toggleSound}
                className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18 2xl:w-20 2xl:h-20 rounded-xl sm:rounded-2xl md:rounded-3xl flex items-center justify-center transition-all border-2 ${soundEnabled ? 'bg-purple-400 text-white border-purple-600' : 'bg-gray-400 text-white border-gray-600'}`}
              >
                {soundEnabled ? (
                  <GoUnmute className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10" />
                ) : (
                  <GoMute className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10" />
                )}
              </button>
            </div>

            {/* Restart Game */}
            <button
              onClick={handleRestartGame}
              className="w-full py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4 2xl:py-4.5 rounded-xl sm:rounded-2xl md:rounded-3xl font-bold text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl uppercase tracking-wide transition-all border-2 bg-yellow-400 text-yellow-900 border-yellow-600 mb-3 sm:mb-4 md:mb-5"
            >
              Restart Game
            </button>

            {/* Close Button */}
            <button
              onClick={handleCloseSettings}
              className="w-full py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4 2xl:py-4.5 rounded-xl sm:rounded-2xl md:rounded-3xl font-bold text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl uppercase tracking-wide transition-all border-2 bg-blue-400 text-white border-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Portrait Overlay */}
      <div className="portrait-overlay fixed inset-0 z-[100] bg-black text-white flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14 text-center">
        <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-14 2xl:mb-16 animate-rotate-90">
          <MdOutlineScreenRotation className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28 text-white" />
        </div>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-black mb-1 sm:mb-2 md:mb-3 lg:mb-4 uppercase tracking-wider">Rotate Device</h2>
        <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">Please rotate your device horizontally</p>
      </div>
    </div>
  );
}



