import { useGameData } from "../store/useGameData";

export function LeaderBoard(){
    const { leaderboardData } = useGameData();

    const sortedLeaderboard = [...leaderboardData].sort((a, b) => b.score - a.score);

    return (
        <ul className="bg-blue-100 flex flex-col items-center rounded-xl border-1 border-blue-200 w-72">
            {sortedLeaderboard.map((player, index) => (
                <li key={index} className="flex w-full p-3 border-b border-blue-200 last:border-b-0 items-center">
                    <div className="flex flex-col flex-1 gap-2">
                        <p className="font-bold leading-none text-sm flex items-center gap-1">
                            {player.name}
                            {index === 0 && 
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trophy-icon lucide-trophy"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                            </span>}
                        </p>
                        <p className="leading-none text-xs">Score : {player.score}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
};