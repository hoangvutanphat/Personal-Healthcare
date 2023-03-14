import { Button, Col, DatePicker, Form, Image, Input, Radio, Row, Space, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import ColumnChartBMI from './ColumnChartBMI';
import NumericInput from '../../globals/NumericInput/NumericInput';
import ResultHistoryBMI from './ResultHistoryBMI';
import { SelfSpecialPhysicalExamByUserState } from '../../../recoil/atom/physicalExamState';
import ToolTip from '../../globals/Tooltip';
import { authState } from '../../../recoil/atom/authState';
import iconInformation from '../../../assets/images/icon_infomation.svg';
import normal from '../../../assets/images/normal.png';
import obese from '../../../assets/images/obese.png';
import overweight from '../../../assets/images/overweight.png';
import physicalDetailApi from '../../../api/physicalDetailApi';
import physicalExamApi from '../../../api/physicalExamApi';
import { selfSpecialPhycalExamByUserData } from '../../../common/getAllApi';
import tremelyObese from '../../../assets/images/tremelyObese.png';
import underweight from '../../../assets/images/underweight.png';
import { useBMI } from '../../../hooks/bmi';

const useStyle = {
    setCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
    },
    setSpaceBetween: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItem: 'center',
    },
};

const CheckBMI = () => {
    const [form] = Form.useForm();
    const { createBMI } = useBMI();
    const { profile } = useRecoilValue(authState);
    const [valueHeight, setValueHeight] = useState(null);
    const [valueWeight, setValueWeight] = useState(null);
    const [data, setData] = useState();
    const [valueBMI, setValueBMI] = useState();
    const [type, setType] = useState(true);

    const [SelfSpecialPhysicalExamByUser, setSelfSpecialPhysicalExamByUser] = useRecoilState(SelfSpecialPhysicalExamByUserState);

    useEffect(() => {
        selfSpecialPhycalExamByUserData(SelfSpecialPhysicalExamByUser, setSelfSpecialPhysicalExamByUser);
    }, []);

    const onFinish = async () => {
        const newData = { ...form.getFieldValue() };
        const { HEIGHT, WEIGHT, EXAM_DATE } = newData;
        const valueHeight = HEIGHT / 100;
        const BMI = +(Math.round(WEIGHT.replace(/,/g, '.') / (valueHeight * valueHeight) + 'e+2') + 'e-2');
        if (
            HEIGHT === undefined ||
            HEIGHT === null ||
            WEIGHT === undefined ||
            WEIGHT === null ||
            EXAM_DATE === undefined ||
            EXAM_DATE === null ||
            WEIGHT.trim() === '' ||
            HEIGHT.trim() === ''
        ) {
            return;
        }
        const dataBMI = {
            EXAM_DATE: EXAM_DATE,
            BMI_INDEX: BMI,
        };

        if (SelfSpecialPhysicalExamByUser?.id) {
            if (SelfSpecialPhysicalExamByUser?.Physical_Details[0]?.id) {
                handleCreateBMI({
                    ...dataBMI,
                    PHYSICAL_DETAIL_ID: SelfSpecialPhysicalExamByUser?.Physical_Details[0]?.id,
                });
            } else {
                const data = {
                    PHYSICAL_EXAM_ID: SelfSpecialPhysicalExamByUser?.id,
                };
                try {
                    let res = await physicalDetailApi.createPhysicalDetail(data);
                    if (res.data) {
                        handleCreateBMI({
                            ...dataBMI,
                            PHYSICAL_DETAIL_ID: res?.data?.elements?.id,
                        });
                    }
                } catch (error) {
                    console.log('error');
                }
            }
        } else {
            try {
                const data = {
                    USER_ID: profile?.id,
                    TYPE: 8,
                    INPUT_STATUS: 1,
                };
                let physicalExam = await physicalExamApi.createPhysicalExam(data);
                if (physicalExam.data) {
                    try {
                        const newData = {
                            PHYSICAL_EXAM_ID: physicalExam?.data?.elements?.id,
                        };
                        let physicalDetail = await physicalDetailApi.createPhysicalDetail(newData);
                        if (physicalDetail.data) {
                            handleCreateBMI({
                                ...dataBMI,
                                PHYSICAL_DETAIL_ID: physicalDetail?.data?.elements?.id,
                            });
                        }
                    } catch (error) {
                        console.log('error');
                    }
                }
            } catch (error) {
                console.log('error');
            }
        }
    };

    const handleCreateBMI = async (value, callback) => {
        await createBMI(value, callback);
        handleCancel();
    };

    const handleClick = () => {
        const newData = { ...form.getFieldValue() };
        setData(newData);
    };
    useEffect(() => {
        setValueHeight(data?.HEIGHT);
        setValueWeight(data?.WEIGHT);
        if (valueHeight && valueWeight && valueHeight >= 50) {
            const valueHeight1 = valueHeight / 100;
            const BMI = +(Math.round(valueWeight.replace(/,/g, '.') / (valueHeight1 * valueHeight1) + 'e+2') + 'e-2');
            setValueBMI(BMI);
        }
    }, [valueHeight, valueWeight, data]);

    const selectMe = () => {
        setType(true);
    };
    const selectOthers = () => {
        setType(false);
    };
    const handleCancel = () => {
        form.resetFields();
    };

    return (
        <>
            <Form form={form} name="bmi" onFinish={onFinish}>
                <Space style={useStyle.setCenter} wrap className="title">
                    <Typography.Title level={2}>TỰ KIỂM TRA SỨC KHỎE BẰNG BMI</Typography.Title>
                </Space>

                <Row>
                    <Col span={6}>
                        <p style={{ fontWeight: 600 }}>Kiểm tra BMI cho</p>
                    </Col>
                    <Col span={10}>
                        <Form.Item name="TYPE" initialValue={0}>
                            <Radio.Group>
                                <Radio onClick={selectMe} value={0}>
                                    Bản thân
                                </Radio>
                                <Radio onClick={selectOthers} value={1}>
                                    Cho người trưởng thành khác
                                </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name="YOB" label="Năm sinh">
                            {type === true ? (
                                <Typography>{new Date(profile?.BOD).getFullYear()}</Typography>
                            ) : (
                                <DatePicker
                                    picker="year"
                                    disabledDate={(current) => new Date(current).getFullYear() > new Date().getFullYear() - 19}
                                ></DatePicker>
                            )}
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={10}>
                        <Col>
                            <Form.Item
                                name="EXAM_DATE"
                                label={<span style={{ fontWeight: 600 }}>Ngày theo dõi sức khỏe</span>}
                                labelCol={{ span: 14 }}
                                labelAlign="left"
                            >
                                <DatePicker
                                    format={'DD/MM/YYYY'}
                                    disabledDate={(current) => current && current.valueOf() > Date.now()}
                                ></DatePicker>
                            </Form.Item>
                        </Col>
                    </Col>

                    <Col span={6}>
                        <Row>
                            <Form.Item name="WEIGHT" label="Cân nặng" style={{ width: 140 }}>
                                {/* <Input /> */}
                                <NumericInput />
                            </Form.Item>
                            <Col offset={1}>
                                <Typography style={{ marginTop: 5 }}>kg</Typography>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={6}>
                        <Row>
                            <Form.Item name="HEIGHT" label="Chiều cao" style={{ width: 140 }}>
                                {/* <Input /> */}
                                <NumericInput />
                            </Form.Item>
                            <Col offset={1}>
                                <Typography style={{ marginTop: 5 }}>cm</Typography>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Space style={useStyle.setCenter} wrap>
                    <Button
                        style={{
                            height: '50px',
                            fontSize: '20px',
                            backgroundColor: '#4472c4',
                            color: 'white',
                            margin: '10px',
                        }}
                        onClick={handleClick}
                    >
                        KIỂM TRA SỨC KHỎE
                    </Button>
                </Space>
                <Space wrap className="title">
                    <Typography.Title level={4}>Kết quả BMI hiện tại của bạn</Typography.Title>
                    <ToolTip
                        indexConten="BMI (Body Mass Index) "
                        description=' là "chỉ số khối cơ thể" được xác định dựa
          vào cân nặng và chiều cao. Chỉ số BMI của một người có thể đánh
          giá người đó béo, gầy hay có cân nặng lý tưởng. Chỉ số BMI chỉ có
          thể phân loại mức độ gầy béo dựa vào tương quan giữa chiều cao và
          cân nặng, không thể phản ánh được sự phân bố mỡ trong cơ thể'
                        Icon_infomation={iconInformation}
                    />
                </Space>

                <Row style={{ justifyContent: 'center', paddingTop: '50px' }}>
                    <Tooltip
                        placement="top"
                        title={<p style={{ color: 'white' }}>BMI = {valueBMI} </p>}
                        open={valueBMI > 0 && valueBMI < 18.5 ? true : false}
                        color="#70ad47"
                    >
                        <ColumnChartBMI title="Thiếu cân" backgroundColor="#70ad47" number="0" />
                    </Tooltip>
                    <Tooltip
                        placement="top"
                        title={<p style={{ color: 'white' }}>BMI = {valueBMI} </p>}
                        open={valueBMI >= 18.5 && valueBMI < 23 ? true : false}
                        color="#b9d034"
                    >
                        <ColumnChartBMI title="Bình thường" backgroundColor="#b9d034" number="18,5" />
                    </Tooltip>
                    <Tooltip
                        placement="top"
                        title={<p style={{ color: 'white' }}>BMI = {valueBMI} </p>}
                        open={valueBMI >= 23 && valueBMI < 25 ? true : false}
                        color="yellow"
                    >
                        <ColumnChartBMI title="Tiền béo phì" backgroundColor="yellow" color="black" number="22,9" />
                    </Tooltip>
                    <Tooltip
                        placement="top"
                        title={<p style={{ color: 'white' }}>BMI = {valueBMI} </p>}
                        open={valueBMI >= 25 && valueBMI < 30 ? true : false}
                        color="#ed7d31"
                    >
                        <ColumnChartBMI title="Béo phì độ I" backgroundColor="#ed7d31" number="24,9" />
                    </Tooltip>
                    <Tooltip
                        placement="top"
                        title={<p style={{ color: 'white' }}>BMI = {valueBMI} </p>}
                        open={valueBMI >= 30 ? true : false}
                        color="red"
                    >
                        <ColumnChartBMI title="Béo phì độ II" backgroundColor="red" number="29,9" />
                    </Tooltip>
                </Row>

                <div
                    style={{
                        paddingTop: '50px',
                        justifyContent: 'center',
                    }}
                >
                    {valueBMI > 0 && valueBMI < 18.5 ? (
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 18 }}>
                            <Image src={underweight} preview={false}></Image>
                            <p>Chỉ số BMI của bạn đang thuộc khoảng thiếu cân, hãy thay đổi chế độ và luyện tập thể dục để cải thiện nhé</p>
                        </div>
                    ) : (
                        ''
                    )}
                    {valueBMI >= 18.5 && valueBMI < 23 ? (
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 18 }}>
                            <Image src={normal} preview={false}></Image>
                            <p>Chỉ số BMI của bạn khá cân đối. Hãy giữ vững phong độ như thế nhé</p>
                        </div>
                    ) : (
                        ''
                    )}
                    {valueBMI >= 23 && valueBMI < 25 ? (
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 18 }}>
                            <Image src={overweight} preview={false}></Image>
                            <p>Chỉ số BMI của bạn đang thuộc khoảng tiền béo phì</p>
                        </div>
                    ) : (
                        ''
                    )}
                    {valueBMI >= 25 && valueBMI < 30 ? (
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 18 }}>
                            <Image src={obese} preview={false}></Image>
                            <p>
                                Chỉ số BMI của bạn đang thuộc khoảng tiền béo phì độ I, hãy thay đổi chế độ và luyện tập thể dục để cải
                                thiện nhé
                            </p>
                        </div>
                    ) : (
                        ''
                    )}
                    {valueBMI > 30 ? (
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 18 }}>
                            <Image src={tremelyObese} preview={false}></Image>
                            <p>
                                Chỉ số BMI của bạn đang thuộc khoảng tiền béo phì độ II, hãy thay đổi chế độ và luyện tập thể dục để cải
                                thiện nhé
                            </p>
                        </div>
                    ) : (
                        ''
                    )}
                </div>

                {type === true ? (
                    <Form.Item>
                        <Space style={useStyle.setCenter} wrap>
                            <Button
                                style={{
                                    height: '50px',
                                    fontSize: '20px',
                                    backgroundColor: '#ffc000',
                                    color: 'white',
                                    margin: '10px',
                                }}
                                form="bmi"
                                key="bmi"
                                htmlType="submit"
                            >
                                LƯU KẾT QUẢ BMI
                            </Button>
                        </Space>
                        <div style={{ margin: '50px 0' }}>
                            <ResultHistoryBMI />
                        </div>
                    </Form.Item>
                ) : (
                    ''
                )}
            </Form>
        </>
    );
};

export default CheckBMI;
