import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row, Select, Space, Table, Tooltip, TreeSelect, Typography } from "antd";
import moment from 'moment';
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import diseaseStatusApi from '../../api/diseaseStatusApi';
import healthHisApi from '../../api/healthHisApi';
import physicalDetailApi from '../../api/physicalDetailApi';
import { formatDate, removeAccents, TblPagination } from '../../common';
import { diseasesData, diseaseStatusData } from '../../common/getAllApi';
import useConfirmHealthHis from "../../hooks/useConfirmAddHealthHis";
import useConfirmDelete from '../../hooks/useConfirmDelete';
import { authState } from '../../recoil/atom/authState';
import { diseaseOptionsState, diseasesState } from '../../recoil/atom/diseaseState';
import { diseasesStatusState, diseaseStatusOptionsState } from '../../recoil/atom/diseaseStatusState';
import { healthHistoryByUserState, healthHistoryState } from '../../recoil/atom/healthHistotyState';
import { newestPhysicalDetailState } from "../../recoil/atom/physicalDetailState";
import { newestPhysicalExamState } from '../../recoil/atom/physicalExamState';
import { tabActiveState } from '../../recoil/atom/tabActiveState';

const MedicalHistoryForm = ({ onKeyChange }) => {
    const [form] = Form.useForm();
    const diseaseStatusInput = Form.useWatch('DISEASE_STATUS_INPUT', form);
    const diseaseStatusSelect = Form.useWatch('DISEASE_STATUS_ID', form);
    const { enqueueSnackbar } = useSnackbar();

    const columns = [
        {
            title: "STT",
            width: '5%',
            render: (text, record, index) => index + 1,
            fixed: "left"
        },
        {
            title: "Tên bệnh",
            dataIndex: "DISEASE_NAME",
        },
        {
            title: "Thời gian phát hiện",
            width: '20%',
            render: (_, record) => (
                <p>
                    {record.START_DATE !== null &&
                        moment(record.START_DATE).format(formatDate.Type)}
                </p>
            ),
        },
        {
            title: "Thời gian cập nhật",
            render: (_, record) => (
                <p>
                    {record.UPDATE_DATE !== null &&
                        moment(record.UPDATE_DATE).format(formatDate.Type)}
                </p>
            ),
        },
        {
            title: "Tình trạng bệnh",
            render: (_, record) => record?.Disease_Status?.NAME,
        },
        {
            title: "Hành động",
            key: "action",
            width: '15%',
            fixed: "right",
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        className="edit-btn"
                        onClick={() => setHealthHis(record)}
                    />
                    {record.TYPE === 1 ? '' :
                        <Button
                            type="primary"
                            icon={<DeleteOutlined />}
                            className="delete-btn"
                            onClick={() => confirm(record.id)}
                        />
                    }
                </Space>
            ),
        },
    ];

    const [diseases, setDiseases] = useRecoilState(diseasesState);
    const [diseaseStatus, setDiseasesStatus] = useRecoilState(diseasesStatusState);
    const [tabActive, setTabActive] = useRecoilState(tabActiveState);
    const setHealthHisList = useSetRecoilState(healthHistoryState);
    const setNewestPhysicalDetailState = useSetRecoilState(newestPhysicalDetailState);
    const diseaseOptions = useRecoilValue(diseaseOptionsState);
    const healthHistoryByUser = useRecoilValue(healthHistoryByUserState);
    const newestPhysicalExam = useRecoilValue(newestPhysicalExamState);
    const diseaseStatusOptions = useRecoilValue(diseaseStatusOptionsState);
    const user = useRecoilValue(authState);

    const [diseaseName, setDiseaseName] = useState();
    const [isTyping, setIsTyping] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState();
    const [healthHis, setHealthHis] = useState();

    useEffect(() => {
        if (healthHistoryByUser.length === 0 || isLoading) {
            (async () => {
                try {
                    let res = await healthHisApi.getAllHealthHiss();
                    if (res.data) {
                        setHealthHisList(() => res.data.elements);
                    }
                } catch (error) {
                    console.log("error");
                }
            })();
        } else {
            const newData = healthHistoryByUser.reduceRight((a, b) => {
                a.push(b);
                return a;
            }, []);
            setData(newData);
        }
        if (diseases.length === 0) {
            diseasesData(diseases, setDiseases);
        }
        if (diseaseStatusOptions.length === 0) {
            diseaseStatusData(diseaseStatus, setDiseasesStatus)
        }
    }, [healthHistoryByUser, isLoading]);

    useEffect(() => {
        if (diseaseStatusInput) {
            setIsTyping(true);
            setIsSelecting(false);
        } else if (diseaseStatusSelect) {
            setIsTyping(false);
            setIsSelecting(true);
        } else {
            setIsTyping(false);
            setIsSelecting(false);
        }
    }, [diseaseStatusInput, diseaseStatusSelect]);
    useEffect(() => {
        if (healthHis) {
            setDiseaseName(healthHis);
            form.setFieldsValue({
                ...healthHis,
                START_DATE: moment(new Date(healthHis?.START_DATE)),
            });
        }
    }, [healthHis, form]);

    const handleSelecDisease = (data, option) => {
        setDiseaseName(option);
    };
    const handleCreatePhysicalDetail = async (data) => {
        const res = await physicalDetailApi.createPhysicalDetail(data);
        if (res.data) {
            setNewestPhysicalDetailState(res.data.elements);
        }
    }
    const handleCreateHealthHis = async (data) => {
        setIsLoading(true);
        try {
            const res = await healthHisApi.createHealthHis(data);
            if (res.data) {
                enqueueSnackbar(res.data.message, { variant: "success" });
                setIsLoading(false);
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
            setIsLoading(false)
        }
        form.resetFields();
        setHealthHis(undefined);
    };
    const handleDelete = async (id) => {
        setIsLoading(true);
        try {
            const res = await healthHisApi.deleteHealthHis(id);
            if (res.data) {
                enqueueSnackbar(res.data.message, { variant: "success" });
                setIsLoading(false);
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
            setIsLoading(false)
        }
    };

    const { confirm } = useConfirmDelete(
        handleDelete,
        "Bạn không thể khôi phục mục này!"
    );
    const { confirmCreate } = useConfirmHealthHis(
        handleCreateHealthHis,
        "Bệnh trùng với bệnh đã có sẵn trong danh sách Tiền sử bệnh tật, bạn có chắc chắc muốn lưu?"
    );

    const handleSubmit = () => {
        const newData = {
            ...form.getFieldsValue(),
        };

        const { DISEASE_ID, START_DATE, DISEASE_STATUS_INPUT } = newData;
        if (
            DISEASE_ID === undefined || DISEASE_ID === null ||
            START_DATE === undefined || START_DATE === null
        ) { return }
        if (!diseaseStatusInput && !diseaseStatusSelect) {
            return;
        }

        const healthHisData = {
            ...newData,
            DISEASE_NAME: diseaseName?.NAME || diseaseName.DISEASE_NAME,
            USER_ID: user?.profile?.id,
            TYPE: 2
        }
        const DiseaseIdCheck = healthHistoryByUser.find((item) => item?.DISEASE_ID === DISEASE_ID);

        if (healthHis) {
            if (diseaseStatusInput) {
                (async () => {
                    try {
                        const res = await diseaseStatusApi.createDiseaseStatus({
                            TYPE: 2,
                            NAME: DISEASE_STATUS_INPUT,
                        })
                        if (res.data) {
                            handleCreateHealthHis({
                                ...healthHisData,
                                DISEASE_STATUS_ID: res.data.elements.id,
                                UPDATE_DATE: new Date(),
                                START_DATE: null,
                            }, healthHis.id)
                        }
                    } catch (error) {
                        console.log(error);
                    }
                })()
            } else {
                handleCreateHealthHis({
                    ...healthHisData,
                    UPDATE_DATE: new Date(),
                    START_DATE: null,
                }, healthHis.id);
            }
        } else {
            if (diseaseStatusInput) {
                (async () => {
                    try {
                        const res = await diseaseStatusApi.createDiseaseStatus({
                            TYPE: 2,
                            NAME: DISEASE_STATUS_INPUT,
                        })
                        if (res.data) {
                            if (DiseaseIdCheck) {
                                confirmCreate({
                                    ...healthHisData,
                                    DISEASE_STATUS_ID: res.data.elements.id,
                                })
                            } else {
                                handleCreateHealthHis({
                                    ...healthHisData,
                                    DISEASE_STATUS_ID: res.data.elements.id,
                                })
                            }
                        }
                    } catch (error) {
                        console.log(error);
                    }
                })()
            } else {
                if (DiseaseIdCheck) {
                    confirmCreate(healthHisData)
                } else {
                    handleCreateHealthHis(healthHisData);
                }
            }
        }
    };

    const handleOk = () => {
        if (tabActive.physicalExam && newestPhysicalExam) {
            handleCreatePhysicalDetail({ PHYSICAL_EXAM_ID: newestPhysicalExam.id });
        }
        setTabActive({ ...tabActive, physicalExam: false });
        onKeyChange("3");
    }

    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Form
                    name="myForm"
                    autoComplete="off"
                    form={form}
                    layout="vertical"
                    style={{ marginTop: 20 }}
                >
                    <Row justify={{ md: "center", lg: "space-around" }}>
                        <Col xs={22} lg={6}>
                            <Form.Item name="DISEASE_ID" label="Tên bệnh">
                                <TreeSelect
                                    treeData={diseaseOptions}
                                    allowClear
                                    showSearch
                                    filterTreeNode={(input, item) =>
                                        removeAccents(item?.title ?? "")
                                            .toLowerCase()
                                            .includes(removeAccents(input).toLowerCase())
                                    }
                                    onSelect={handleSelecDisease}
                                    placeholder="Chọn tên bệnh"
                                    disabled={healthHis ? true : false}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={22} lg={4}>
                            <Form.Item name="START_DATE" label="Thời gian phát hiện">
                                <DatePicker
                                    format={formatDate.Type}
                                    style={{ width: '100%' }}
                                    placeholder="Chọn ngày"
                                    disabled={healthHis ? true : false}
                                    disabledDate={(current) => current && current > new Date()}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={22} lg={6}>
                            <Form.Item
                                name="DISEASE_STATUS_INPUT"
                                label={
                                    <Space>
                                        <Typography.Text>Tình trạng hiện tại</Typography.Text>
                                        <Tooltip
                                            color='#87d068'
                                            title="Khi nhập thì không cần chọn tình trạng bệnh hiện tại."
                                        >
                                            <Typography.Text type='danger'>(!)</Typography.Text>
                                        </Tooltip>
                                    </Space>
                                }
                            >
                                <Input
                                    allowClear
                                    placeholder='Nhập tình trạng bệnh'
                                    disabled={isSelecting ? true : false}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={22} lg={4}>
                            <Form.Item
                                name="DISEASE_STATUS_ID"
                                label={
                                    <Space>
                                        <Typography.Text>Tình trạng hiện tại</Typography.Text>
                                        <Tooltip
                                            color='#87d068'
                                            title="Khi chọn thì không cần nhập tình trạng bệnh hiện tại."
                                        >
                                            <Typography.Text type='danger'>(!)</Typography.Text>
                                        </Tooltip>
                                    </Space>
                                }
                            >
                                <Select
                                    allowClear
                                    showSearch
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    filterOption={(input, option) =>
                                        removeAccents((option?.label ?? "").toLowerCase())
                                            .includes(removeAccents(input.toLowerCase()))
                                    }
                                    options={diseaseStatusOptions}
                                    placeholder="Chọn tình trạng bệnh"
                                    disabled={isTyping ? true : false}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={22} lg={1}>
                            <Form.Item
                                label="Thêm"
                            >
                                <Button
                                    onClick={() => handleSubmit()}
                                    type="primary"
                                    className={healthHis ? "edit-btn" : ""}
                                    icon={healthHis ? <EditOutlined /> : <PlusOutlined />}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={22} offset={1}>
                        <Table
                            columns={columns}
                            dataSource={data}
                            loading={isLoading}
                            pagination={TblPagination}
                        />
                    </Col>
                </Row>
            </Col>
            <Col span={24} offset={1}>
                <Col offset={1}>
                    <p>
                        <span style={{ color: "red" }}>Lưu ý:</span> Trong trường hợp không
                        có "Tiền Sử Bệnh Tật", vui lòng bấm nút [Tiếp] để sang trang tiếp
                        theo{" "}
                    </p>
                </Col>
            </Col>
            <Col span={24}>
                <Row justify="space-between">
                    <Col >
                        <Button onClick={() => onKeyChange("1")}>Quay lại</Button>
                    </Col>
                    <Col >
                        <Button
                            type='primary'
                            onClick={handleOk}
                            htmlType="submit"
                        >
                            Tiếp
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default MedicalHistoryForm