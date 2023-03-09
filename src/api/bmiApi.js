import axiosApiInstance from "../utils/axiosClient";

const BMIApi = {
  getAllBMI: () => {
    const path = `/BMI/getAll`;
    return axiosApiInstance.get(path);
  },
  getBMI: (id) => {
    const path = `/BMI/getBMI/${id}`;
    return axiosApiInstance.get(path);
  },
  createBMI: (data) => {
    const path = `/BMI/createBMI`;
    return axiosApiInstance.post(path, data);
  },
  updateBMI: (data, id) => {
    const path = `/BMI/updateBMI/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteBMI: (id) => {
    const path = `/BMI/deleteBMI/${id}`;
    return axiosApiInstance.delete(path);
  },
};

export default BMIApi;
