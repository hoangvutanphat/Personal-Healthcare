import diseaseApi from "../api/diseaseApi";
import diseaseStatusApi from "../api/diseaseStatusApi";
import employeeApi from "../api/employeeApi";
import healthHisApi from "../api/healthHisApi";
import medicalConsultationDiseaseApi from "../api/medicalConsultationDiseaseApi";
import physicalExamApi from "../api/physicalExamApi";
import recommendedBloodPressuresApi from "../api/recommendedBloodPressuresApi";
import userApi from "../api/userApi";
import axiosApiInstance from "../utils/axiosClient";


export const authData = (options, callback) => {
    if (Object.getOwnPropertyNames(options).length === 0) {
        (async () => {
            try {
                let res = await userApi.getUser(options?.profile?.id);
                if (res.data) {
                    callback(() => ({ ...options, profile: res.data.elements.user }));
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// get all employee
export const employeeData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await employeeApi.getAllEmployees();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

//get all physicalExam
export const physicalExamData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await physicalExamApi.getAllPhysicalExams();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// GET ALL PHYSICAL EXAM BY QUERY
export const physicalExamByQueryData = (options, callback, data) => {
    if (options?.length === 0) {
        (async () => {
            const path = `physicalExam/getAllByQuery`;
            try {
                const res = await axiosApiInstance.post(path, data);
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (err) {
                console.log(err);
            }
        })();
    }
}

// GET ALL PHYSICAL EXAM INPUT
export const latestPhysicalExamInputData = (options, callback, data) => {
    if (options?.length === 0) {
        (async () => {
            const path = `physicalExam/getLatestPhysicalExam`;
            try {
                const res = await axiosApiInstance.post(path, data);
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (err) {
                console.log(err);
            }
        })();
    }
}



//get physicalExam by id
export const physicalExamByIdData = (options, callback, id) => {
    if (options === undefined) {
        (async () => {
            try {
                let res = await physicalExamApi.getPhysicalExam(id);
                if (res.data) {
                    callback(() => res.data.elements.physicalExam);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}


//GET PHYSICAL EXAM SELF SPECIAL BY USER
export const selfSpecialPhycalExamByUserData = (options, callback, id) => {
    if (options === undefined) {
        (async () => {
            try {
                let res = await physicalExamApi.getPhysicalSelfExam(id);
                if (res.data) {
                    callback(() => res.data.elements.physicalExam);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}


export const physicalExamLastestData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await physicalExamApi.getLatestImportantRatings();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

//get physicalExam by User
export const physicalSelfExamData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await physicalExamApi.getPhysicalSelfExam();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

//get all heal history data
export const healthHisData = (options, callback, reload) => {
    if (options?.length === 0 || reload) {
        (async () => {
            try {
                let res = await healthHisApi.getAllHealthHiss();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

//get all consulation disease data
export const medicalConsultationDiseaseData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await medicalConsultationDiseaseApi.getAllMedicalConsultationDiseases();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

//get all disease data
export const diseasesData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await diseaseApi.getAllDisease();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

export const diseaseStatusData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await diseaseStatusApi.getAllDiseaseStatus();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// GET ALL RECOMMEND BLOODPRESSURE
export const recommendedBloodPressuresData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await recommendedBloodPressuresApi.getAllrecommendedBloodPressures();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// GET RECOMMENDED BLOODPRESSURE BY QUERY
export const recommendedBloodPressureByQueryData = (options, callback, data) => {
    // if (options?.length === 0) {
    (async () => {
        const path = `bloodPressure/getRecommendedBloodPressureLastest`;
        try {
            const res = await axiosApiInstance.post(path, data);
            if (res.data) {
                callback(() => res.data.elements);
            }
        } catch (err) {
            console.log(err);
        }
    })();
    // }
}