import { useRef, useState, useEffect } from "react";

export function useSoundEffects(soundEnabled = true) {
  const rollSoundRef = useRef(null);
  const [rollSoundReady, setRollSoundReady] = useState(false);
  
  const pressSoundRef = useRef(null);
  const [pressSoundReady, setPressSoundReady] = useState(false);

  useEffect(() => {
    if (!soundEnabled) return;
    
    const rollAudio = new Audio("/sound-effects/rolling.mp3");
    rollAudio.volume = 0.6;
    rollAudio.preload = 'auto';
    rollAudio.load();
    
    rollAudio.addEventListener('canplaythrough', () => {
      setRollSoundReady(true);
    }, { once: true });
    
    rollSoundRef.current = rollAudio;
    
    return () => {
      rollAudio.removeEventListener('canplaythrough', () => {
        setRollSoundReady(true);
      });
    };
  }, [soundEnabled]);

  useEffect(() => {
    if (!soundEnabled) return;
    
    const pressAudio = new Audio("/sound-effects/press.mp3");
    pressAudio.volume = 0.5;
    pressAudio.preload = 'auto';
    pressAudio.load();
    
    pressAudio.addEventListener('canplaythrough', () => {
      setPressSoundReady(true);
    }, { once: true });
    
    pressSoundRef.current = pressAudio;
    
    return () => {
      pressAudio.removeEventListener('canplaythrough', () => {
        setPressSoundReady(true);
      });
    };
  }, [soundEnabled]);

  const playRollSound = () => {
    if (!soundEnabled || !rollSoundRef.current || !rollSoundReady) return;
    rollSoundRef.current.currentTime = 0;
    rollSoundRef.current.play().catch((err) => {
      console.error('Roll sound play error:', err);
    });
  };

  const stopRollSound = () => {
    if (rollSoundRef.current) {
      rollSoundRef.current.pause();
      rollSoundRef.current.currentTime = 0;
    }
  };

  const playPressSound = () => {
    if (!soundEnabled || !pressSoundRef.current || !pressSoundReady) return;
    pressSoundRef.current.pause();
    pressSoundRef.current.currentTime = 0;
    pressSoundRef.current.play().catch((err) => {
      console.error('Press sound play error:', err);
    });
  };

  return { playRollSound, stopRollSound, playPressSound };
}
