import { atom, selector } from "recoil";

const medicalConditionState = atom({
    key: "medicalConditionState",
    default: []
});


export {
    medicalConditionState,
}