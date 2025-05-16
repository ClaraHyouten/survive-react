// store
import {useGameData} from '../store/useGameData';
// icons
import WoodIcon from "@/assets/img/icons/wood.svg";
import StoneIcon from "@/assets/img/icons/stone.svg";
import FoodIcon from "@/assets/img/icons/meat.svg";
import PeopleIcon from "@/assets/img/icons/survivor.svg";

export function ResourcePanel() {
    // ? Autres syntaxes possibles
    // const { ressources } = useGameData((state) => state);
    // const food = useGameData((state) => state.food);
    const { ressources } = useGameData();
    const { wood, stone, food, people } = ressources;
    const availablePeople = useGameData((state) => state.getAvailablePeople());

    return (
        <ul className="bg-blue-100 p-2 w-full flex items-center rounded-xl border-1 border-blue-200 gap-6">
            <li className="flex items-center">
                <img src={PeopleIcon} width="40" className="mr-1"/>
                <span className="font-bold text-xl text-blue-400 bg-white px-3 rounded-lg">
                    {availablePeople}
                    <span className="opacity-50">
                        /{people}
                    </span>
                </span>
                
            </li>
            <li className="flex items-center">
                <img src={FoodIcon} width="40" className="mr-1"/>
                <span className="font-bold text-xl text-blue-400 bg-white px-3 rounded-lg">{food}</span>
            </li>
            <li className="flex items-center">
                <img src={WoodIcon} width="40" className="mr-1"/>
                <span className="font-bold text-xl text-blue-400 bg-white px-3 rounded-lg">{wood}</span>
            </li>
            <li className="flex items-center">
                <img src={StoneIcon} width="40" className="mr-1"/>
                <span className="font-bold text-xl text-blue-400 bg-white px-3 rounded-lg">{stone}</span>
            </li>
        </ul>
    );
}