import axiosApiInstance from "../utils/axiosClient";

const ureCreatineApi = {
    getAllUreCreatines: () => {
        const path = `/ureCreatine/getAll`;
        return axiosApiInstance.get(path);
    },
    getUreCreatineById: (id) => {
        const path = `/ureCreatine/getUreCreatine/${id}`;
        return axiosApiInstance.get(path);
    },
    createUreCreatine: (data) => {
        const path = `/ureCreatine/createUreCreatine`;
        return axiosApiInstance.post(path, data);
    },
    updateUreCreatine: (data, id) => {
        const path = `/ureCreatine/updateUreCreatine/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteUreCreatine: (id) => {
        const path = `/ureCreatine/deleteUreCreatine/${id}`;
        return axiosApiInstance.delete(path);
    },
    getUreCreatineByUserId: () => {
        const path = `/ureCreatine/getUreCreatineByUserId`;
        return axiosApiInstance.get(path);
    },
};

export default ureCreatineApi;