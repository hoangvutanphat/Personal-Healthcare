import './style.scss';

import { Button, Card, Collapse, DatePicker, Divider, Progress, Select, Tabs } from 'antd';
import { CloseOutlined, SettingOutlined } from '@ant-design/icons';
import { DualAxes, Line, Liquid } from '@ant-design/charts';
import { useEffect, useState } from 'react';

import BMIApi from '../../../api/bmiApi';
import bloodPressureApi from '../../../api/bloodPressureApi';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';

dayjs.extend(customParseFormat);

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
                    <h1 className="tittle-chart">Tổng quan sức khoẻ</h1>
                    <div className="state">
                        <div className="state__card">
                            <div className="state__card__item">
                                <div className="state__card__item-data">2650</div>
                                <span className="state__card__item-label">Đã nạp</span>
                            </div>
                            {/* <Liquid {...configLiquid} /> */}
                            <Progress
                                type="circle"
                                percent={(2300 / 2723) * 100}
                                format={(percent) => (
                                    <>
                                        <div className="state__card__item-data">{2723 - 2650 + 654}</div>
                                        <span className="state__card__item-label">Cần nạp</span>
                                    </>
                                )}
                                size={150}
                            />
                            <div className="state__card__item">
                                <div className="state__card__item-data">654</div>
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
    // const getBloodPressure = async (id, callback) => {
    //     try {
    //         let res = await BMIApi.getBMIById(id);
    //         if (res.data) {
    //         }
    //     } catch (error) {}
    // };
    const data = [
        {
            date: '2023/3/1',
            type: 'TDEE',
            Calo: 2723,
        },
        {
            date: '2023/3/1',
            type: 'Calo/ngày',
            Calo: 2203,
        },
        {
            date: '2023/3/2',
            type: 'TDEE',
            Calo: 2723,
        },
        {
            date: '2023/3/2',
            type: 'Calo/ngày',
            Calo: 2016,
        },
        {
            date: '2023/3/3',
            type: 'TDEE',
            Calo: 2723,
        },
        {
            date: '2023/3/3',
            type: 'Calo/ngày',
            Calo: 2916,
        },
        {
            date: '2023/3/4',
            type: 'TDEE',
            Calo: 2723,
        },
        {
            date: '2023/3/4',
            type: 'Calo/ngày',
            Calo: 2512,
        },
        {
            date: '2023/3/5',
            type: 'TDEE',
            Calo: 2723,
        },
        {
            date: '2023/3/5',
            type: 'Calo/ngày',
            Calo: 3231,
        },
        {
            date: '2023/3/6',
            type: 'TDEE',
            Calo: 2723,
        },
        {
            date: '2023/3/6',
            type: 'Calo/ngày',
            Calo: 2003,
        },
        {
            date: '2023/3/7',
            type: 'TDEE',
            Calo: 2723,
        },
        {
            date: '2023/3/7',
            type: 'Calo/ngày',
            Calo: 1963,
        },
        {
            date: '2023/3/8',
            type: 'TDEE',
            Calo: 2723,
        },
        {
            date: '2023/3/8',
            type: 'Calo/ngày',
            Calo: 3367,
        },
        {
            date: '2023/3/9',
            type: 'TDEE',
            Calo: 2723,
        },
        {
            date: '2023/3/9',
            type: 'Calo/ngày',
            Calo: 2956,
        },
        {
            date: '2023/3/10',
            type: 'TDEE',
            Calo: 2723,
        },
        {
            date: '2023/3/10',
            type: 'Calo/ngày',
            Calo: 1673,
        },
        {
            date: '2023/3/11',
            type: 'TDEE',
            Calo: 2723,
        },
        {
            date: '2023/3/11',
            type: 'Calo/ngày',
            Calo: 2923,
        },
    ];
    const configLine = {
        data,
        xField: 'date',
        yField: 'Calo',
        yAxis: {
            label: {
                formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
        },
        seriesField: 'type',
        color: ({ type }) => {
            return type === 'Calo/ngày' ? '#1890ff' : type === 'TDEE' ? '#30BF73' : '#FAAD14';
        },
        lineStyle: ({ type }) => {
            if (type === 'TDEE') {
                return {
                    lineDash: [4, 4],
                    opacity: 1,
                };
            }

            return {
                opacity: 0.5,
            };
        },
    };
    const dateFormat = 'YYYY/MM/DD';
    return (
        <>
            <Date />
            <Line {...configLine} />
        </>
    );
}

const { Panel } = Collapse;
const text = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;
const History = () => {
    const onChange = (key) => {
        console.log(key);
    };
    return (
        <>
            <div style={{ display: 'flex', 'justify-content': 'flex-end', width: '100%',margin:'0 60px 20px 0' }}>
                <DatePicker
                    presets={[
                        { label: 'Yesterday', value: dayjs().add(-1, 'd') },
                        { label: 'Last Week', value: dayjs().add(-7, 'd') },
                        { label: 'Last Month', value: dayjs().add(-1, 'month') },
                    ]}
                    onChange={onChange}
                />
            </div>

            <Collapse defaultActiveKey={['1']} onChange={onChange} expandIconPosition={'end'}>
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

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
const Date = () => (
    <>
        <div style={{ display: 'flex', 'justify-content': 'flex-end', width: '100%' }}>
            <RangePicker defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]} format={dateFormat} />
        </div>
    </>
);
