import './style.scss';

import { Button, Card, Collapse, Divider, Progress, Select, Tabs } from 'antd';
import { CloseOutlined, SettingOutlined } from '@ant-design/icons';
import { DualAxes, Liquid } from '@ant-design/charts';
import { useEffect, useState } from 'react';

import BMIApi from '../../../api/bmiApi';
import bloodPressureApi from '../../../api/bloodPressureApi';

function Chart() {
    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: `Biểu đồ`,
            children: <ChartLine />,
        },
        {
            key: '2',
            label: `Nhật ký `,
            children: <History />,
        },
    ];
    return (
        <>
            <div className="wrapper">
                <div className="chart-container">
                    <h1 className="tittle">Tổng quan sức khoẻ</h1>
                    <div className="state">
                        <div className="state__card">
                            <div className="state__card__item">
                                <div className="state__card__item-data">2300</div>
                                <span className="state__card__item-label">Đã nạp</span>
                            </div>
                            {/* <Liquid {...configLiquid} /> */}
                            <Progress
                                type="circle"
                                percent={(2300 / 3000) * 100}
                                format={(percent) => (
                                    <>
                                        <div className="state__card__item-data">{3000 - 2700}</div>
                                        <span className="state__card__item-label">Cần nạp</span>
                                    </>
                                )}
                                size={150}
                            />
                            <div className="state__card__item">
                                <div className="state__card__item-data">300</div>
                                <span className="state__card__item-label">Đã tiêu hao</span>
                            </div>
                        </div>
                    </div>
                    <div className="chart">
                        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                    </div>
                </div>
            </div>
        </>
    );
}
function ChartLine() {
    
    const getBloodPressure = async (id, callback) => {
        try {
            let res = await BMIApi.getBMIById(id);
            if (res.data) {
            }
        } catch (error) {

        }
    };

    getBloodPressure(990)
    const data = [
        {
            year: '1991',
            value: 3,
            count: 10,
        },
        {
            year: '1992',
            value: 4,
            count: 4,
        },
        {
            year: '1993',
            value: 3.5,
            count: 5,
        },
        {
            year: '1994',
            value: 5,
            count: 5,
        },
        {
            year: '1995',
            value: 4.9,
            count: 4.9,
        },
        {
            year: '1996',
            value: 6,
            count: 35,
        },
        {
            year: '1997',
            value: 7,
            count: 7,
        },
        {
            year: '1998',
            value: 9,
            count: 1,
        },
        {
            year: '1999',
            value: 13,
            count: 20,
        },
    ];
    const configLine = {
        autoFit: true,
        data: [data, data],
        xField: 'year',
        yField: ['value', 'count'],
        geometryOptions: [
            {
                geometry: 'line',
                color: '#5B8FF9',
            },
            {
                geometry: 'line',
                color: '#5AD8A6',
            },
        ],
    };
    return <DualAxes {...configLine} />;
}

const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const History = () => {
    const onChange = (key) => {
        console.log(key);
    };
    return (
        <>
            <Collapse defaultActiveKey={['1', '2', '3', '4']} onChange={onChange} expandIconPosition={'end'}>
                <Panel header="Bữa sáng" key="1">
                    <div className="history">
                        <div className="hisroty__item">
                            <div className="hisroty__item__info">
                                <p className="hisroty__item__info-name">Yến mạch</p>
                                <p className="hisroty__item__info-calories">1 phần ăn (100g) - 0 calo</p>
                            </div>
                            <div className="hisroty__item-button">
                                <Button size={'default'} shape="circle" icon={<CloseOutlined />}></Button>
                            </div>
                        </div>
                        <div className="hisroty__item">
                            <div className="hisroty__item__info">
                                <p className="hisroty__item__info-name">Yến mạch</p>
                                <p className="hisroty__item__info-calories">1 phần ăn (100g) - 0 calo</p>
                            </div>
                            <div className="hisroty__item-button">
                                <Button size={'default'} shape="circle" icon={<CloseOutlined />}></Button>
                            </div>
                        </div>
                        <div className="hisroty__item">
                            <div className="hisroty__item__info">
                                <p className="hisroty__item__info-name">Yến mạch</p>
                                <p className="hisroty__item__info-calories">1 phần ăn (100g) - 0 calo</p>
                            </div>
                            <div className="hisroty__item-button">
                                <Button size={'default'} shape="circle" icon={<CloseOutlined />}></Button>
                            </div>
                        </div>
                        <div className="hisroty__item">
                            <div className="hisroty__item__info">
                                <p className="hisroty__item__info-name">Yến mạch</p>
                                <p className="hisroty__item__info-calories">1 phần ăn (100g) - 0 calo</p>
                            </div>
                            <div className="hisroty__item-button">
                                <Button size={'default'} shape="circle" icon={<CloseOutlined />}></Button>
                            </div>
                        </div>
                        <div className="hisroty__item">
                            <div className="hisroty__item__info">
                                <p className="hisroty__item__info-name">Yến mạch</p>
                                <p className="hisroty__item__info-calories">1 phần ăn (100g) - 0 calo</p>
                            </div>
                            <div className="hisroty__item-button">
                                <Button size={'default'} shape="circle" icon={<CloseOutlined />}></Button>
                            </div>
                        </div>
                    </div>
                </Panel>
                <Panel header="Bữa trưa" key="2">
                    <div>{text}</div>
                </Panel>
                <Panel header="Bữa tối" key="3">
                    <div>{text}</div>
                </Panel>
                <Panel header="Bữa phụ" key="4">
                    <div>{text}</div>
                </Panel>
            </Collapse>
        </>
    );
};

export default Chart;
