import { atom, selector } from "recoil";

const physicalDetailState = atom({
    key: "physicalDetailState",
    default: []
});

const physicalDetailByIdState = selector({
    key: "physicalDetailByIdState",
    get: ({ get }, id) => {
        const physicalDetailList = get(physicalDetailState);

        return physicalDetailList;
    }
});

const newestPhysicalDetailState = atom({
    key: "physicalDetailSelected",
    default: undefined
});

export {
    physicalDetailState,
    physicalDetailByIdState,
    newestPhysicalDetailState,
}