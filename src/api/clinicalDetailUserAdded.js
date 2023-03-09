import axiosApiInstance from "../utils/axiosClient";

const clinicalDetailUserAddedApi = {
    getAllClinicalDetailUserAdded: () => {
        const path = `/clinicalDetailUserAdded/getAll`;
        return axiosApiInstance.get(path);
    },
    getClinicalDetailUserAdded: (id) => {
        const path = `/clinicalDetailUserAdded/getClinicalDetailUserAdded/${id}`;
        return axiosApiInstance.get(path);
    },
    createClinicalDetailUserAdded: (data) => {
        const path = `/clinicalDetailUserAdded/createClinicalDetailUserAdded`;
        return axiosApiInstance.post(path, data);
    },
    updateClinicalDetailUserAdded: (data, id) => {
        const path = `/clinicalDetailUserAdded/updateClinicalDetailUserAdded/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteClinicalDetailUserAdded: (id) => {
        const path = `/clinicalDetailUserAdded/deleteClinicalDetailUserAdded/${id}`;
        return axiosApiInstance.delete(path);
    },
};

export default clinicalDetailUserAddedApi;
