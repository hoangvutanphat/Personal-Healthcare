import { Line } from "@ant-design/plots";
import { Space } from "antd";
import React from "react";

const LipidChart = ({ data }) => {
  const config = {
    data,
    seriesField: "name",
    xField: "date",
    yField: "index",
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
    colorField: "name",
    color: ({ name }) => {
      if (name === "Cholesterol") {
        return "#FF3F3C";
      }
      if (name === "HDL") {
        return "#AF74E6";
      }
      if (name === "LDL") {
        return "#6EDA69";
      }
      return "#F2994A";
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
        <Space size={40} wrap>
          <Space size={16}>
            <p className="name">Cholesterol:</p>
            <p className="line red-line" style={{ width: "50px" }}></p>
          </Space>
          <Space size={16}>
            <p className="name">HDL:</p>
            <p className="line purple-line" style={{ width: "50px" }}></p>
          </Space>
          <Space size={16}>
            <p className="name">LDL:</p>
            <p className="line green-line" style={{ width: "50px" }}></p>
          </Space>
          <Space size={16}>
            <p className="name">Triglyceride:</p>
            <p className="line orange-line" style={{ width: "50px" }}></p>
          </Space>
        </Space>
      </div>
    </div>
  );
};

export default LipidChart;
