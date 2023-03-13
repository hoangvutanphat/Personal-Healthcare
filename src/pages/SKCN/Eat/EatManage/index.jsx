import './style.scss';

import * as Yup from 'yup';

import { Avatar, Button, Card, Form, Input, InputNumber, Modal, Pagination, Select, Skeleton, Statistic, Switch, Tabs } from 'antd';
import { CheckCircleTwoTone, PlusOutlined, SettingOutlined, ArrowRightOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

import FoodItem from './foodItem';
import Food from "./food"
import BMIApi from '../../../../api/bmiApi';


const EatManage = () => {

    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: `Món ăn`,
            children: <Food />,
        },
        {
            key: '2',
            label: `Thực phẩm`,
            children: <FoodItem />,
        },
    ];


    return (
        <>
            <div className="wrapper">
                <div className="tab">
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                </div>
            </div>
        </>
    );
};

export default EatManage;
