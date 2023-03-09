import { Line } from "@ant-design/plots";
import { Space } from "antd";
import React from "react";

const BloodPressureChart = ({ data }) => {
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
      if (name === "Tâm thu") {
        return "#4ad143";
      }
      return "#2f80ed";
    },
  };

  return (
    <div className="chart-wrapper">
      {data?.length > 0 ? (
        <Line {...config} />
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
            <p className="name">Tâm thu:</p>
            <p className="line green-line" style={{ width: "200px" }}></p>
          </Space>
          <Space size={16}>
            <p className="name">Tâm trương:</p>
            <p className="line blue-line" style={{ width: "200px" }}></p>
          </Space>
        </Space>
      </div>
    </div>
  );
};

export default BloodPressureChart;
