import { Line, Area } from "@ant-design/plots";
import { Space } from "antd";
import React from "react";
import moment from "moment";

const LiverEnzymeChart = ({ data }) => {
  const config = {
    data,
    xField: "date",
    yField: "index",
    seriesField: "name",
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
      if (name === "ALT/SGPT") {
        return "#4ad143";
      }
      return "#2f80ed";
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
            <p className="name">ALT/SGPT:</p>
            <p className="line green-line" style={{ width: "200px" }}></p>
          </Space>
          <Space size={16}>
            <p className="name">AST/SGOT:</p>
            <p className="line blue-line" style={{ width: "200px" }}></p>
          </Space>
        </Space>
      </div>
    </div>
  );
};

export default LiverEnzymeChart;
