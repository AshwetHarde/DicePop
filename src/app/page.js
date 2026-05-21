"use client";

import { useState } from "react";
import GameWrapper from "./components/GameWrapper";
import Home from "./components/Home";

export default function Page() {
  const [showGame, setShowGame] = useState(false);
  const [gameMode, setGameMode] = useState("2player");
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleStartGame = (vsBot, sound) => {
    setGameMode(vsBot ? "bot" : "2player");
    setSoundEnabled(sound);
    setShowGame(true);
  };

  const handleBackToHome = () => {
    setShowGame(false);
  };

  return (
    <main className="h-[100dvh] w-screen overflow-hidden bg-sky-300 font-sans p-4 sm:p-6 md:p-8">
      {showGame ? (
        <GameWrapper 
          vsBot={gameMode === "bot"} 
          soundEnabled={soundEnabled}
          onBack={handleBackToHome}
        />
      ) : (
        <Home onStartGame={handleStartGame} />
      )}
    </main>
  );
}
