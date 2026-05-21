export default function PlayerCard({ name, score, isActive, isWinner, index }) {
  const bgColors = index === 0 
    ? "plastic-player-1" 
    : "plastic-player-2";
    
  const contentOpacity = isActive 
    ? "opacity-100 transition-opacity duration-300" 
    : "opacity-60 transition-opacity duration-300 scale-95";

  return (
    <div className={`relative flex-1 w-full h-full flex flex-col overflow-hidden ${bgColors}`}>
      
      {/* Main Content Wrapper (Fades when inactive) */}
      <div className={`absolute inset-0 flex flex-col w-full h-full transition-all duration-300 ${contentOpacity}
        ${index === 0 
          ? "justify-center items-center pr-[20vw] sm:pr-[18vw] md:pr-[15vw] lg:pr-[12vw] xl:pr-[10vw] 2xl:pr-[8vw]" 
          : "justify-center items-center pl-[20vw] sm:pl-[18vw] md:pl-[15vw] lg:pl-[12vw] xl:pl-[10vw] 2xl:pl-[8vw]"
        }
      `}>
        <div className="flex flex-col items-center">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-black text-white/90 mb-0.5 sm:mb-1 md:mb-1.5 lg:mb-2 xl:mb-2.5 2xl:mb-3 tracking-tighter uppercase plastic-text-emboss">
            {name}
          </h2>
          
          <div className="text-[8vh] sm:text-[10vh] md:text-[12vh] lg:text-[14vh] xl:text-[16vh] 2xl:text-[18vh] leading-[0.8] font-black text-white plastic-text-emboss">
            {score}
          </div>
        </div>
      </div>

      {isWinner && (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-20"></div>
      )}
    </div>
  );
}


