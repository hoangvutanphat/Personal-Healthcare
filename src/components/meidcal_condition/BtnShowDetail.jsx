import { Space } from "antd";
import React from "react";

const BtnShowDetail = ({ icon_arrow }) => {
  return (
    <div className="btn-show-details">
      <span>Xem chi tiết</span>
      <span>
        <img src={icon_arrow} alt="" style={{ width: 12 }} />
      </span>
    </div>
  );
};

export default BtnShowDetail;
