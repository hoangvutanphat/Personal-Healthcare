import React from "react";
import { Tooltip } from "antd";
import "./style.scss";
const ToolTip = ({
  Icon_infomation,
  indexConten,
  description,
  description1,
  description2,
}) => {
  return (
    <Tooltip
      title={
        <div className="tooltip-container">
          <h5>{indexConten}</h5>
          <p>{description}</p>
          {description1 && <p>{description1}</p>}
          {description2 && <p>{description2}</p>}
        </div>
      }
      placement="rightTop"
      color="white"
    >
      <img src={Icon_infomation} alt="" />
    </Tooltip>
  );
};

export default ToolTip;
