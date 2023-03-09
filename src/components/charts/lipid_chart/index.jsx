import React from "react";
import { RightOutlined } from "@ant-design/icons";
import ChartOverview from "./ChartDemo/ChartOverview";
import healthGood from "../../../assets/images/heathGood.svg";

const Chart = () => {
  return (
    <div className="chart-container">
      <div className="label-top">
        <p className="label-top__title">
          Tổng quan tình trạng:{" "}
          <span className="label-top__title--span">
            Mỡ trong máu <RightOutlined style={{ marginLeft: 10 }} />
          </span>
        </p>
        <div className="label-top__result">
          <img src={healthGood} alt="" />
          <p>Sức khỏe tốt</p>
        </div>
      </div>
      <ChartOverview />
    </div>
  );
};

export default Chart;
