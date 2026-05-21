export default function Controls({ onRoll, onHold, isPlaying, isBotTurn, isRolling }) {
  if (!isPlaying) return null;

  const rollDisabled = isBotTurn || isRolling;
  const holdDisabled = isBotTurn || isRolling;

  return (
    <div className="flex w-full gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 xl:gap-4 2xl:gap-5">
      <button
        onClick={onRoll}
        disabled={rollDisabled}
        className={`cursor-pointer transition-all px-1.5 sm:px-2 md:px-3 lg:px-4 xl:px-5 2xl:px-6 py-1 sm:py-1.5 md:py-2 lg:py-2.5 xl:py-3 2xl:py-3.5 rounded-[0.35em] text-white font-black text-[9px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg tracking-widest uppercase flex-1 ${
          isBotTurn
            ? 'plastic-button-disabled cursor-not-allowed opacity-50'
            : 'plastic-button-purple'
        }`}
      >
        ROLL
      </button>
      
      <button
        onClick={onHold}
        disabled={holdDisabled}
        className={`cursor-pointer transition-all px-1.5 sm:px-2 md:px-3 lg:px-4 xl:px-5 2xl:px-6 py-1 sm:py-1.5 md:py-2 lg:py-2.5 xl:py-3 2xl:py-3.5 rounded-[0.35em] text-white font-black text-[9px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg tracking-widest uppercase flex-1 ${
          isBotTurn
            ? 'plastic-button-disabled cursor-not-allowed opacity-50'
            : 'plastic-button-green'
        }`}
      >
        PASS
      </button>
    </div>
  );
}


