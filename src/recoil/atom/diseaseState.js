import { atom, selector } from "recoil";
import { arrayToTree } from "../../common";

const diseasesState = atom({
    key: "diseasesState",
    default: [],
});

const diseasesSelectState = atom({
    key: "diseasesSelectState",
    default: undefined,
});

const diseaseOptionsState = selector({
    key: "diseaseOptionsState",
    get: ({ get }) => {
        const diseaseList = get(diseasesState);

        if (diseaseList.length) {
            const modifyData = diseaseList?.map((item) => ({
                title: item.NAME,
                value: item.id,
                key: item.id,
                ...item,
            }));
            return arrayToTree(modifyData);
        }
        return [];
    }
})

export {
    diseasesState,
    diseaseOptionsState,
    diseasesSelectState
}