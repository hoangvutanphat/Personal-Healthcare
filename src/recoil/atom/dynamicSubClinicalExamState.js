import { atom, selector } from "recoil";

const subClinicalExamList = [
    {
        value: 1,
        label: 'Siêu âm bụng tổng quát',
        desc_key: 'STOMACH_ULTRA_SOUND_DESC',
        result_key: 'STOMACH_ULTRA_SOUND_RESULT',
    },
    {
        value: 2,
        label: 'Siêu âm tuyến giáp',
        desc_key: 'THYROID_ULTRA_SOUND_DESC',
        result_key: 'THYROID_ULTRA_SOUND_RESULT',
    },
    {
        value: 3,
        label: 'Siêu âm tuyến vú',
        desc_key: 'MAMMARY_ULTRA_SOUND_DESC',
        result_key: 'MAMMARY_ULTRA_SOUND_RESULT',
    },
    {
        value: 4,
        label: 'Siêu âm tim',
        desc_key: 'HEART_ULTRA_SOUND_DESC',
        result_key: 'HEART_ULTRA_SOUND_RESULT',
    },
    {
        value: 5,
        label: 'Điện tâm đồ',
        desc_key: 'ECG_DESC',
        result_key: 'ECG_RESULT',
    },
    {
        value: 6,
        label: 'X-Quang phổi',
        desc_key: 'XRAY_DESC',
        result_key: 'XRAY_RESULT',
    },
    {
        value: 7,
        label: "Pap's mear",
        desc_key: '',
        result_key: 'PAP_SMEAR_RESULT',
    },
    {
        value: 11,
        label: 'Đo mật độ xương'
    },
    {
        value: 12,
        label: 'Tổng phân tích tế bào máu'
    },
    {
        value: 13,
        label: 'Đường huyết đói'
    },
    {
        value: 14,
        label: 'Chức năng thận'
    },
    {
        value: 15,
        label: 'Chức năng gan'
    },
    {
        value: 16,
        label: 'Chỉ số Lipid máu (Bộ mỡ máu)'
    },
    {
        value: 17,
        label: 'Tổng phân tích nước tiểu'
    },
    {
        value: 18,
        label: 'Canxi máu'
    },
]

const dynamicSubClinicalExamSelectState = atom({
    key: 'dynamicSubClinicalExamSelectState',
    default: undefined
})

const imageDiagnosticCreateState = atom({
    key: 'imageDiagnosticCreateState',
    default: []
})

const testDiagnosticCreateState = atom({
    key: 'testDiagnosticCreateState',
    default: []
})



const subClinicalExamMatchState = selector({
    key: 'subClinicalExamMatchState',
    get: ({ get }) => {
        const selectList = get(dynamicSubClinicalExamSelectState);
        if (selectList && selectList.length) {
            const imageDiagnosticList = selectList.filter(item => item < 10);
            const testDiagnosticList = selectList.filter(item => item > 10);

            const imageDiagnosticMatch = subClinicalExamList.filter(item => imageDiagnosticList.includes(item.value));
            const testDiagnosticMatch = subClinicalExamList.filter(item => testDiagnosticList.includes(item.value));

            return {
                imageDiagnosticMatch,
                testDiagnosticMatch
            };
        }
    }
})

export {
    dynamicSubClinicalExamSelectState,
    subClinicalExamMatchState,
    imageDiagnosticCreateState,
    testDiagnosticCreateState
}