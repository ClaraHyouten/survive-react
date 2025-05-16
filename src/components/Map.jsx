// store
import { useGameData } from "../store/useGameData";
// components
import { Cell } from "./Cell";

export function Map() {
    const { cells, updateCellType, updateCellPeople } = useGameData();

    function handleClick(position) {
        // Try create house
        updateCellType('house', position);
        // Try to send people working
        updateCellPeople(position);
    };

    return (
        <div className="bg-blue-100 grid grid-cols-5 grid-rows-5 min-w-90 h-90 border-collapse border-b-6 rounded-b-lg border-blue-300 ">
            {
                cells.map((row, rowIndex) => {
                    return row.map((cell, colIndex) => {
                        return <Cell 
                            type={cell.type}
                            peopleWorking={cell.people} 
                            onClick={()=>handleClick({ x: colIndex, y: rowIndex })}
                            key={`${colIndex}-${rowIndex}`}
                        />;
                    });
                })
            }
        </div>
    );
}