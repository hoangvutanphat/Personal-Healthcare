import { atom } from "recoil";

const nutritionState = atom({
    key: "nutritionState",
    default: undefined,
});

const motiveState = atom({
    key: "motiveState",
    default: undefined,
});

const otherHabitState = atom({
    key: "otherHabitState",
    default: undefined,
});

const resultState = atom({
    key: "resultState",
    default: undefined,
});



export {
    nutritionState,
    motiveState,
    otherHabitState,
    resultState
}