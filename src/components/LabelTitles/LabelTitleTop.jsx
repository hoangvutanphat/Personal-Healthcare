import { Row, Col, Image, Space } from "antd";
import React from "react";

const Title = ({ content, Icon }) => {
  return (
    <div className="title-top-container">
      <Image width={24} height={23} src={Icon} preview={false} />
      <p>{content}</p>
    </div>
  );
};

export default Title;
