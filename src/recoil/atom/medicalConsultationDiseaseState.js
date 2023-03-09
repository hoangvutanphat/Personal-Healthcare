import { atom, selector } from "recoil";


const medicalConsultationDiseaseState = atom({
    key: "medicalConsultationDiseaseState",
    default: [],
});

export {
    medicalConsultationDiseaseState,
}