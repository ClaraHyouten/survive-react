import { create } from "zustand";

const defaultRessources = {wood: 10, food: 10, stone: 0, people: 0, availablePeople: 0};
const defaultMap = new Array(5).fill(null).map(() => new Array(5).fill({ type: 'empty' }));
defaultMap[0][0] = { type: 'forest2' };
defaultMap[0][1] = { type: 'forest' };
defaultMap[1][0] = { type: 'forest' };
defaultMap[3][4] = { type: 'forest2' };
defaultMap[4][2] = { type: 'mountain' };
defaultMap[4][3] = { type: 'mountain' };
defaultMap[4][4] = { type: 'forest2' };

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

    // ? Grid
    cells: [...defaultMap],
    setCells: (updatedCells) => {
        set({cells: updatedCells})
    },

    // ? Leaderboard
    leaderboardData: [{name: "Joueur 1", score: 50}, {name: "Joueur 2", score: 100}, {name: "Joueur 3", score: 20},],
    addPlayer: (player) => {
        const newPlayer = [...get().leaderboardData, player];
        set({leaderboardData: newPlayer});
    },
}));