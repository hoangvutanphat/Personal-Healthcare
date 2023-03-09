import React, { useState } from "react";
import { Button, Col, Divider, Image, Radio, Row, Slider } from "antd";
import { otherHabitState } from "../../../recoil/atom/selfCheckState";
import { useRecoilState } from "recoil";

const marks = {
  0: "0",
  100: {
    label: <strong>100</strong>,
  },
};

const OtherHabits = ({
  onKeyChange,
  setIsResult,
  setIsOtherHabits,
  setIsMotive,
}) => {
  const [dataOtherHabits, setDataOtherHabits] = useRecoilState(otherHabitState);
  const [valueBreakfast, setValueBreakfast] = useState(1);
  const [valueDistance, setValueDistance] = useState(0);
  const [valueDinner, setValueDinner] = useState(0);
  const [valueAncol, setValueAncol] = useState(2);
  const [valueCigarette, setValueCigarette] = useState(2);
  const [valueSleep, setValueSleep] = useState(0);
  const handleOk = () => {
    const newData = {
      VALUE_BREAKFAST: valueBreakfast,
      VALUE_DISTANCE: valueDistance,
      VALUE_DINNER: valueDinner,
      VALUE_ANCOL: valueAncol,
      VALUE_CIGARETTE: valueCigarette,
      VALUE_SLEEP: valueSleep,
    };
    setDataOtherHabits(newData);
    onKeyChange("4");
    setIsResult(true);
    setIsOtherHabits(false);
  };
  const handleBack = () => {
    onKeyChange("2");
    setIsOtherHabits(false);
    setIsMotive(true);
  };

  const handleChangeBreakfast = (e) => {
    setValueBreakfast(e.target.value);
  };

  const handleDistance = (value) => {
    setValueDistance(value);
  };

  const handleDinner = (value) => {
    setValueDinner(value);
  };
  const handleAncol = (e) => {
    setValueAncol(e.target.value);
  };
  const handleCigarette = (e) => {
    setValueCigarette(e.target.value);
  };
  const handleSleep = (value) => {
    setValueSleep(value);
  };

  return (
    <div>
      <Row justify="center" gutter={[0, 24]}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }}>
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://doctornuoc.vn/wp-content/uploads/2020/05/nuoc-dien-giai-H1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>1.Bạn có thường ăn bữa sáng không? </p>
              <div>
                <Radio.Group
                  onChange={handleChangeBreakfast}
                  value={valueBreakfast}
                  className="self-check-slider"
                >
                  <Radio value={1}>Có</Radio>
                  <Radio value={2}>Không</Radio>
                </Radio.Group>
              </div>
              <a href="">{">>"} Hướng dẫn ước lượng</a>
            </Col>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://doctornuoc.vn/wp-content/uploads/2020/05/nuoc-dien-giai-H1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>
                2.Khoảng cách trung bình giữa các bữa sáng, trưa, tối trong một
                ngày của bạn là bao nhiêu?{" "}
              </p>
              <Slider
                className="self-check-slider"
                marks={marks}
                defaultValue={valueDistance}
                onChange={handleDistance}
              />
              <a href="">{">>"} Hướng dẫn ước lượng</a>
            </Col>
            <Col span={1} offset={1} className="unit">
              phút
            </Col>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://doctornuoc.vn/wp-content/uploads/2020/05/nuoc-dien-giai-H1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>3. Bạn thường ăn tối trước khi đi ngủ bao lâu? </p>
              <Slider
                className="self-check-slider"
                marks={marks}
                defaultValue={valueDinner}
                onChange={handleDinner}
              />
              <a href="">{">>"} Hướng dẫn ước lượng</a>
            </Col>
            <Col span={1} offset={1} className="unit">
              phút
            </Col>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://doctornuoc.vn/wp-content/uploads/2020/05/nuoc-dien-giai-H1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>4. Bạn có thường xuyên sử dụng các đồng uống có cồn không? </p>
              <div>
                <Radio.Group
                  className="self-check-slider"
                  onChange={handleAncol}
                  value={valueAncol}
                >
                  <Radio value={1}>Có</Radio>
                  <Radio value={2}>Không</Radio>
                </Radio.Group>
              </div>
              <a href="">{">>"} Hướng dẫn ước lượng</a>
            </Col>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://doctornuoc.vn/wp-content/uploads/2020/05/nuoc-dien-giai-H1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>5. Bạn có hút thuốc lá không? </p>
              <div>
                <Radio.Group
                  className="self-check-slider"
                  onChange={handleCigarette}
                  value={valueCigarette}
                >
                  <Radio value={1}>Có</Radio>
                  <Radio value={2}>Không</Radio>
                </Radio.Group>
              </div>
              <a href="">{">>"} Hướng dẫn ước lượng</a>
            </Col>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://doctornuoc.vn/wp-content/uploads/2020/05/nuoc-dien-giai-H1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>6. Bạn dành bao nhiêu tiếng để ngủ trong một ngày? </p>
              <Slider
                className="self-check-slider"
                marks={marks}
                defaultValue={valueSleep}
                onChange={handleSleep}
              />
              <a href="">{">>"} Hướng dẫn ước lượng</a>
            </Col>
            <Col span={1} offset={1} className="unit">
              tiếng
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={2} push={10}>
              <Button onClick={handleOk}>Xem kết quả</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="start">
        <Col>
          <Button onClick={handleBack}>Quay lại</Button>
        </Col>
      </Row>
    </div>
  );
};

export default OtherHabits;
