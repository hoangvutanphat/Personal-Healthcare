import { Line, Area } from "@ant-design/plots";
import { Space } from "antd";
import React from "react";

const AxitUricChart = ({ data, chartColor }) => {
  const config = {
    data,
    seriesField: "name",
    padding: "auto",
    xField: "date",
    yField: "index",
    meta: {
      range: [135, 185],
    },
    yAxis: {
      label: {
        formatter: (v) => v,
      },
      tickCount: 10,
    },
    legend: false,
    lineStyle: {
      lineWidth: 4,
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 3000,
      },
    },
    color: ({ name }) => {
      if (name === "Min") {
        return chartColor.min;
      } else if (name === "Max") {
        return chartColor.max;
      }
      return chartColor.default;
    },
  };

  return (
    <div className="chart-wrapper">
      {data?.length > 0 ? (
        <Line {...config} loading={data ? false : true} />
      ) : (
        <Space
          className="chart-info py-10"
          style={{ fontSize: "20px", padding: "50px" }}
          wrap
        >
          Không có dữ liệu
        </Space>
      )}
      <div className="chart-info">
        <Space size={40}>
          <Space size={16}>
            <p className="name">Min:</p>
            <p
              className="line"
              style={{ width: "50px", backgroundColor: chartColor.min }}
            ></p>
          </Space>
          <Space size={16}>
            <p className="name">Max:</p>
            <p
              className="line"
              style={{ width: "50px", backgroundColor: chartColor.max }}
            ></p>
          </Space>
          <Space size={16}>
            <p className="name">Axit Uric:</p>
            <p
              className="line"
              style={{ width: "50px", backgroundColor: chartColor.default }}
            ></p>
          </Space>
        </Space>
      </div>
    </div>
  );
};

export default AxitUricChart;
