import { Space } from "antd/lib";
import React from "react";
import "./style.scss";

const LargeButton = ({ content, icon, onClick, active, icon1 }) => {
  return (
    <Space
      className={active ? "select-btn active" : "select-btn"}
      onClick={onClick}
      size={16}
    >
      <div className="img">
        <img src={active ? icon1 : icon} alt="" width="20" />
      </div>
      <p>{content}</p>
    </Space>
  );
};

export default LargeButton;
