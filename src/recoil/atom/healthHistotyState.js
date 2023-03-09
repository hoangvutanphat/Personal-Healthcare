import { atom, selector } from "recoil";
import { authState } from "./authState";

const healthHistoryState = atom({
    key: "healthHistoryState",
    default: [],
});

const healthHistoryByUserState = selector({
    key: "healthHistoryByUserState",
    get: ({ get }) => {

        const healthHistoryList = get(healthHistoryState);
        const user = get(authState);
        if (healthHistoryList.length && user) {
            return healthHistoryList.filter(item => item?.USER_ID === user?.profile?.id);
        }
        return []
    }
});

export {
    healthHistoryState,
    healthHistoryByUserState,
}