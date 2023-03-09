import { Col, Row, Image, Slider } from "antd";
import React from "react";

const marks = {
  0: "0",
  26: "26",
  37: "37",
  100: {
    label: <strong>100</strong>,
  },
};

const SelftCheckItem = ({ title, unit, img }) => {
  return (
    <Row justify="center">
      <Col span={4}>
        <Image width={150} src={img} preview={false} />
      </Col>
      <Col span={18}>
        <p>{title}</p>
        <Slider marks={marks} defaultValue={37} />
        <a href="">{">>"} Hướng dẫn ước lượng</a>
      </Col>
      <Col span={2}>{unit}</Col>
    </Row>
  );
};

export default SelftCheckItem;
