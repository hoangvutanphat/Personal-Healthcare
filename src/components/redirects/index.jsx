import React from "react";
import Icon_Back from "../../assets/images/icon_back.svg";
import { useHistory } from "react-router-dom";

import "./style.scss";
import { Space } from "antd/lib";

const Redirects = ({ content, path }) => {
  const history = useHistory();
  function handleClick() {
    history.push(path);
  }

  return (
    <Space className="redirect-wrapper" onClick={handleClick} size={16}>
      <img src={Icon_Back} alt="" />
      <p>Về trang "{content}"</p>
    </Space>
  );
};

export default Redirects;
