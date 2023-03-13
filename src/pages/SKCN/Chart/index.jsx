import './style.scss';

import { Card, Progress } from 'antd';
import { DualAxes, Liquid } from '@ant-design/charts';
import { useEffect, useState } from 'react';

function Chart() {
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
    const configLiquid = {
        percent: 0.25,
        outline: {
            border: 4,
            distance: 8,
        },
        wave: {
            length: 128,
        },
        width: 100,
    };
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
                                size={600}
                            />
                            <div className="state__card__item">
                                <div className="state__card__item-data">300</div>
                                <span className="state__card__item-label">Đã tiêu hao</span>
                            </div>
                        </div>
                    </div>
                    <div className="chart">
                        <DualAxes {...configLine} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chart;
