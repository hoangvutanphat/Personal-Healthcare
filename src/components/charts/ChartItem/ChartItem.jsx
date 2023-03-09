import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Area } from "@ant-design/plots";

const data = [
  {
    Date: "2010-01",
    scales: 1998,
  },
  {
    Date: "2010-02",
    scales: 1850,
  },
  {
    Date: "2010-03",
    scales: 1720,
  },
  {
    Date: "2010-04",
    scales: 1818,
  },
  {
    Date: "2010-05",
    scales: 1920,
  },
  {
    Date: "2010-06",
    scales: 1802,
  },
  {
    Date: "2010-07",
    scales: 1945,
  },
  {
    Date: "2010-08",
    scales: 1856,
  },
  {
    Date: "2010-09",
    scales: 2107,
  },
  {
    Date: "2010-10",
    scales: 2140,
  },
  {
    Date: "2010-11",
    scales: 2311,
  },
  {
    Date: "2010-12",
    scales: 1972,
  },
  {
    Date: "2011-01",
    scales: 1760,
  },
  {
    Date: "2011-02",
    scales: 1824,
  },
  {
    Date: "2011-03",
    scales: 1801,
  },
  {
    Date: "2011-04",
    scales: 2001,
  },
  {
    Date: "2011-05",
    scales: 1640,
  },
];

const ChartItem = () => {
  const config = {
    data,
    xField: "Date",
    yField: "scales",
    xAxis: false,
    yAxis: false,
    smooth: true,
    color: "#FF7A2F",
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff  1:#ed8636",
      };
    },
    tooltip: {
      position: "left",
    },
    title: false,
    // xAxis: {
    //     range: [0, 1],
    //     tickCount: 5,
    //   },
  };

  return <Area {...config} />;
};

export default ChartItem;
