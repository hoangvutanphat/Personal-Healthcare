import React from "react";
import LabelTitleBottom from "../../LabelTitles/LabelTitleBottom";
import icon_arrowNext from "../../../assets/images/arrowNext.svg";
import icon_food from "../../../assets/images/icon_food.svg";
import icon_user from "../../../assets/images/icon_user.svg";
import icon_health from "../../../assets/images/icon_health.svg";
import { Radio, Form, Select, Input } from "antd";

const NutritionMenu = () => {
  const [form] = Form.useForm();

  const handleGetValue = () => {
    const newData = { ...form.getFieldsValue() };
    console.log(newData);
  };
  return (
    <div className="container">
      <div className="nutrition-menu-wrapper">
        <div className="nutrition-menu">
          <div className="nutrition-menu__title">
            <h1>Thực đơn cân bằng dinh dưỡng</h1>
            <p>
              Tự tạo thực đơn dinh dưỡng phù hợp với tình trạng bệnh lý hiện tại
              của bạn.
            </p>
          </div>
          <div className="nutrition-menu__checkbox1">
            <div className="block1">
              <div className="block1__Icon">
                <img src={icon_food} alt="" />
              </div>
              <div className="block1__choose">
                <p>1. Bạn đã ăn sáng chưa?</p>
                <div className="form-1">
                  <Form name="normal_login" className="login-form">
                    <Form.Item name="AN_SANG">
                      <Radio.Group style={{ width: "100%" }}>
                        <div className="form-1__radio">
                          <Radio value="1">
                            {" "}
                            <span>Tôi chưa ăn bữa nào</span>{" "}
                          </Radio>
                          <div className="form-1__radio--line"></div>
                          <Radio value="2">
                            {" "}
                            <span>Tôi đã ăn một vài bữa</span>{" "}
                          </Radio>
                          <div className="form-1__radio--line"></div>
                          <Radio value="3">
                            {" "}
                            <span>Tôi muốn chọn món ăn phù hơp</span>{" "}
                          </Radio>
                        </div>
                      </Radio.Group>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
            <div className="block2">
              <div className="block2__Icon">
                <img src={icon_user} alt="" />
              </div>
              <div className="block2__choose">
                <p>2. Độ tuổi của bạn</p>
                <div className="form-1">
                  <Form name="normal_login" className="login-form" form={form}>
                    <Form.Item name="AGE">
                      <Radio.Group style={{ width: "100%" }}>
                        <div className="form-1__radio">
                          <Radio value="4">
                            {" "}
                            <span>20 - 29</span>{" "}
                          </Radio>
                          <div className="form-1__radio--line"></div>
                          <Radio value="5">
                            {" "}
                            <span>30 - 60</span>{" "}
                          </Radio>
                        </div>
                      </Radio.Group>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
          <div className="nutrition-menu__checkbox2">
            <div className="nutrition-menu__checkbox2--Icon">
              <img src={icon_health} alt="" />
            </div>
            <div className="block3">
              <p>3. Tình trạng bệnh lý cá nhân</p>
              <div className="form-1">
                <Form name="form-block3" className="login-form" form={form}>
                  <Form.Item name="VALUE_PATHOLOGICAL">
                    <Radio.Group style={{ width: "100%" }}>
                      <div className="form-1__radio">
                        <Radio value="4">
                          {" "}
                          <span>Tôi không có bệnh lý</span>{" "}
                        </Radio>
                        <div className="form-1__radio--line"></div>
                        <Radio value="5">
                          {" "}
                          <span>Tôi đang có bệnh lý</span>{" "}
                        </Radio>
                      </div>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    name="pathological"
                    label="Vui lòng chọn bệnh lý của bạn"
                  >
                    <Select
                      //   onChange={onGenderChange}
                      allowClear
                    >
                      <Select.Option value="1">Bệnh mỡ trong máu</Select.Option>
                      <Select.Option value="2">Bệnh thận</Select.Option>
                      <Select.Option value="3">Bệnh gan</Select.Option>
                    </Select>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div className="find-menu" onClick={() => handleGetValue()}>
          <LabelTitleBottom
            content="Tìm thực đơn phù hợp"
            Icon_arrow={icon_arrowNext}
          />
        </div>
      </div>
    </div>
  );
};

export default NutritionMenu;
