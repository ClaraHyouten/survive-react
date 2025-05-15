import { Link } from 'react-router-dom';
// icons
import GameIcon from '../assets/img/icons/shed.svg';

export function Menu({ version }){
    
    const sentences = [
        "You're already dead.",
        "Life is hard.",
        "You think you can beat the game?",
        "Good luck!"
    ];


    function handleCreditsClick(){
        alert('Game created by Clara ORTEGA')
    }

    const subtitle = sentences[Math.floor(Math.random() * sentences.length)];

    return (
        <nav className="w-full h-full flex flex-col justify-center items-center bg-blue-300">
            <img className="w-16" src={GameIcon} />
            <h1 className="text-white font-bold text-6xl">
                Survive React
            </h1>
            <h2 className="rotate-5 ml-16 mb-8 text-white animate-pulse">
                { subtitle }
            </h2>
            <div className="flex flex-col items-stretch max-w-md gap-2 my-4">
                <Link to="/game" 
                    className="bg-white rounded px-4 py-2 w-32 flex items-center justify-center" 
                >
                    Play
                </Link>
                <button 
                    className="bg-white rounded px-4 py-2 w-32" 
                    onClick={handleCreditsClick}
                >
                    Credits
                </button>
            </div>
            <p className="text-white">v{version}</p>
        </nav>
    )
}