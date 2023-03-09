import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Modal, Row, TreeSelect } from 'antd';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import healthHisApi from '../../api/healthHisApi';
import physicalExamApi from '../../api/physicalExamApi';
import physicalExamResultApi from '../../api/physicalExamResultApi';
import { removeAccents } from '../../common';
import { healthHisData } from '../../common/getAllApi';
import { diseaseOptionsState } from '../../recoil/atom/diseaseState';
import { healthHistoryState } from '../../recoil/atom/healthHistotyState';
import { newestPhysicalExamState, physicalExamSelectState } from '../../recoil/atom/physicalExamState';

const ConclusionsForm = ({ onKeyChange, onCancel, formRef, reload }) => {
    const [form] = Form.useForm();

    const newestPhysicalExam = useRecoilValue(newestPhysicalExamState);
    const physicalExam = useRecoilValue(physicalExamSelectState);
    const diseaseOptions = useRecoilValue(diseaseOptionsState);
    const [healthHisList, setHealthHisList] = useRecoilState(healthHistoryState);

    const [isLoading, setIsLoading] = useState(false);
    const [diseaseList, setDiseaseList] = useState();
    const [healthHisSelect, setHealthHisSelect] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (physicalExam) {
            if (physicalExam?.Physical_Exam_Results?.length) {
                form.setFieldsValue({
                    SUGGESTION: physicalExam.Physical_Exam_Results[0].SUGGESTION,
                    SHARE_TO_COMPANY: physicalExam.Physical_Exam_Results[0].SHARE_TO_COMPANY
                })
            }
            if (physicalExam?.Health_His?.length) {
                setHealthHisSelect(() => physicalExam.Health_His);
            }
        }
        else { setHealthHisSelect([]) }
    }, [physicalExam, form]);

    const handleCancel = () => {
        setDiseaseList([]);
        setHealthHisSelect([]);
        reload();
        onCancel();
    }
    const handleOk = () => {
        const data = { ...form.getFieldsValue() };

        const physicalExamResultData = {
            SUGGESTION: data?.SUGGESTION,
            SHARE_TO_COMPANY: data?.SHARE_TO_COMPANY ? true : false,
            PHYSICAL_EXAM_ID: physicalExam ? physicalExam.id : newestPhysicalExam.id,
        }
        if (physicalExam) {
            const id = physicalExam?.Physical_Exam_Results[0]?.id;
            handleUpdatePhysicalExamResult(physicalExamResultData, id);
            handleCancel();
            return
        }
        handleUpdatePhysicalExam({ INPUT_STATUS: 1 })
        handleCreatePhysicalExamResult(physicalExamResultData);
        handleCancel();
    }
    const handleClose = () => {
        const data = { ...form.getFieldsValue() };

        const physicalExamResultData = {
            SUGGESTION: data?.SUGGESTION,
            SHARE_TO_COMPANY: data?.SHARE_TO_COMPANY ? true : false,
            PHYSICAL_EXAM_ID: physicalExam ? physicalExam.id : newestPhysicalExam.id,
        }
        if (physicalExam) {
            const id = physicalExam?.Physical_Exam_Results[0]?.id;
            handleUpdatePhysicalExamResult(physicalExamResultData, id);
            healthHisData(healthHisList, setHealthHisList, true)
            handleCancel();
            return
        }
        handleCreatePhysicalExamResult(physicalExamResultData);
        healthHisData(healthHisList, setHealthHisList, true)
        handleCancel();
    }
    const handleRemove = () => {
        const id = physicalExam.id;
        handleDeletePhysicalExam(id);
        handleCancel();
    }
    const handleSelecDisease = (data, option) => {
        setDiseaseList({
            DISEASE_ID: option.id,
            DISEASE_NAME: option.title,
            id: new Date().getTime(),
        });
    };
    const handleAddHealthHis = () => {
        if (diseaseList) {
            setHealthHisSelect([...healthHisSelect, diseaseList]);
            form.setFieldsValue({
                DISEASE_ID: undefined,
            });
            setDiseaseList(undefined);
        } else return;
    }
    const handleRemoveHealthHis = (data) => {
        const newList = healthHisSelect.filter(item => item.id !== data.id);
        setHealthHisSelect(newList);
        handleDeleteHealthHis(data.id);
    }

    const handleCreatePhysicalExamResult = async (data) => {
        setIsLoading(true);
        try {
            const res = await physicalExamResultApi.createPhysicalExamResult(data);
            if (res.data) {
                if (healthHisSelect.length) {
                    const defaultData = {
                        START_DATE: new Date(),
                        USER_ID: physicalExam ? physicalExam.USER_ID : newestPhysicalExam.USER_ID,
                        PHYSICAL_EXAM_ID: physicalExam ? physicalExam.id : newestPhysicalExam.id,
                        PHYSICAL_EXAM_RESULT_ID: res.data.elements.id,
                        TYPE: 2
                    };
                    healthHisSelect.forEach(item => {
                        const healthHisData = {
                            ...defaultData,
                            DISEASE_ID: item.DISEASE_ID,
                            DISEASE_NAME: item.DISEASE_NAME,
                        }
                        handleCreateHealthHis(healthHisData);
                    });
                }
                enqueueSnackbar(res.data.message, { variant: "success" });
                setIsLoading(false);
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
            setIsLoading(false);
        }
    }
    const handleUpdatePhysicalExamResult = async (data, id) => {
        setIsLoading(true);
        if (healthHisSelect.length) {
            const newList = healthHisSelect.filter((item) => !item?.USER_ID)
            if (newList.length) {
                const defaultData = {
                    START_DATE: new Date(),
                    USER_ID: physicalExam.USER_ID,
                    PHYSICAL_EXAM_ID: physicalExam.id,
                    PHYSICAL_EXAM_RESULT_ID: id,
                    TYPE: 2
                };
                newList.forEach(item => {
                    const healthHisData = {
                        ...defaultData,
                        DISEASE_ID: item.DISEASE_ID,
                        DISEASE_NAME: item.DISEASE_NAME,
                    }
                    handleCreateHealthHis(healthHisData);
                });
            }
        }
        try {
            const res = await physicalExamResultApi.updatePhysicalExamResult(data, id);
            if (res.data) {
                enqueueSnackbar(res.data.message, { variant: "success" });
                setIsLoading(false);
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
            setIsLoading(false);
        }
    }
    const handleDeletePhysicalExam = async (id) => {
        setIsLoading(true);
        try {
            let res = await physicalExamApi.deletePhysicalExam(id);
            if (res.data) {
                enqueueSnackbar(res.data.message, { variant: "success" });
                setIsLoading(false);
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
            setIsLoading(false);
        }
    }
    const handleCreateHealthHis = async (data) => {
        try {
            await healthHisApi.createHealthHis(data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleDeleteHealthHis = async (id) => {
        try {
            await healthHisApi.deleteHealthHis(id);
            reload();
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdatePhysicalExam = async (data) => {
        let id = physicalExam ? physicalExam.id : newestPhysicalExam.id;
        try {
            await physicalExamApi.updatePhysicalExam(data, id);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteConfirm = () => {
        Modal.confirm({
            title: 'Bạn có chắc muốn xóa mục này?',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn không thể khôi phục mục này!',
            onOk() {
                handleRemove();
            },
        });
    };

    return (
        <Row>
            <Col>
                <Form
                    form={form}
                    name="subClinicalExamination"
                    labelAlign='left'
                    labelCol={{ span: 8 }}
                    autoComplete="off"
                    style={{ marginTop: 20 }}
                    ref={formRef}
                >
                    <Row justify="center">
                        <Col xs={20} lg={16}>
                            <Form.Item
                                label="1. Bệnh lý hiện tại "
                                name='DISEASE_ID'
                                labelCol={{ span: 9 }}
                            >
                                <TreeSelect
                                    allowClear
                                    showSearch
                                    allowDrop={false}
                                    filterTreeNode={(input, item) =>
                                        removeAccents(item?.title ?? "")
                                            .toLowerCase()
                                            .includes(removeAccents(input).toLowerCase())
                                    }
                                    placeholder="Chọn tên bệnh"
                                    treeData={diseaseOptions}
                                    onSelect={handleSelecDisease}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={1} offset={1}>
                            <Button onClick={handleAddHealthHis}>+</Button>
                        </Col>
                        <Col xs={22} lg={18}>
                            {
                                healthHisSelect.length ?
                                    healthHisSelect.map((item, index) => (
                                        <Row key={index} gutter={24} style={{ paddingBottom: '16px' }}>
                                            <Col span={2} xs={{ offset: 0 }} lg={{ offset: 6 }}>
                                                {index + 1}
                                            </Col>
                                            <Col xs={20} lg={14}>
                                                <Input value={item.DISEASE_NAME} />
                                            </Col>
                                            <Col span={2}>
                                                <Button onClick={() => handleRemoveHealthHis(item)}>-</Button>
                                            </Col>
                                        </Row>
                                    ))
                                    : ''
                            }
                        </Col>
                        <Col xs={22} lg={18}>
                            <Form.Item
                                name="SUGGESTION"
                                label="2. Đề nghị/lời dặn của bác sĩ"
                            >
                                <Input.TextArea rows={3} />
                            </Form.Item>
                        </Col>
                        <Col xs={22} lg={18}>
                            <Form.Item
                                name="SHARE_TO_COMPANY"
                                valuePropName="checked"
                            >
                                <Checkbox>
                                    Chia sẻ kết quả khám sức khỏe với Đơn vị Quản lý sức khỏe
                                </Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={22} lg={18}>
                            <Row justify="space-around">
                                <Col>
                                    <Button
                                        type='primary'
                                        danger
                                        disabled={physicalExam ? false : true}
                                        style={{ width: 120 }}
                                        loading={isLoading}
                                        onClick={deleteConfirm}
                                    >
                                        Xóa
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        style={{ width: 120 }}
                                        onClick={handleOk}
                                        loading={isLoading}
                                    >
                                        Lưu
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        htmlType='submit'
                                        style={{ width: 120 }}
                                        loading={isLoading}
                                        onClick={handleClose}
                                    >
                                        Đóng
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col>
                <Row justify="start">
                    <Col style={{ paddingTop: 24 }}>
                        <Button onClick={() => onKeyChange("5")}>Quay lại</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default ConclusionsForm