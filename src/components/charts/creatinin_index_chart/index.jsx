import React, { memo } from "react";
import { Line } from "@ant-design/plots";
import { Space } from "antd";

const CreatininIndexChart = ({ creatineList, chartColor, isLoading }) => {
  const config = {
    data: creatineList,
    seriesField: "name",
    padding: "auto",
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
    color: ({ name }) => {
      if (name === "Min") {
        return chartColor.min;
      } else if (name === "Max") {
        return chartColor.max;
      }
      return chartColor.blue;
    },
  };

  return (
    <div className="chart-wrapper">
      {creatineList?.length > 0 ? (
        <Line {...config} loading={isLoading} />
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
            <p className="name">Creatinin:</p>
            <p
              className="line"
              style={{ width: "50px", backgroundColor: chartColor.blue }}
            ></p>
          </Space>
        </Space>
      </div>
    </div>
  );
};

export default memo(CreatininIndexChart);
