export default function ModeSelector({ isVisible, vsBot, onSelectMode }) {
  if (!isVisible) return null;

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 p-1 bg-white/40 dark:bg-black/60 rounded-full backdrop-blur-xl border border-white/20 shadow-lg">
      <button
        onClick={() => onSelectMode(false)}
        className={`px-5 py-2 text-sm font-bold rounded-full transition-all duration-300 ${
          !vsBot 
            ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/40" 
            : "text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/10"
        }`}
      >
        Vs Player
      </button>
      <button
        onClick={() => onSelectMode(true)}
        className={`px-5 py-2 text-sm font-bold rounded-full transition-all duration-300 ${
          vsBot 
            ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/40" 
            : "text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/10"
        }`}
      >
        Vs Bot
      </button>
    </div>
  );
}
