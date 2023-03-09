import axiosApiInstance from "../utils/axiosClient";

const liverEnzymeApi = {
    getAllLiverEnzymes: () => {
        const path = `/liverEnzyme/getAll`;
        return axiosApiInstance.get(path);
    },
    getLiverEnzymeById: (id) => {
        const path = `/liverEnzyme/getLiverEnzyme/${id}`;
        return axiosApiInstance.get(path);
    },
    createLiverEnzyme: (data) => {
        const path = `/liverEnzyme/createLiverEnzyme`;
        return axiosApiInstance.post(path, data);
    },
    updateLiverEnzyme: (data, id) => {
        const path = `/liverEnzyme/updateLiverEnzyme/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteLiverEnzyme: (id) => {
        const path = `/liverEnzyme/deleteLiverEnzyme/${id}`;
        return axiosApiInstance.delete(path);
    },
    getAllLiverEnzymeByUserId: () => {
        const path = `/liverEnzyme/getAllLiverEnzymeByUserId`;
        return axiosApiInstance.get(path);
    },
};

export default liverEnzymeApi;