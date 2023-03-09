import axiosApiInstance from "../utils/axiosClient";

const bloodPressureApi = {
    getAllBloodPressures: () => {
        const path = `/bloodPressure/getAll`;
        return axiosApiInstance.get(path);
    },
    getBloodPressureById: (id) => {
        const path = `/bloodPressure/getBloodPressure/${id}`;
        return axiosApiInstance.get(path);
    },
    createBloodPressure: (data) => {
        const path = `/bloodPressure/createBloodPressure`;
        return axiosApiInstance.post(path, data);
    },
    updateBloodPressure: (data, id) => {
        const path = `/bloodPressure/updateBloodPressure/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteBloodPressure: (id) => {
        const path = `/bloodPressure/deleteBloodPressure/${id}`;
        return axiosApiInstance.delete(path);
    },
    getBloodPressureByUserId: () => {
        const path = `/bloodPressure/getBloodPressureByUserId`;
        return axiosApiInstance.get(path);
    },
};

export default bloodPressureApi;