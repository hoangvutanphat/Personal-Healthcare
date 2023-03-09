import { Button, Col, Row, Form, Input, Image, Slider, Divider } from "antd";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { nutritionState } from "../../../recoil/atom/selfCheckState";

const Nutrition = ({ onKeyChange, setIsNutrition, setIsMotive }) => {
  const [valueWater, setValueWater] = useState(0);
  const [valueCereal, setValueCereal] = useState(0);
  const [valueVegetable, setValueVegetable] = useState(0);
  const [valueFruit, setValueFruit] = useState(0);
  const [valueFood, setValueFood] = useState(0);
  const [valueMilk, setValueMilk] = useState(0);
  const [valueLipid, setValueLipid] = useState(0);
  const [valueSugar, setValueSugar] = useState(0);
  const [valueSalt, setValueSalt] = useState(0);

  const [dataNutrition, setDataNutrition] = useRecoilState(nutritionState);

  const handleOk = () => {
    const newData = {
      VALUE_WATER: valueWater,
      VALUE_CEREAL: valueCereal,
      VALUE_VEGETALE: valueVegetable,
      VALUE_FRUIT: valueFruit,
      VALUE_FOOD: valueFood,
      VALUE_MILK: valueMilk,
      VALUE_LIPID: valueLipid,
      VALUE_SUGAR: valueSugar,
      VALUE_SALT: valueSalt,
    };
    setDataNutrition(newData);
    onKeyChange("2");
    setIsNutrition(false);
    setIsMotive(true);
  };
  const handleWater = (value) => {
    setValueWater(value);
  };
  const handleCereal = (value) => {
    setValueCereal(value);
  };
  const handleVegetable = (value) => {
    setValueVegetable(value);
  };
  const handleFruit = (value) => {
    setValueFruit(value);
  };
  const handleFoot = (value) => {
    setValueFood(value);
  };
  const handleMilk = (value) => {
    setValueMilk(value);
  };
  const handleLipid = (value) => {
    setValueLipid(value);
  };
  const handleSugar = (value) => {
    setValueSugar(value);
  };
  const handleSalt = (value) => {
    setValueSalt(value);
  };

  const marks = {
    0: "0",
    20: "20",
  };

  return (
    <>
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
              <p>1.Số ly nước trung bình bạn uống trong một ngày?</p>
              <Slider
                marks={marks}
                defaultValue={valueWater}
                onChange={handleWater}
                className="self-check-slider"
                max={20}
              />
              <a href="">{">>"} Hướng dẫn ước lượng</a>
            </Col>
            <Col span={1} offset={1} className="unit">
              đơn vị
            </Col>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://foodcity.vn/Uploads/Products/23062021/News/20623114224-granola%20200gr%20(1).jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>2.Lượng ngũ cốc trung bình bạn ăn trong 1 ngày?</p>
              <Slider
                className="self-check-slider"
                max={20}
                marks={marks}
                defaultValue={valueCereal}
                onChange={handleCereal}
              />
              <a href="">{">>"} Hướng dẫn ước lượng</a>
            </Col>
            <Col span={1} offset={1} className="unit">
              đơn vị
            </Col>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://vienthammykhothi.vn/wp-content/uploads/2021/03/giam-can-bang-rau-cu-qua-1-1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>3.Lượng rau củ bạn ăn trung bình trong một ngày?</p>
              <Slider
                className="self-check-slider"
                max={20}
                marks={marks}
                defaultValue={valueVegetable}
                onChange={handleVegetable}
              />
              <a href="">{">>"} Hướng dẫn ước lượng</a>
            </Col>
            <Col span={1} offset={1} className="unit">
              đơn vị
            </Col>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://www.cleanipedia.com/images/5iwkm8ckyw6v/32vtyi9FbBwvgr0mKZi4Ri/1b954bcd9d81a5f61330b4faccfea46c/YmFvLXF1YW4tdHJhaS1jYXktdHJvbmctdHUtbGFuaC10aGUtbmFvLWNoby1kdW5nLTEuanBn/760w-507h/c%C3%A1ch-b%E1%BA%A3o-qu%E1%BA%A3n-tr%C3%A1i-c%C3%A2y-kh%C3%B4ng-c%E1%BA%A7n-t%E1%BB%A7-l%E1%BA%A1nh.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>4.Lượng quả trung bình bạn ăn trong một ngày?</p>
              <Slider
                className="self-check-slider"
                max={20}
                marks={marks}
                defaultValue={valueFruit}
                onChange={handleFruit}
              />
              <a href="">{">>"} Hướng dẫn ước lượng</a>
            </Col>
            <Col span={1} offset={1} className="unit">
              đơn vị
            </Col>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://benhvienfavina.vn/wp-content/uploads/2022/03/an-gi-nhieu-dam-1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>
                5.Lượng thực phẩm chứa nhiều chất đạm như thịt/thủy
                sản/trứng/đậu đỗ trung bình bạn ăn trong 1 ngày?
              </p>
              <Slider
                className="self-check-slider"
                max={20}
                marks={marks}
                defaultValue={valueFood}
                onChange={handleFoot}
              />
              <a href="">{">>"} Hướng dẫn ước lượng</a>
            </Col>
            <Col span={1} offset={1} className="unit">
              đơn vị
            </Col>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://cdn.tgdd.vn//News/1478505//uong-sua-nong-hay-sua-lanh-loai-nao-tot-cho-suc-khoe-hon-9-845x500.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>
                6.Số ly sữa/chế phẩm sữa trung bình bạn uống/ăn trong 1 ngày?
              </p>
              <Slider
                className="self-check-slider"
                max={20}
                marks={marks}
                defaultValue={valueMilk}
                onChange={handleMilk}
              />
              <a href="">{">>"} Hướng dẫn ước lượng</a>
            </Col>
            <Col span={1} offset={1} className="unit">
              đơn vị
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
              <p>7.Lượng dầu mỡ bạn tiêu thụ trong 1 ngày?</p>
              <Slider
                className="self-check-slider"
                max={20}
                marks={marks}
                defaultValue={valueLipid}
                onChange={handleLipid}
              />
              <a href="">{">>"} Hướng dẫn ước lượng</a>
            </Col>
            <Col span={1} offset={1} className="unit">
              đơn vị
            </Col>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://soyte.namdinh.gov.vn/Uploads/2021/11/13/29/%C4%90%E1%BB%93-u%E1%BB%91ng-c%C3%B3-%C4%91%C6%B0%E1%BB%9Dng-l%C3%A0-t%C3%A1c-nh%C3%A2n-l%E1%BB%9Bn-nh%E1%BA%A5t-g%C3%A2y-ung-th%C6%B0.jpeg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>8.Số lượng đường trung bình bạn uống/ăn trong 1 ngày?</p>
              <Slider
                className="self-check-slider"
                max={20}
                marks={marks}
                defaultValue={valueSugar}
                onChange={handleSugar}
              />
              <a href="">{">>"} Hướng dẫn ước lượng</a>
            </Col>
            <Col span={1} offset={1} className="unit">
              đơn vị
            </Col>
          </Row>
          <Divider />
          <Row className="self-check-item">
            <Col span={4}>
              <Image
                width={150}
                src="https://vnn-imgs-f.vgcloud.vn/2019/10/13/00/mot-nam-muoi-gay-ra-9-loai-benh-nho-5-diem-an-muoi-tot-cho-suc-khoe-1.jpg"
                preview={false}
              />
            </Col>
            <Col span={18}>
              <p>9.Số lượng muối trung bình bạn ăn trong 1 ngày?</p>
              <Slider
                className="self-check-slider"
                max={20}
                marks={marks}
                defaultValue={valueSalt}
                onChange={handleSalt}
              />
              <a href="">{">>"} Hướng dẫn ước lượng</a>
            </Col>
            <Col span={1} offset={1} className="unit">
              đơn vị
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={2} push={22}>
              <Button onClick={handleOk} key="nutrition">
                Tiếp
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Nutrition;
