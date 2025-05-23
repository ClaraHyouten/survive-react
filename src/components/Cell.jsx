// icons
import ForestIcon from "@/assets/img/icons/tree.svg";
import Forest2Icon from "@/assets/img/icons/tree2.svg";
import HouseIcon from "@/assets/img/icons/shed.svg";
import MountainIcon from "@/assets/img/icons/mountain.svg";

const icons = {
    forest: ForestIcon,
    forest2: Forest2Icon,
    house: HouseIcon,
    mountain: MountainIcon,
};

export function Cell({ type, peopleWorking, onClick }) {
    
    return (
        <div className="cell-game relative flex justify-center items-center border-1 border-blue-200 hover:bg-blue-200" onClick={onClick}>
            { icons[type] && <img src={icons[type]} alt={type} className="w-16 h-16" /> }
            {peopleWorking > 0 &&
            <span className="bg-white rounded-full w-4 h-4 text-xs font-semibold text-center absolute top-1.5 right-1.5">
                 {peopleWorking}
            </span>}
        </div>
    );
}