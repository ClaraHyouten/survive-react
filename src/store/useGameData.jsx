import { create } from "zustand";

const defaultRessources = {wood: 10, food: 10, stone: 0, people: 0, availablePeople: 0};

const defaultMap = new Array(5).fill(null).map(() => new Array(5).fill({ type: 'empty', people: 0 }));
defaultMap[0][0] = { type: 'forest2', people: 0 };
defaultMap[0][1] = { type: 'forest', people: 0 };
defaultMap[1][0] = { type: 'forest', people: 0 };
defaultMap[3][4] = { type: 'forest2', people: 0 };
defaultMap[4][2] = { type: 'mountain', people: 0 };
defaultMap[4][3] = { type: 'mountain', people: 0 };
defaultMap[4][4] = { type: 'forest2', people: 0 };

export const useGameData = create((set, get) => ({
    // ? General
    initGame: () => {
        set({
            ressources: defaultRessources,
            cells: [...defaultMap],
            time: 0,
        })
    },
    time: 0,
    addTime: () => {
        set({time: get().time + 1})
    },

    // ? Ressources
    ressources: defaultRessources,
    addRessource: (type, amount) => {
        const current = get().ressources[type];
        set((state) => ({
            ressources: {
                ...state.ressources,
                [type]: current + amount
            }
        }));
    },
    removeRessource: (type, amount) => {
        const current = get().ressources[type];
        set((state) => ({
            ressources: {
                ...state.ressources,
                [type]: Math.max(0, current - amount)
            }
        }))
    },
    getTotalPeopleInForest: () => {
        const cells = get().cells;
        let totalPeopleInForest = 0;

        cells.forEach((row) => {
            row.forEach((cell) => {
                if(cell.type === 'forest' || cell.type === 'forest2'){
                    totalPeopleInForest += cell.people;
                }
            });
        });
        return totalPeopleInForest;
    },
    getAvailablePeople: () => {
        const totalPeople = get().ressources.people;
        const workingPeopleInForest = get().getTotalPeopleInForest();
        const availablePeople = totalPeople - workingPeopleInForest;

        return availablePeople;
    },

    // ? Grid
    cells: [...defaultMap],
    setCells: (updatedCells) => {
        set({cells: updatedCells})
    },
    createHouse(cell){
        const { wood } = get().ressources;
        const { removeRessource, addRessource } = get();
        
        if(wood >= 5){
            cell.type = "house";
            removeRessource("wood", 5);
            addRessource("people", 2);
        }
        return cell;
    },
    updateCellPeople: (position) => {
        const cells = get().cells;
        let availablePeople = get().getAvailablePeople();

        if(availablePeople <= 0) return;

        const updatedCells = cells.map((row) => row.map((cell) => ({ ...cell})));

        let cell = updatedCells[position.y][position.x];

        if(cell.type === "forest" || cell.type === "forest2"){            
            cell.people += 1;
            availablePeople -= 1;
        };

        // ? update cells
        updatedCells[position.y][position.x] = cell;
        set({ cells: updatedCells});

        // ? update ressource "availablePeople"
        set((state) => ({
            ressources: {
                ...state.ressources,
                availablePeople : availablePeople,
            }
        }))
    },
    updateCellType: (newType, position) => {
        const cells = get().cells;
        const createHouse = get().createHouse;
        
        const updatedCells = cells.map((row) => row.map((cell) => ({ ...cell})));
        
        let cell = updatedCells[position.y][position.x];
        if(cell.type != "empty"){
            return;
        };
        if(newType === 'house'){
            cell = createHouse(cell);
        }
        updatedCells[position.y][position.x] = cell;
        set({ cells: updatedCells});
    },

    // ? Leaderboard
    leaderboardData: [{name: "Joueur 1", score: 50}, {name: "Joueur 2", score: 100}, {name: "Joueur 3", score: 20},],
    addPlayer: (player) => {
        const newPlayer = [...get().leaderboardData, player];
        set({leaderboardData: newPlayer});
    },
}));