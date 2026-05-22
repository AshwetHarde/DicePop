import { useState, useEffect } from "react";

const WINNING_SCORE = 100;

export function useGameLogic(playRollSound, stopRollSound, playPressSound, initialVsBot = false) {
  const [scores, setScores] = useState([0, 0]);
  const [currentScore, setCurrentScore] = useState(0);
  const [activePlayer, setActivePlayer] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [dice, setDice] = useState(null);
  const [winner, setWinner] = useState(null);
  const [vsBot, setVsBot] = useState(initialVsBot);
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [isRolling, setIsRolling] = useState(false);

  const initGame = (playWithBot = false) => {
    setScores([0, 0]);
    setCurrentScore(0);
    setActivePlayer(0);
    setPlaying(true);
    setDice(null);
    setWinner(null);
    setVsBot(playWithBot);
    setIsBotThinking(false);
    setIsRolling(false);
  };

  const switchPlayer = () => {
    setCurrentScore(0);
    setActivePlayer((prev) => (prev === 0 ? 1 : 0));
  };

  const processRoll = (diceValue) => {
    setDice(diceValue);
    if (diceValue !== 1) {
      setCurrentScore((prev) => prev + diceValue);
      // Update player's total score in real-time
      setScores((prevScores) => {
        const newScores = [...prevScores];
        newScores[activePlayer] += diceValue;
        
        // Check for win condition immediately
        if (newScores[activePlayer] >= WINNING_SCORE) {
          setPlaying(false);
          setWinner(activePlayer);
          setDice(null);
        }
        
        return newScores;
      });
    } else {
      switchPlayer();
    }
  };

  const rollDice = () => {
    if (!playing || isBotThinking || isRolling) return;
    playPressSound();
    setIsRolling(true);
    playRollSound();
    
    // Simulate dice roll duration
    setTimeout(() => {
      const diceValue = Math.floor(Math.random() * 6) + 1;
      processRoll(diceValue);
      setIsRolling(false);
      stopRollSound();
    }, 600);
  };

  const hold = () => {
    if (!playing || isBotThinking || isRolling) return;
    playPressSound();

    // Score is already updated in real-time, just switch player
    if (scores[activePlayer] >= WINNING_SCORE) {
      setPlaying(false);
      setWinner(activePlayer);
      setDice(null);
    } else {
      switchPlayer();
    }
  };

  // Bot Logic
  useEffect(() => {
    if (vsBot && activePlayer === 1 && playing && !winner) {
      setIsBotThinking(true);

      const timer = setTimeout(() => {
        // More aggressive bot logic
        const botTotalScore = scores[1] + currentScore;
        const playerScore = scores[0];
        const scoreDifference = botTotalScore - playerScore;

        // Bot holds if:
        // 1. Has 25+ points (increased from 20)
        // 2. Is close to winning (within 15 points)
        // 3. Has a significant lead (20+ points ahead)
        // 4. Current score is high enough to be safe (30+ points)
        if (currentScore >= 25 || botTotalScore >= WINNING_SCORE - 15 || scoreDifference >= 20 || currentScore >= 30) {
          // Bot holds
          hold();
          setIsBotThinking(false);
        } else {
          // Bot rolls
          setIsRolling(true);
          playRollSound();
          setTimeout(() => {
            const diceValue = Math.floor(Math.random() * 6) + 1;
            processRoll(diceValue);
            setIsRolling(false);
            stopRollSound();

            // Allow the state changes to propagate before letting bot act again
            if (diceValue !== 1) {
              setTimeout(() => {
                setIsBotThinking(false);
              }, 500);
            } else {
              setIsBotThinking(false);
            }
          }, 600);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [activePlayer, currentScore, playing, winner, vsBot, scores]);

  return {
    scores,
    currentScore,
    activePlayer,
    playing,
    dice,
    winner,
    vsBot,
    isBotThinking,
    isRolling,
    initGame,
    rollDice,
    hold
  };
}
