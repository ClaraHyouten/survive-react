import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// components
import { QuestList } from "../components/QuestList";
import { ResourcePanel } from "../components/ResourcePanel";
import { Map } from "../components/Map";
// store
import { useGameData } from "../store/useGameData";


const defaultQuests = [
    {
        id: 1,
        name: "Une bonne nuit de sommeil",
        description: "Créez une cabane pour loger les premiers aventuriers.",
        completed: false,
    },
    {
        id: 2,
        name: "Envoyer les aventurier en forêt",
        description: "Pour gagner du bois et de la nourriture",
        completed: false,
    },
    {
        id: 3,
        name: "Construisez une nouvelle cabane",
        description: "Il faut agrandir la colonie",
        completed: false,
    },
    {
        id: 4,
        name: "Créez une ferme",
        description: "Pour gagner de la nourriture",
        completed: false,
    },
    { id: 5,
        name: "Créez une scierie",
        description: "Pour gagner du bois",
        completed: false,
    }
];

export function Game() {
    // ? Store Zustand
    const { initGame, ressources, addRessource, removeRessource, time, addTime } = useGameData();
    const { food, people } = ressources;
    const availablePeople = useGameData((state) => state.getAvailablePeople());

    const navigate = useNavigate();
    
    const [quests, setQuests] = useState(defaultQuests);

    function handleValidateQuest(questId){
        const updatedQuests = quests.map((quest) => {
            if (quest.id === questId) {
                quest.completed = true;
            }
            return quest;
        });
        setQuests(updatedQuests);
    };

    useEffect(() => {
        const interval = setInterval(()=>{
            addTime();
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    },[]);

    useEffect(() => {
        if(time % 10 == 0){
            people > 0 && removeRessource("food", people);
        };
        if(time % 5 == 0){
            const workers = people - availablePeople;
            addRessource("food", 1 * workers);
            addRessource("wood", 1 * workers);
        }
    }, [time]);

    useEffect(() => {
        if(food === 0){
            initGame();
            navigate("/game-over")
        };
    }, [food]);


    return (
        <div className="w-full h-full flex flex-col justify-start items-center bg-blue-50 p-2">
            <div className="flex items-start w-full gap-2">
                <QuestList quests={quests} onValidateQuest={handleValidateQuest} />
                <ResourcePanel />
            </div>
            <Map />
        </div>
    );
}