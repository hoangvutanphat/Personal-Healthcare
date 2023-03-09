import moment from "moment";

// Convert a flat array to tree
export const arrayToTree = (arr, parent = 0) => {
    return arr?.filter((item) => item.PARENT_ID === parent)
        .map((child) => ({ ...child, children: arrayToTree(arr, child.id), }));
}

// Remote accents
export const removeAccents = (str) => {
    var AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ",
        "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ",
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
        var char = AccentsMap[i][0];
        str = str.replace(re, char);
    }
    return str;
};

// Convert data from api to Antd select options.
export const selectOptions = (array) => {
    const list = []
    for (let item of array) {
        list.push({
            value: item.id,
            label: item.NAME
        })
    }
    return list;
}
export const selectOptionFacility = (array) => {
    const list = [];
    for (let item of array) {
        list.push({
            value: item.SOCIAL_CD,
            label: item.SOCIAL_CD,
            key: item.id,
        });
    }
    return list;
}
export const selectDiseases = (array) => {
    const list = []
    for (let item of array) {
        list.push({
            key: item.id,
            value: item.NAME,
            label: item.NAME,
            ...item
        })
    }
    return list;
}

//format date
export const dateFormat = "DD/MM/YYYY";

export const disabledDate = (current) =>
    current && current.valueOf() > Date.now()


export const chartColor = {
    min: "#000000",
    max: "#ff3f3c",
    default: "#4ad143",
    blue: "#2f80ed",
    purple: "#9b51e0",
    // red: "#ff3f3c",
    violet: "#634269",
    orange: "#f2994a",
    aqua: "#00FFFF",
    pink: "#FF00FF",
    yellow: "#FFFF00",
    olive: "#808000",
}
export const technicalData = [
    { value: 1, label: "Trung ương" },
    { value: 2, label: "Tỉnh" },
    { value: 3, label: "Huyện" },
    { value: 4, label: "Xã" },
    { value: 5, label: "Tuyến 3" },
]

export const levelMedicalData = [
    { value: 1, label: "Hạng Đặc Biệt" },
    { value: 2, label: "Hạng 1" },
    { value: 3, label: "Hạng 2" },
    { value: 4, label: "Hạng 3" },
    { value: 5, label: "Hạng 4" },
    { value: 6, label: "Chưa xếp hạng" },
]
export const medicalModelData = [
    { value: 1, label: "Chuyên khoa" },
    { value: 2, label: "Đa khoa" },
]

export const treatmentData = [
    { value: 1, label: "Nội trú" },
    { value: 2, label: "Ngoại trú" },
    { value: 3, label: "Nội trú & ngoại trú" },
]
export const medicalTypeData = [
    { value: 1, label: "Bệnh viện Chuyên khoa" },
    { value: 2, label: "Bệnh viện Đa khoa" },
    { value: 3, label: "Bệnh xá" },
    { value: 4, label: "Phòng khám Chuyên khoa" },
    { value: 5, label: "Phòng khám Đa khoa" },
    { value: 6, label: "Nhà Hộ Sinh" },
    { value: 7, label: "Trung tâm Y tế" },
    { value: 8, label: "Trạm Y tế" },
    { value: 9, label: "Y tế Cơ quan" },
]
//
const convertDatas = (name, EXAM_DATE, index) => {
    const getDate = moment(EXAM_DATE).format(dateFormat);
    return {
        name: name,
        date: getDate,
        index: index,
    };
};
export const handleConvertDatas = (name, key, dataConvert) => {
    return dataConvert.map((item) =>
        convertDatas(name, item.EXAM_DATE, item[key])
    );
};

export const TblPagination = {
    defaultPageSize: 10,
    defaultCurrent: 1,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 50, 100],
};

export const formatDate = {
    Type: "DD/MM/YYYY",
    Type_2: "DD/MM/YYYY"
}

// get base64
export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });