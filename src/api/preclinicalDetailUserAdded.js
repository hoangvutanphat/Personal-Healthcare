import axiosApiInstance from "../utils/axiosClient";

const preclinicalDetailUserAddedApi = {
    getAllPreclinicalDetailUserAdded: () => {
        const path = `/preclinicalDetailUserAdded/getAll`;
        return axiosApiInstance.get(path);
    },
    getPreclinicalDetailUserAdded: (id) => {
        const path = `/preclinicalDetailUserAdded/getPreclinicalDetailUserAdded/${id}`;
        return axiosApiInstance.get(path);
    },
    createPreclinicalDetailUserAdded: (data) => {
        const path = `/preclinicalDetailUserAdded/createPreclinicalDetailUserAdded`;
        return axiosApiInstance.post(path, data);
    },
    updatePreclinicalDetailUserAdded: (data, id) => {
        const path = `/preclinicalDetailUserAdded/updatePreclinicalDetailUserAdded/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deletePreclinicalDetailUserAdded: (id) => {
        const path = `/preclinicalDetailUserAdded/deletePreclinicalDetailUserAdded/${id}`;
        return axiosApiInstance.delete(path);
    },
};

export default preclinicalDetailUserAddedApi;