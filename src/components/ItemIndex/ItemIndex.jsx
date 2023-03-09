import React from "react";
import next_arrow from "../../assets/images/next_arrow.svg";
import ChartItem from "../charts/ChartItem/ChartItem";
import icon_gray_next from "../../assets/images/icon_grey_next.svg";
import Icon_infomation from "../../assets/images/icon_infomation.svg";
import "./style.scss";
import ToolTip from "../globals/Tooltip";
import { Space } from "antd";

const ItemIndex = ({
  name_index,
  tooltip,
  tooltip1,
  indexConten,
  value,
  value1,
  value2,
  value3,
  unit_index,
}) => {
  return (
    <div className="item-index-wrapper">
      <div className="item-index-container">
        <div className="item-index-container__title">
          <p className="item-index-container__title--index">Chỉ số</p>
          <Space>
            <p className="item-index-container__title--name">{name_index}</p>
            <ToolTip
              Icon_infomation={Icon_infomation}
              indexConten={indexConten}
              description={tooltip}
              description1={tooltip1}
            />
          </Space>
        </div>
        {value ? (
          <>
            <p className="item-index-container__unit">
              {value} <span>{unit_index}</span>
            </p>
            <p className="item-index-container__unit">{value1}</p>
            <p className="item-index-container__unit">{value2}</p>
            <p className="item-index-container__unit">{value3}</p>
          </>
        ) : (
          <p className="item-index-container__title--index">Không có dữ liệu</p>
        )}
        <a
          className="item-index-container__title--index"
          // style={{ position: "absolute", bottom: "10px" }}
        >
          Xem chi tiết{" "}
          <img src={icon_gray_next} alt="" style={{ marginLeft: 10 }} />
        </a>
        <div style={{ height: "48px" }}></div>

        {/* <div className="item-index-container__image"  style={{position: "absolute", bottom:"10px"}}>
          <img src={next_arrow} alt="" />
        </div> */}
      </div>
      {/* <div className="iten-chart-container">
        <ChartItem />
      </div> */}
    </div>
  );
};

export default ItemIndex;
