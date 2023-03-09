import { Button, Col, Row, Image, Slider, Divider } from "antd";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { motiveState } from "../../../recoil/atom/selfCheckState";

const marks = {
  0: "0",
  100: {
    label: <strong>100</strong>,
  },
};

const Motive = ({
  onKeyChange,
  setIsOtherHabits,
  setIsMotive,
  setIsNutrition,
}) => {
  const [valueStrength, setValueStrength] = useState(0);
  const [dataMotive, setDataMotive] = useRecoilState(motiveState);

  const handleNext = () => {
    const newData = { VALUE_STRENGTH: valueStrength };
    setDataMotive(newData);
    onKeyChange("3");
    setIsOtherHabits(true);
    setIsMotive(false);
  };
  const handleBack = () => {
    onKeyChange("1");
    setIsMotive(false);
    setIsNutrition(true);
  };

  const handleStrength = (value) => {
    setValueStrength(value);
  };
  return (
    <div>
      <Row justify="center" gutter={[0, 24]}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://nubesttall.vn/public/upload/motasanpham/images/vi-sao-van-dong-anh-huong-den-chieu-cao-hinh1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>
                1.Bạn dành bao nhiêu thời gian cho các hoạt động thể lực cường
                độ vừa trong một ngày?{" "}
              </p>
              <Slider
                marks={marks}
                defaultValue={valueStrength}
                onChange={handleStrength}
                className="self-check-slider"
              />
              <a href="">{">>"} Hướng dẫn ước lượng</a>
            </Col>
            <Col span={1} offset={1} className="unit">
              đơn vị
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={2}>
              <Button onClick={handleBack}>Quay lại</Button>
            </Col>
            <Col span={2} push={20}>
              <Button onClick={handleNext} key="nutrition">
                Tiếp
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Motive;
