import { AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select, Statistic } from 'antd';
import React, { useState } from 'react';

// Define the activity multipliers
const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
};
const { Option } = Select;

const bmrFormulas = {
    male: (weight, height, age) => 66 + 13.7 * weight + 5 * height - 6.76 * age,
    female: (weight, height, age) => 655.1 + 9.6 * weight + 1.8 * height - 4.7 * age,
    // male: (weight, height, age) => 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age,
    // female: (weight, height, age) => 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age,
    // male: (weight, height, age) => 66 + 6.2 * weight + 12.7 * height - 6.76 * age,
    // female: (weight, height, age) => 655.1 + 4.35 * weight + 4.7 * height - 4.7 * age,
};

const TDEE = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(
            'Received values of form: ',
            values,
            calculateTDEE(values.Gender, values.Weight, values.Height, values.Age, values.Activity),
        );
    };
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    const [tdee, setTdee] = useState(0);
    const [bmr, setBmr] = useState(0);

    const calculateTDEE = (gender, weight, height, age, activity) => {
        const bmrFormula = bmrFormulas[gender];
        const bmr = bmrFormula(weight, height, age);
        setBmr(bmr);
        const tdee = Math.round(bmr * activity);
        setTdee(Math.round(tdee));
        return tdee;
    };

    return (
        <>
            <Row gutter={16}>
                <Col span={12}>
                    <h3>Công cụ tính TDEE</h3>
                    <br />
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        initialValues={{
                            residence: ['zhejiang', 'hangzhou', 'xihu'],
                            prefix: '86',
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="Weight"
                            label="Weight"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Weight amount!',
                                },
                            ]}
                        >
                            <InputNumber
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Height"
                            label="Height"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Height amount!',
                                },
                            ]}
                        >
                            <InputNumber
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Age"
                            label="Age"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Age amount!',
                                },
                            ]}
                        >
                            <InputNumber
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="Gender"
                            label="Gender"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select gender!',
                                },
                            ]}
                        >
                            <Select placeholder="select your gender">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="Activity"
                            label="Activity"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select Activity!',
                                },
                            ]}
                        >
                            <Select placeholder="select your Activity">
                                <Option value={1.2}> Sedentary (little or no exercise)</Option>
                                <Option value={1.375}>Light (exercise 1-3 times/week)</Option>
                                <Option value={1.55}>Moderate (exercise 3-5 times/week)</Option>
                                <Option value={1.725}>Active (exercise 6-7 times/week)</Option>
                                <Option value={1.9}>Very Active (hard exercise or sports every day)</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={12}>
                    <Statistic title="BMR" value={bmr} />
                    <Statistic title="TDEE" value={tdee} />
                </Col>
            </Row>
        </>
    );
};
export default TDEE;
