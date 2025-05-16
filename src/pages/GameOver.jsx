import { useState } from 'react';
import { Link } from 'react-router-dom';
// store
import { useGameData } from '../store/useGameData';
// components
import { LeaderBoard } from '../components/LeaderBoard';
// icons
import GameOverIcon from '../assets/img/icons/skull.svg';

export function GameOver(){
    const [name, setName] = useState("");
    const { addPlayer, time, initGame } = useGameData();

    function handleSubmit(event){
        event.preventDefault();
        addPlayer({name: name, score: time * 10});
    };

    return (
        <nav className="w-full h-full flex flex-col justify-center items-center bg-blue-300">
            <img className="w-16" src={GameOverIcon} />
            <h1 className="text-white font-bold text-6xl">
                Game Over
            </h1>
            <h2 className="rotate-5 ml-16 mb-8 text-white animate-pulse">
                Leaderboard
            </h2>
            <div className="flex flex-col items-stretch max-w-md gap-2 my-4">
                <Link to ="/game" onClick={() => initGame()}
                    className="bg-white rounded px-4 py-2 w-32" 
                >
                    Restart
                </Link>
            </div>

            {/* // ? Form */}
            <form onSubmit={handleSubmit} >
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        id='name' 
                        value={name} 
                        onChange={(event) => setName(event.target.value)}
                        className="bg-blue-300 border-2 border-white rounded focus:ring-blue-400 px-4 py-2"
                        placeholder="Entrez votre nom" 
                    />

                    <button
                        type='submit'
                        className="bg-white rounded px-4 py-2 w-24 disabled:bg-gray-300 disabled:text-gray-400"
                        disabled={name.length < 3}
                        >
                        Envoyer
                    </button>
                </div>
                {name && name.length < 3 && <p className="text-red-600">Le nom doit comporter au moins 3 caractères.</p>}
            </form>

            <LeaderBoard />

        </nav>
    );
};