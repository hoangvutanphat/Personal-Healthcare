import { atom, selector } from "recoil";

const physicalExamsState = atom({
    key: "physicalExamsState",
    default: [],
})

const physicalExamSelectState = atom({
    key: "physicalExamSelectState",
    default: undefined,
})

const physicalExamLastestState = atom({
    key: "physicalExamLastestState",
    default: [],
})

const newestPhysicalExamState = atom({
    key: "newestPhysicalExamState",
    default: undefined
})

const physicalExamByIdState = atom({
    key: "physicalExamByIdState",
    default: undefined
})

const SelfSpecialPhysicalExamState = selector({
    key: "SelfSpecialPhysicalExamState",
    get: ({ get }) => {
        const physicalExamList = get(physicalExamsState);
        const selfPhysicalExamList = physicalExamList.filter(item => item.TYPE === 2);
        const specialPhysicalExamList = physicalExamList.filter(item => item.TYPE === 7);

        return [...selfPhysicalExamList, ...specialPhysicalExamList]
    }
})

const SelfSpecialPhysicalExamByUserState = atom({
    key: "SelfSpecialPhysicalExamByUserState",
    default: undefined,
})


const bloodLipdByUserIdState = atom({
    key: "bloodLipdByUserIdState",
    default: [],
})

const latestPhysicalExamInputState = atom({
    key: "latestPhysicalExamInputState",
    default: [],
})
const physicalExamType5 = atom({
    key: "physicalExamType5",
    default: undefined
})
const physicalExamType4 = atom({
    key: "physicalExamType4",
    default: undefined
})
const physicalExamOptionState = atom({
    key: "physicalExamOptionState",
    default: [],
});

export {
    physicalExamsState,
    physicalExamSelectState,
    newestPhysicalExamState,
    SelfSpecialPhysicalExamState,
    SelfSpecialPhysicalExamByUserState,
    physicalExamLastestState,
    bloodLipdByUserIdState,
    physicalExamByIdState,
    latestPhysicalExamInputState,
    physicalExamType5,
    physicalExamOptionState,
    physicalExamType4
}