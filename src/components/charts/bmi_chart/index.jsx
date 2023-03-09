import { Space } from "antd";
import React from "react";
import { memo } from "react";
import { Line } from "@ant-design/plots";

const BMIChart = ({ data }) => {
  const config = {
    data,
    padding: "auto",
    xField: "date",
    yField: "index",
    seriesField: "name",
    yAxis: {
      label: {
        formatter: (v) => v,
      },
      tickCount: 10,
    },
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
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
    color: "white",
    colorField: "name",
    annotations: [
      {
        type: "region",
        start: ["min", 0],
        end: ["max", 18.4],
        style: {
          fill: "#70ad47",
          fillOpacity: 1,
          opacity: 1,
        },
      },
      {
        type: "region",
        start: ["min", 18.5],
        end: ["max", 22.9],
        style: {
          fill: "#b9d034",
          fillOpacity: 1,
          opacity: 1,
        },
      },
      {
        type: "region",
        start: ["min", 23],
        end: ["max", 24.9],
        style: {
          fill: "yellow",
          fillOpacity: 1,
          opacity: 1,
        },
      },
      {
        type: "region",
        start: ["min", 25],
        end: ["max", 29.9],
        style: {
          fill: "#ed7d31",
          fillOpacity: 1,
          opacity: 1,
        },
      },
      {
        type: "region",
        start: ["min", 30],
        end: ["max", 100],
        style: {
          fill: "red",
          fillOpacity: 1,
          opacity: 1,
        },
      },
    ],
  };

  return (
    <>
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
    </>
  );
};

export default memo(BMIChart);
