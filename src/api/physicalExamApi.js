import axiosApiInstance from "../utils/axiosClient";

const physicalExamApi = {
    getAllPhysicalExams: () => {
        const path = `/physicalExam/getAll`;
        return axiosApiInstance.get(path);
    },
    getPhysicalExam: (id) => {
        const path = `/physicalExam/getPhysicalExam/${id}`;
        return axiosApiInstance.get(path);
    },
    createPhysicalExam: (data) => {
        const path = `/physicalExam/createPhysicalExam`;
        return axiosApiInstance.post(path, data);
    },
    updatePhysicalExam: (data, id) => {
        const path = `/physicalExam/updatePhysicalExam/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deletePhysicalExam: (id) => {
        const path = `/physicalExam/deletePhysicalExam/${id}`;
        return axiosApiInstance.delete(path);
    },
    getBloodLipidByUserId: () => {
        const path = `physicalExam/getAllBloodLipidByUserId`;
        return axiosApiInstance.get(path);
    },
    getLatestImportantRatings: () => {
        const path = `physicalExam/getLatestImportantRatings`;
        return axiosApiInstance.get(path);
    },
    getPhysicalSelfExam: () => {
        const path = `physicalExam/getPhysicalSelfExam`;
        return axiosApiInstance.get(path);
    },
    // getLatestPhysicalExam: (data) => {
    //     const path = `/physicalExam/createPhysicalExam`;
    //     return axiosApiInstance.post(path, data);
    // },
    // physicalExam/getLatestPhysicalExam
};

export default physicalExamApi;
