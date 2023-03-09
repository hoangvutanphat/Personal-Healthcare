import { atom } from "recoil";

const clinicalDetailState = atom({
    key: "clinicalDetailState",
    default: []
});

const newestClinicalDetailState = atom({
    key: "newestClinicalDetailState",
    default: undefined
});

export {
    clinicalDetailState,
    newestClinicalDetailState,
}