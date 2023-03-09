import { Line } from "@ant-design/plots";
import { Space } from "antd";
import React from "react";

const GlycemicChart = ({ data, chartColor }) => {
  const config = {
    data,
    xField: "date",
    yField: "index",
    seriesField: "name",
    yAxis: {
      label: {
        formatter: (v) => v,
      },
      tickCount: 8,
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
    colorField: "name",
    color: ({ name }) => {
      if (name === "Min") {
        return chartColor.min;
      }
      if (name === "Max") {
        return chartColor.max;
      }
      if (name === "KQ nghiệm pháp Glucose lần 1") {
        return chartColor.blue;
      }
      if (name === "KQ nghiệm pháp Glucose lần 2") {
        return chartColor.purple;
      }
      if (name === "KQ nghiệm pháp Glucose lần 3") {
        return chartColor.olive;
      }
      if (name === "Glucose lúc đói") {
        return chartColor.orange;
      }
      return chartColor.pink;
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
      <div className="chart-info" style={{ justifyContent: "flex-start" }}>
        <Space size={40} wrap>
          <Space size={20}>
            <p className="name">Min:</p>
            <p
              className="line"
              style={{ width: "50px", backgroundColor: chartColor.min }}
            ></p>
          </Space>
          <Space size={20}>
            <p className="name">Max:</p>
            <p
              className="line"
              style={{ width: "50px", backgroundColor: chartColor.max }}
            ></p>
          </Space>
        </Space>
      </div>
      <div className="chart-info">
        <Space size={40} wrap>
          <Space size={16}>
            <p className="name">KQ nghiệm pháp Glucose lần 1:</p>
            <p
              className="line"
              style={{ width: "50px", backgroundColor: chartColor.blue }}
            ></p>
          </Space>
          <Space size={16}>
            <p className="name">KQ nghiệm pháp Glucose lần 2:</p>
            <p
              className="line"
              style={{ width: "50px", backgroundColor: chartColor.purple }}
            ></p>
          </Space>
          <Space size={16}>
            <p className="name">KQ nghiệm pháp Glucose lần 3:</p>
            <p
              className="line"
              style={{ width: "50px", backgroundColor: chartColor.olive }}
            ></p>
          </Space>
          <Space size={16}>
            <p className="name">HbAC1:</p>
            <p
              className="line"
              style={{ width: "50px", backgroundColor: chartColor.pink }}
            ></p>
          </Space>
          <Space size={16}>
            <p className="name">Glucose lúc đói:</p>
            <p
              className="line"
              style={{ width: "50px", backgroundColor: chartColor.orange }}
            ></p>
          </Space>
        </Space>
      </div>
    </div>
  );
};

export default GlycemicChart;
