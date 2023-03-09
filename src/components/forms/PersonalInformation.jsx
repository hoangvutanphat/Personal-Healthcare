import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import physicalExamApi from '../../api/physicalExamApi';
import { examinationPackageState } from '../../recoil/atom/examinationPackageState';
import { newestPhysicalExamState, physicalExamSelectState } from '../../recoil/atom/physicalExamState';
import { tabActiveState } from '../../recoil/atom/tabActiveState';

const PersonalInformationForm = ({ onKeyChange, onUpdatePhysicalExam, formRef, reload, employee }) => {
    const [form] = Form.useForm();

    const examinationPackage = useRecoilValue(examinationPackageState);
    const physicalExam = useRecoilValue(physicalExamSelectState);
    const [newestPhysicalExam, setNewestPhysicalExam] = useRecoilState(newestPhysicalExamState);
    const [tabActive, setTabActive] = useRecoilState(tabActiveState);

    const [isLoading, setIsLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (physicalExam) {
            form.setFieldsValue({
                EXAM_CONTENT: physicalExam.CONTENT,
                PHYSICAL_DATE: moment(physicalExam?.PHYSICAL_DATE),
                MEDICAL_FACILITY_NAME: physicalExam?.MEDICAL_FACILITY_NAME,
            })
        }
    }, [form, physicalExam]);

    const handleOk = () => {
        const newData = { ...form.getFieldValue() };
        const {
            USER_ID,
            EXAM_CONTENT,
            PHYSICAL_DATE,
            MEDICAL_FACILITY_NAME,
        } = newData;
        if (
            EXAM_CONTENT === undefined || EXAM_CONTENT?.trim() === "" ||
            PHYSICAL_DATE === undefined || PHYSICAL_DATE === null ||
            MEDICAL_FACILITY_NAME === undefined || MEDICAL_FACILITY_NAME?.trim() === ""
        ) {
            return;
        }
        const values = {
            USER_ID,
            PHYSICAL_DATE,
            MEDICAL_FACILITY_NAME,
            CONTENT: EXAM_CONTENT,
            TYPE: examinationPackage === "Tự khám" ? 2 : 7,
            INPUT_DATE: new Date(),
            INPUT_STATUS: physicalExam ? physicalExam?.INPUT_STATUS : 0,
            MEDICAL_EXAM_YEAR: new Date(newData.PHYSICAL_DATE).getFullYear(),
        };

        if (physicalExam || !tabActive.medicalHistory) {
            handleUpdate(values);
        } else if (tabActive.medicalHistory) {
            handleCreatePhysicalExam(values);
        }
        setTabActive({ ...tabActive, medicalHistory: false });
        reload();
        onKeyChange("2");
    }

    const handleCreatePhysicalExam = async (data) => {
        setIsLoading(true);
        try {
            let res = await physicalExamApi.createPhysicalExam(data);
            if (res.data) {
                setNewestPhysicalExam(res.data.elements);
                enqueueSnackbar(res.data.message, { variant: "success" });
                setIsLoading(false);
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
            setIsLoading(false);
        }
    };

    const handleUpdate = async (data) => {
        let id = physicalExam ? physicalExam.id : newestPhysicalExam.id;
        await onUpdatePhysicalExam(data, id);
    };

    return (
        <Form
            form={form}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            labelAlign="left"
            style={{ marginTop: 20 }}
            onFinish={handleOk}
            ref={formRef}
            initialValues={{
                USER_ID: employee?.USER_ID,
                CD: employee?.CD,
                EMP_NAME: employee?.User.FIRST_NAME + " " + employee?.User.LAST_NAME,
                EMP_BOD: employee?.User.BOD ? new Date(employee?.User.BOD).toLocaleDateString('en-GB') : undefined,
                EMP_GENDER: employee?.User.Gender.NAME,
                EMP_MARITAL: employee?.Marital_Status?.MARITAL_STATUS_NAME,
                EMP_AREA: employee?.Area?.AREA_NAME,
                EMP_DEPARTMENT: employee?.Department?.DEPARTMENT_NAME,
                EMP_DIVISION: employee?.Division?.DIVISION_NAME,
                EMP_UNIT: employee?.Unit?.UNIT_NAME,
                EMP_POSITION: employee?.Position?.POSITION_NAME,
                START_DATE: employee?.START_WORKING_DATE ? new Date(employee?.START_WORKING_DATE).toLocaleDateString('en-GB') : undefined,
                EMP_BRANCH: employee?.Workplace?.BRANCH_NAME,
                EMP_CITY: employee?.City?.CITY_NAME,
            }}
        >
            <Row justify="center">
                <Col span={22}>
                    <Row gutter={{ sx: [0, 0], lg: 42 }}>
                        <Col sx={24} lg={12}>
                            <Form.Item
                                name="EXAM_CONTENT"
                                label="Nội dung khám"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập nội dung khám!"
                                    }
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>
                            <Form.Item
                                name="CD"
                                label="Mã nhân viên"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="EMP_NAME"
                                label="Họ và tên"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="EMP_BOD"
                                label="Ngày sinh"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="EMP_GENDER"
                                label="Giới tính"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="EMP_MARITAL"
                                label="TT hôn nhân"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="PHYSICAL_DATE"
                                label="Ngày khám"
                            >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    format="DD/MM/YYYY"
                                    disabledDate={(current) => current && current > new Date()}
                                />
                            </Form.Item>
                            <Form.Item
                                name="MEDICAL_FACILITY_NAME"
                                label="Cơ sở khám"
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                        <Col sx={24} lg={12}>
                            <Form.Item
                                name="EMP_AREA"
                                label="Khối"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="EMP_DEPARTMENT"
                                label="Phòng ban"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="EMP_DIVISION"
                                label="Bộ phận"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="EMP_UNIT"
                                label="Đơn vị"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="EMP_POSITION"
                                label="Cấp bậc"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="EMP_TYPE"
                                label="Loại nhân viên"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="START_DATE"
                                label="Ngày vào làm"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="EMP_BRANCH"
                                label="Nơi làm việc"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="EMP_CITY"
                                label="Tỉnh thành làm việc"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row justify="end">
                <Col>
                    <Button htmlType="submit" type="primary" loading={isLoading}>
                        Tiếp
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default PersonalInformationForm