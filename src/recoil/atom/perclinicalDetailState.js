import { atom } from "recoil";

const newestPreclinicalDetailState = atom({
    key: 'newestPreclinicalDetailState',
    default: undefined,
})

export {
    newestPreclinicalDetailState,
}