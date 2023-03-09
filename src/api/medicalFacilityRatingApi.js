import axiosApiInstance from "../utils/axiosClient";

const medicalFacilityRating = {
  getAllMedicalFacilityRatings: () => {
    const path = `/medicalFacilityRating/getAll`;
    return axiosApiInstance.get(path);
  },
  getMedicalFacilityRating: (id) => {
    const path = `/medicalFacilityRating/getMedicalFacilityRating/${id}`;
    return axiosApiInstance.get(path);
  },
  createMedicalFacilityRating: (data) => {
    const path = `/medicalFacilityRating/createMedicalFacilityRating`;
    return axiosApiInstance.post(path, data);
  },
  updateMedicalFacilityRating: (data, id) => {
    const path = `/medicalFacilityRating/updateMedicalFacilityRating/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteMedicalFacilityRating: (id) => {
    const path = `//medicalFacilityRating/deleteMedicalFacilityRating/${id}`;
    return axiosApiInstance.delete(path);
  },
};

export default medicalFacilityRating;