import { Button, Col, Form, Input, Row, Select } from 'antd';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import bloodPressureApi from '../../api/bloodPressureApi';
import clinicalDetailApi from '../../api/clinicalDetailApi';
import physicalDetailApi from '../../api/physicalDetailApi';
import { newestClinicalDetailState } from '../../recoil/atom/clinicalDetailState';
import { examinationPackageState } from '../../recoil/atom/examinationPackageState';
import { newestPhysicalDetailState } from '../../recoil/atom/physicalDetailState';
import { newestPhysicalExamState, physicalExamSelectState } from '../../recoil/atom/physicalExamState';
import { tabActiveState } from '../../recoil/atom/tabActiveState';

const PhysicalExaminationForm = ({ onKeyChange, formRef, reload }) => {
    const [form] = Form.useForm();
    const PersonalHeigh = Form.useWatch('PERSONAL_HEIGH', form);
    const PersonalWeight = Form.useWatch('PERSONAL_WEIGHT', form);
    const { enqueueSnackbar } = useSnackbar();

    const newestPhysicalDetail = useRecoilValue(newestPhysicalDetailState);
    const newestPhysicalExam = useRecoilValue(newestPhysicalExamState);
    const examinationPackage = useRecoilValue(examinationPackageState);
    const physicalExam = useRecoilValue(physicalExamSelectState);
    const setNewestClinicalDetailState = useSetRecoilState(newestClinicalDetailState);
    const [tabActive, setTabActive] = useRecoilState(tabActiveState);

    const [validateHeigh, setValidateHeigh] = useState(false);
    const [isChangeUnit, setIsChangeUnit] = useState(false);
    const [selectValue, setSelectValue] = useState("m");

    const regexNum = /^\d+$/
    const regexHeigh = /^\d+\.?\d*$/;
    const regexBP = /^\d{2,3}\/+\d{2,3}$/;


    const handleSelect = (value) => {
        setSelectValue(value);
        setIsChangeUnit(true);
    };

    useEffect(() => {
        if (physicalExam) {
            const physicalDetail = physicalExam?.Physical_Details[0];
            setSelectValue('m');
            form.setFieldsValue({
                PERSONAL_HEIGH: physicalDetail?.PERSONAL_HEIGH,
                PERSONAL_WEIGHT: physicalDetail?.PERSONAL_WEIGHT,
                BLOOD_PRESSURE: physicalDetail?.Blood_Pressures[0]?.VALUE,
                BLOOD_VESSEL: physicalDetail?.BLOOD_VESSEL,
            })
        }
    }, [physicalExam, form])

    useEffect(() => {
        if (PersonalHeigh) {
            form
                .validateFields(["PERSONAL_HEIGH"])
                .then(() => {
                    setValidateHeigh(true);
                })
                .catch(() => {
                    setValidateHeigh(false);
                });
        }
        if (PersonalHeigh && PersonalWeight && validateHeigh) {
            if (selectValue === "cm") {
                const newHeight = PersonalHeigh / 100;
                form.setFieldsValue({
                    BMI_INDEX: (Number(PersonalWeight) / Math.pow(newHeight, 2)).toFixed(2)
                });
                return;
            }
            form.setFieldsValue({
                BMI_INDEX: (Number(PersonalWeight) / Math.pow(Number(PersonalHeigh), 2)).toFixed(2)
            });
            return;
        }
        form.setFieldsValue({ BMI_INDEX: undefined });
    }, [form, PersonalHeigh, PersonalWeight, selectValue, validateHeigh]);

    useEffect(() => {
        if (validateHeigh) {
            if (isChangeUnit) {
                if (selectValue === 'm') {
                    form.setFieldsValue({ PERSONAL_HEIGH: (Number(PersonalHeigh) / 100).toFixed(2) });
                } else {
                    form.setFieldsValue({ PERSONAL_HEIGH: Number(PersonalHeigh) * 100 });
                }
                setIsChangeUnit(false);
            }
        }
    }, [selectValue, form])

    const handleUpdatePhysicalDetail = async (value, id) => {
        try {
            const res = await physicalDetailApi.updatePhysicalDetail(value, id);
            if (res.data) {
                enqueueSnackbar(res.data.message, { variant: "success" });
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
        }
    };
    const handleCreateBloodPressure = async (value) => {
        await bloodPressureApi.createBloodPressure(value);
    }
    const handleUpdateBloodPressure = async (data, id) => {
        await bloodPressureApi.updateBloodPressure(data, id);
    }
    const handleCreateClinicalExam = async (data) => {
        try {
            const res = await clinicalDetailApi.createClinicalDetail(data);
            if (res.data) {
                setNewestClinicalDetailState(res.data.elements);
                enqueueSnackbar(res.data.message, { variant: "success" });
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
        }
    };

    const handleCreateData = () => {
        const newData = {
            ...form.getFieldsValue(),
        };
        const { BLOOD_PRESSURE, ...result } = newData;
        const { BLOOD_VESSEL, PERSONAL_HEIGH, PERSONAL_WEIGHT } =
            newData;
        if (
            BLOOD_PRESSURE === undefined ||
            BLOOD_VESSEL === undefined ||
            PERSONAL_HEIGH === undefined ||
            PERSONAL_WEIGHT === undefined ||
            validateHeigh === false
        ) {
            return;
        }

        const bloodPressureData = {
            VALUE: BLOOD_PRESSURE,
            TYPE: examinationPackage === "Tự khám" ? 2 : 7,
            PHYSICAL_DETAIL_ID: newestPhysicalDetail?.id,
            EXAM_DATE: newestPhysicalExam?.PHYSICAL_DATE,
        };

        if (selectValue === "cm") {
            result.PERSONAL_HEIGH /= 100;
        }

        if (physicalExam) {
            handleUpdatePhysicalDetail(result, physicalExam?.Physical_Details[0]?.id);
            handleUpdateBloodPressure({ VALUE: BLOOD_PRESSURE }, physicalExam?.Physical_Details[0]?.Blood_Pressures[0]?.id);
            setTabActive({ ...tabActive, clinicalExam: false });
            onKeyChange("4");
            return;
        }

        handleUpdatePhysicalDetail(result, newestPhysicalDetail?.id);
        if (tabActive.clinicalExam) {
            handleCreateClinicalExam({ PHYSICAL_EXAM_ID: physicalExam ? physicalExam.id : newestPhysicalExam.id });
            handleCreateBloodPressure(bloodPressureData);
        }
        setTabActive({ ...tabActive, clinicalExam: false });
        reload()
        onKeyChange("4");
    }

    return (
        <Row justify="center">
            <Col xs={24} md={16} lg={12}>
                <Form
                    form={form}
                    id='physicalExamination'
                    name="physicalExamination"
                    labelAlign='left'
                    labelCol={{ span: 6 }}
                    autoComplete="off"
                    style={{ marginTop: 20 }}
                    onFinish={handleCreateData}
                    ref={formRef}
                >
                    <Row>
                        <Col span={20}>
                            <Form.Item
                                name="PERSONAL_HEIGH"
                                label="Chiều cao"
                                rules={[
                                    {
                                        validator(_, value) {
                                            if (!value || regexHeigh.test(value)) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Chiều cao chỉ nhận giá trị là số');
                                        },
                                    },
                                    {
                                        validator(_, value) {
                                            let min, max;
                                            if (selectValue === "m") {
                                                min = 1; max = 2.5
                                            } else { min = 100; max = 250 }
                                            if ((value && Number(value) < min) || (value && Number(value) > max)) {
                                                return Promise.reject(`Chiều cao nằm trong khoảng ${min + selectValue} -  ${max + selectValue}`);
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                            >
                                <Input
                                    allowClear
                                    placeholder='Nhập chiều cao'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={3} offset={1}>
                            <Select defaultValue='m' onSelect={handleSelect}>
                                <Select.Option value="m">m</Select.Option>
                                <Select.Option value="cm">cm</Select.Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20}>
                            <Form.Item
                                name="PERSONAL_WEIGHT"
                                label="Cân nặng"
                                rules={[
                                    {
                                        validator(_, value) {
                                            if (!value || regexNum.test(value)) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Cân nặng chỉ nhận giá trị là số (tối đa 3 ký tự)');
                                        },
                                    },
                                    {
                                        validator(_, value) {
                                            let min = 30, max = 120;
                                            if ((value && Number(value) < min) || (value && Number(value) > max)) {
                                                return Promise.reject(`Cân nặng nằm trong khoảng ${min}kg -  ${max}kg`);
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                            >
                                <Input
                                    allowClear
                                    placeholder='Ví dụ: 50kg'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={3} offset={1}>
                            <span>kg</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20}>
                            <Form.Item
                                name="BMI_INDEX"
                                label="Chỉ số BMI"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={3} offset={1}>
                            <span>kg/m<sup>2</sup></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20}>
                            <Form.Item
                                name="BLOOD_PRESSURE"
                                label="Huyết áp"
                                rules={[
                                    {
                                        validator(_, value) {
                                            if (!value) {
                                                return Promise.resolve();
                                            }
                                            if (!value || regexBP.test(value)) {
                                                const data = value.split('/');
                                                if (data[0] / data[1] > 1) {
                                                    return Promise.resolve();
                                                }
                                                if (value) {
                                                    return Promise.reject('Giá trị tâm thu phải lớn hơn tâm trương!');
                                                }
                                                return Promise.reject();
                                            }
                                            else {
                                                return Promise.reject('Huyết áp chỉ nhận giá trị là số có định dạng Tâm thu/Tâm trương');
                                            }
                                        },
                                    },
                                ]}
                            >
                                <Input
                                    allowClear
                                    placeholder='Ví dụ: 120/80'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={3} offset={1}>
                            <span>mmHg</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20}>
                            <Form.Item
                                name="BLOOD_VESSEL"
                                label="Mạch"
                                rules={[
                                    {
                                        validator(_, value) {
                                            if (!value || regexNum.test(value)) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Mạch chỉ nhận giá trị là số');
                                        },
                                    },
                                    {
                                        validator(_, value) {
                                            let min = 35, max = 140;
                                            if ((value && Number(value) < min) || (value && Number(value) > max)) {
                                                return Promise.reject(`Mạch nằm trong khoảng ${min} lần/phút -  ${max} lần/phút`);
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                            >
                                <Input
                                    allowClear
                                    placeholder='Ví dụ: 89 lần/phút'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={3} offset={1}>
                            <span>Lần/phút</span>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col span={22}>
                <Button onClick={() => onKeyChange("2")}>Quay lại</Button>
            </Col>
            <Col >
                <Button
                    type='primary'
                    htmlType="submit"
                    form='physicalExamination'
                >
                    Tiếp
                </Button>
            </Col>
        </Row>
    )
}

export default PhysicalExaminationForm