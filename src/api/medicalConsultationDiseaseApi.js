import axiosApiInstance from "../utils/axiosClient";

const medicalConsultationDiseaseApi = {
    getAllMedicalConsultationDiseases: () => {
        const path = `/medicalConsultationDisease/getAll`;
        return axiosApiInstance.get(path);
    },
    getMedicalConsultationDiseaseById: (id) => {
        const path = `/medicalConsultationDisease/getMedicalConsultationDisease/${id}`;
        return axiosApiInstance.get(path);
    },
    createMedicalConsultationDisease: (data) => {
        const path = `/medicalConsultationDisease/createMedicalConsultationDisease`;
        return axiosApiInstance.post(path, data);
    },
    updateMedicalConsultationDisease: (data, id) => {
        const path = `/medicalConsultationDisease/updateMedicalConsultationDisease/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteMedicalConsultationDisease: (id) => {
        const path = `/medicalConsultationDisease/deleteMedicalConsultationDisease/${id}`;
        return axiosApiInstance.delete(path);
    },
};

export default medicalConsultationDiseaseApi;