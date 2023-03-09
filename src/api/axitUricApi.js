import axiosApiInstance from "../utils/axiosClient";

const axitUricApi = {
    getAllAxitUrics: () => {
        const path = `/axitUric/getAll`;
        return axiosApiInstance.get(path);
    },
    getAxitUricById: (id) => {
        const path = `/axitUric/getAxitUric/${id}`;
        return axiosApiInstance.get(path);
    },
    createAxitUric: (data) => {
        const path = `/axitUric/createAxitUric`;
        return axiosApiInstance.post(path, data);
    },
    updateAxitUric: (data, id) => {
        const path = `/axitUric/updateAxitUric/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteAxitUric: (id) => {
        const path = `/axitUric/deleteAxitUric/${id}`;
        return axiosApiInstance.delete(path);
    },
    getAxitUricByUserId: () => {
        const path = `/axitUric/getAxitUricByUserId`;
        return axiosApiInstance.get(path);
    },
};

export default axitUricApi;