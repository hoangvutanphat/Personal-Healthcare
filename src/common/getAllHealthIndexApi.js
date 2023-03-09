import axitUricApi from "../api/axitUricApi";
import bloodLipidApi from "../api/bloodLipidApi";
import bloodPressureApi from "../api/bloodPressureApi";
import BMIApi from "../api/bmiApi";
import glucoseApi from "../api/glucoseApi";
import liverEnzymeApi from "../api/liverEnzymeApi";
import physicalDetailApi from "../api/physicalDetailApi";
import physicalExamApi from "../api/physicalExamApi";
import ureCreatineApi from "../api/ureCreatineApi";


//get all blood pressure
export const bloodpressureData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await bloodPressureApi.getBloodPressureByUserId();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// get all glucose data
export const glucoseData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await glucoseApi.getGlucoseByUserId();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// get all liver enzyme data
export const liverEnzymeData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await liverEnzymeApi.getAllLiverEnzymeByUserId();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// get all ure creatinin data
export const ureCreatininData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await ureCreatineApi.getUreCreatineByUserId();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// get all blood lipid data
export const bloodLipidData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await bloodLipidApi.getBloodLipidByUserId();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// get all axit uric data
export const axitUricData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await axitUricApi.getAxitUricByUserId();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// get all BMI data
export const BMIData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await physicalDetailApi.getBMIByUserId();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

export const bloodLipidsByUserData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await physicalExamApi.getBloodLipidByUserId();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}