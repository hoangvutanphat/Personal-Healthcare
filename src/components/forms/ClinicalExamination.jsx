import { MinusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import clinicalDetailApi from '../../api/clinicalDetailApi';
import clinicalDetailUserAddedApi from '../../api/clinicalDetailUserAdded';
import preclinicalDetailApi from '../../api/preclinicDetailApi';
import { newestClinicalDetailState } from '../../recoil/atom/clinicalDetailState';
import { newestPreclinicalDetailState } from '../../recoil/atom/perclinicalDetailState';
import { newestPhysicalExamState, physicalExamSelectState } from '../../recoil/atom/physicalExamState';
import { tabActiveState } from '../../recoil/atom/tabActiveState';

const ClinicalExaminationForm = ({ onKeyChange, formRef, reload }) => {
    const [form] = Form.useForm();
    const { enqueueSnackbar } = useSnackbar();

    const newestPhysicalExam = useRecoilValue(newestPhysicalExamState);
    const newestClinicalDetail = useRecoilValue(newestClinicalDetailState);
    const [tabActive, setTabActive] = useRecoilState(tabActiveState);
    const physicalExam = useRecoilValue(physicalExamSelectState);
    const setNewestPreclinicalDetail = useSetRecoilState(newestPreclinicalDetailState);

    const [clinicalDetail, setClinicalDetail] = useState(undefined);
    const [initValue, setInitValue] = useState([]);

    useEffect(() => {
        if (physicalExam && physicalExam?.Clinical_Details?.length) {
            setClinicalDetail(physicalExam.Clinical_Details[0]);
        }
    }, [physicalExam]);
    useEffect(() => {
        if (!physicalExam && !tabActive.subClinicalExam) {
            (async () => {
                try {
                    let res = await clinicalDetailApi.getClinicalDetailById(newestClinicalDetail.id);
                    if (res.data) {
                        setClinicalDetail(res.data.elements.clinicalDetail);
                    }
                } catch (error) {
                    console.log(error);
                }
            })()
        }
    }, [tabActive.subClinicalExam, physicalExam, newestClinicalDetail]);
    useEffect(() => {
        if (clinicalDetail) {
            if (clinicalDetail?.Clinical_Detail_User_Addeds?.length) {
                const tempData = []
                clinicalDetail.Clinical_Detail_User_Addeds.forEach((item, index) => {
                    tempData.push({
                        [`content_${index}`]: item.NAME,
                        [`result_${index}`]: item.RESULT,
                        id: item.id,
                    })
                });
                setInitValue(() => tempData);
            }
        }
    }, [clinicalDetail]);

    useEffect(() => {
        if (initValue.length) {
            form.setFieldsValue({
                clinicalExam: initValue
            })
        }
    }, [initValue, form]);

    const handleCreateClinicalDetailUserAdded = async (data) => {
        try {
            let res = await clinicalDetailUserAddedApi.createClinicalDetailUserAdded(data);
            if (res.data) {
                enqueueSnackbar(res.data.message, { variant: "success" });
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
            console.log(error);
        }
    };
    const handleUpdateClinicalDetailUserAdded = async (data, id) => {
        try {
            let res = await clinicalDetailUserAddedApi.updateClinicalDetailUserAdded(data, id);
            if (res.data) {
                enqueueSnackbar(res.data.message, { variant: "success" });
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
            console.log(error);
        }
    };

    const handleCreatePreClinicalExam = async (data) => {
        try {
            let res = await preclinicalDetailApi.createPreclinicalDetail(data);
            if (res.data) {
                setNewestPreclinicalDetail(res.data.elements)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleOk = () => {
        const data = { ...form.getFieldsValue() };

        if (data.clinicalExam) {
            data.clinicalExam.forEach((item, index) => {
                let content_key = `content_${index}`;
                let result_key = `result_${index}`;
                if (item?.id) {
                    handleUpdateClinicalDetailUserAdded({
                        NAME: item[content_key],
                        RESULT: item[result_key],
                        CLINICAL_DETAIL_ID: clinicalDetail.id,
                    }, item.id)
                } else {
                    handleCreateClinicalDetailUserAdded({
                        NAME: item[content_key],
                        RESULT: item[result_key],
                        CLINICAL_DETAIL_ID: newestClinicalDetail.id,
                    })
                }
            })
        }
        if (tabActive.subClinicalExam) {
            handleCreatePreClinicalExam({ PHYSICAL_EXAM_ID: physicalExam ? physicalExam.id : newestPhysicalExam.id });
        }
        setTabActive({ ...tabActive, subClinicalExam: false });
        reload();
        onKeyChange("5");
    };

    return (
        <Form
            name="clinicalExamination"
            autoComplete='off'
            labelAlign='left'
            form={form}
            onFinish={handleOk}
            style={{ marginTop: 20 }}
            ref={formRef}
        >
            <Form.List
                name="clinicalExam"
            >
                {(fields, { add, remove }) =>
                    <>
                        <Row justify="end">
                            <Col>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        onClick={() => add()}
                                        disabled={physicalExam ? true : false}
                                    >
                                        <strong>+ Thêm nội dung khám</strong>
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                        {fields.map(({ key, name, ...restFeild }, index) => (
                            <Row justify="center" gutter={[48, 0]} key={key}>
                                <Col xs={24} md={10}>
                                    <Form.Item
                                        {...restFeild}
                                        name={[name, `content_${index}`]}
                                        label={index + 1}
                                        labelCol={{ xs: { span: 6 }, md: { span: 4 } }}
                                        style={{ marginBottom: 4 }}
                                        help={<i>Ví dụ : Tai-Mũi-Họng</i>}
                                    >
                                        <Input allowClear placeholder='Nhập nội dung khám tại đây' />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={10}>
                                    <Form.Item
                                        {...restFeild}
                                        name={[name, `result_${index}`]}
                                        label="Kết luận"
                                        labelCol={{ span: 6 }}
                                        style={{ marginBottom: 4 }}
                                        help={<i>Ví dụ : Viêm họng mãn tính</i>}
                                    >
                                        <Input allowClear placeholder="Nhập kết luận khám của bác sĩ" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={1} >
                                    {physicalExam ? '' : <MinusCircleOutlined onClick={() => remove(name)} />}
                                </Col>
                            </Row>
                        ))}
                    </>
                }
            </Form.List>
            {physicalExam ? '' :
                <Form.Item>
                    <Row justify='center'>
                        <Col>
                            <Typography.Paragraph type='secondary' italic>
                                Nhấn vào " Thêm nội dung khám " để nhập dữ liệu
                            </Typography.Paragraph>
                        </Col>
                    </Row>
                </Form.Item>
            }
            <Row justify="space-between">
                <Col >
                    <Button onClick={() => onKeyChange("3")}>Quay lại</Button>
                </Col>
                <Col >
                    <Button
                        type='primary'
                        htmlType="submit"
                    >
                        Tiếp
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default ClinicalExaminationForm