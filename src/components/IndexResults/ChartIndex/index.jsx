import { DatePicker } from "antd";
import React from "react";
import BloodPressureChart from "../../charts/blood_pressure_chart";
import Icon_more_horizontal from "../../../assets/images/icon_more_horizontal.svg";
import "./style.scss";

const ChartIndex = () => {
  return (
    <div className="chart-index-container">
      <div className="chart-index-wrap">
        <div className="chart-index-header">
          <h4 className="chart-index-header__title">
            Tổng quan chỉ số huyết áp
          </h4>
          <div className="chart-index-header__times">
            <p>Chọn khoảng thời gian: </p>
            <DatePicker.RangePicker />
            <div className="more-horizontal">
              <img src={Icon_more_horizontal} alt="" />
            </div>
          </div>
        </div>
        <div className="chart">
          <BloodPressureChart />
        </div>
      </div>
    </div>
  );
};

export default ChartIndex;
