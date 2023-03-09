import { Col, Row, Typography } from "antd";
import React from "react";

const ColumnChartBMI = ({
  title,
  backgroundColor,
  color = "white",
  number,
}) => {
  return (
    <div>
      <Col
        style={{
          backgroundColor: backgroundColor,
          color: color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "160px",
          height: "50px    ",
          fontSize: "20px",
        }}
      >
        {title}
      </Col>
      <div style={{ paddingTop: 30, fontSize: 18 }}>{number}</div>
    </div>
  );
};

export default ColumnChartBMI;
