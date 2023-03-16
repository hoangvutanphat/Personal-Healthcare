import './style.scss';

import * as Yup from 'yup';

import { Avatar, Button, Card, Form, Input, InputNumber, Modal, Pagination, Skeleton, Statistic, Switch } from 'antd';
import { CheckCircleTwoTone, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

import response from '../../../utils/demo/foodData';
import { useFormik } from 'formik';

const { Meta } = Card;
const { Search } = Input;

const Excercise = () => {
    const [loading, setLoading] = useState(true);
    const [resutPerpage, setResutPerpage] = useState(12);
    const [page, setPage] = useState(1);
    const onShowSizeChange = (current, pageSize) => {
        setResutPerpage(pageSize);
        handelChange(current);
    };

    const [data, setData] = useState(response.slice(0, resutPerpage));
    const [searchValue, setSearchValue] = useState('');
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const totalResults = response.length;

    const handelChange = (page) => {
        setPage(page);
        setData(response.slice((page - 1) * resutPerpage, page * resutPerpage));
    };

    const handleSearch = (value) => {
        console.log(value);
        setSearchValue(value);
        setData(
            response
                .filter((item) => {
                    return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase());
                })
                .slice((0 - 1) * resutPerpage, 1 * resutPerpage),
        );
    };

    useEffect(() => {
        if (response !== []) setLoading(false);
    }, [response]);
    console.log(data);

    // const handleAddEx = () => {
    //   setModal2Open(false);
    // };

    const onFinish = (value) => {
        const data = {
            title: value.title,
            calories: value.calories,
            time: value.time,
        };

        const addExcercise = () => {
            console.log(data);
        };
        addExcercise();
        setModal2Open(false);
    };
    return (
        <>
            <Modal
                title="Vertically centered modal dialog"
                centered
                open={modal1Open}
                onOk={() => setModal1Open(false)}
                onCancel={() => setModal1Open(false)}
            ></Modal>
            <div className="wrapper">
                <h1 className="tittle">Tập luyện hằng ngày</h1>
                <div className="search">
                    <Search
                        placeholder="Tìm hoạt động"
                        enterButton="Search"
                        size="large"
                        // onChange={handleChange}
                        onSearch={handleSearch}
                    />
                </div>
                <div className="action">
                    <Statistic
                        title="Số calo đã tiêu hao "
                        value={112893}
                        // formatter={formatter}
                        prefix={
                            <img
                                src="https://img.icons8.com/external-flat-andi-nur-abdillah/64/null/external-Calories-nutrition-(flat)-flat-andi-nur-abdillah.png"
                                className="action__img"
                            />
                        }
                    />
                    <Button size="middle" className="search__button" type="primary" onClick={() => setModal2Open(true)}>
                        Thêm vận động
                        <PlusOutlined />
                    </Button>
                    <Modal
                        title="Thêm vận động"
                        centered
                        open={modal2Open}
                        okButtonProps={{
                            form: 'ex-editor-form',
                            key: 'submit',
                            htmlType: 'submit',
                        }}
                        onCancel={() => setModal2Open(false)}
                    >
                        <Form
                            id="ex-editor-form"
                            onFinish={onFinish}
                            labelCol={{
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            layout="horizontal"
                            size="large"
                            className="mt-4"
                        >
                            <Form.Item label="Tiêu đề" name="tittle">
                                <Input />
                            </Form.Item>
                            <Form.Item label="kcal" name="calories">
                                <InputNumber />
                            </Form.Item>
                            <Form.Item label="Thời gian" name="time">
                                <InputNumber />
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
                <div className="container-chart">
                    {data?.map((foodItem) => (
                        <Card
                            style={{
                                width: 300,
                                marginTop: 16,
                                'box-shadow': 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                            }}
                            actions={[<PlusOutlined />, <SettingOutlined onClick={() => setModal1Open(true)} />, <CheckCircleTwoTone />]}
                        >
                            <Skeleton loading={loading} avatar active>
                                <Meta
                                    avatar={<Avatar src="https://joesch.moe/api/v1/random?key=2" />}
                                    title={foodItem.foodName}
                                    description={`${foodItem.calories} kcal `}
                                />
                            </Skeleton>
                        </Card>
                    ))}
                </div>
                <div className="pagination">
                    <Pagination
                        pageSizeOptions={[12, 24, 48, 96]}
                        defaultPageSize={12}
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}
                        defaultCurrent={1}
                        total={totalResults}
                        onChange={(value) => handelChange(value)}
                    />
                </div>
            </div>
        </>
    );
};

export default Excercise;
