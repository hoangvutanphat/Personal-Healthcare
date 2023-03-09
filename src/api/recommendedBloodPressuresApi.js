import axiosApiInstance from "../utils/axiosClient";

const recommendedBloodPressuresApi = {
    getAllrecommendedBloodPressures: () => {
        const path = `/recommendedBloodPressure/getAll`;
        return axiosApiInstance.get(path);
    },
};

export default recommendedBloodPressuresApi;