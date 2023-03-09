import { atom } from "recoil";

const examinationPackageState = atom({
    key: "examinationPackageState",
    default: "Tự khám"
});

export {
    examinationPackageState,
}