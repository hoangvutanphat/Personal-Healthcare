import React, { useEffect } from "react";
import { Button, Modal, Input, Form, DatePicker, Row, Col } from "antd";
import Icon_infomation from "../../../assets/images/icon_infomation.svg";
import ToolTip from "../../globals/Tooltip";
import { dateFormat, disabledDate } from "../../../common";
import { useAuth } from "../../../hooks/auth";
import { SelfSpecialPhysicalExamByUserState } from "../../../recoil/atom/physicalExamState";
import { useRecoilState, useRecoilValue } from "recoil";
import preclinicalDetailApi from "../../../api/preclinicDetailApi";
import physicalExamApi from "../../../api/physicalExamApi";
import { authState } from "../../../recoil/atom/authState";
import { useGlucose } from "../../../hooks/glucose";
import { selfSpecialPhycalExamByUserData } from "../../../common/getAllApi";

const validateMessages = {
  required: "Trường này không được để trống",
};

const GlycemicModal = ({ isOpenModal, onCancel, title }) => {
  useAuth();
  const [form] = Form.useForm();
  const { createGlucose } = useGlucose();
  const { profile } = useRecoilValue(authState);

  const [SelfSpecialPhysicalExamByUser, setSelfSpecialPhysicalExamByUser] =
    useRecoilState(SelfSpecialPhysicalExamByUserState);

  useEffect(() => {
    selfSpecialPhycalExamByUserData(
      SelfSpecialPhysicalExamByUser,
      setSelfSpecialPhysicalExamByUser
    );
  }, []);

  const onFinish = async () => {
    const newData = { ...form.getFieldValue() };
    const {
      MEDICAL_FACILITY_USER_INPUT,
      EXAM_DATE,
      GLUCOSE_1,
      GLUCOSE_2,
      GLUCOSE_3,
      GLUCOSE_HUNGRY,
      HBAC1,
    } = newData;
    if (
      MEDICAL_FACILITY_USER_INPUT === undefined ||
      MEDICAL_FACILITY_USER_INPUT === null ||
      EXAM_DATE === undefined ||
      EXAM_DATE === null ||
      GLUCOSE_1 === undefined ||
      GLUCOSE_1 === null ||
      GLUCOSE_2 === undefined ||
      GLUCOSE_2 === null ||
      GLUCOSE_3 === undefined ||
      GLUCOSE_3 === null ||
      GLUCOSE_HUNGRY === undefined ||
      GLUCOSE_HUNGRY === null ||
      HBAC1 === undefined ||
      HBAC1 === null ||
      GLUCOSE_1.trim() === "" ||
      GLUCOSE_3.trim() === "" ||
      GLUCOSE_2.trim() === "" ||
      GLUCOSE_HUNGRY.trim() === "" ||
      MEDICAL_FACILITY_USER_INPUT.trim() === "" ||
      HBAC1.trim() === ""
    ) {
      return;
    }

    if (SelfSpecialPhysicalExamByUser?.id) {
      if (SelfSpecialPhysicalExamByUser?.Preclinical_Details[0]?.id) {
        handleCreateGlycemic({
          ...newData,
          PRECLINICAL_DETAIL_ID:
            SelfSpecialPhysicalExamByUser?.Preclinical_Details[0]?.id,
        });
      } else {
        const data = {
          PHYSICAL_EXAM_ID: SelfSpecialPhysicalExamByUser?.id,
        };
        try {
          let res = await preclinicalDetailApi.createPreclinicalDetail(data);
          if (res.data) {
            handleCreateGlycemic({
              ...newData,
              PRECLINICAL_DETAIL_ID: res?.data?.elements?.id,
            });
          }
        } catch (error) {
          console.log("error");
        }
      }
    } else {
      try {
        const data = {
          USER_ID: profile?.id,
          TYPE: 8,
          INPUT_STATUS: 1,
        };
        let physicalExam = await physicalExamApi.createPhysicalExam(data);
        if (physicalExam.data) {
          try {
            const preData = {
              PHYSICAL_EXAM_ID: physicalExam?.data?.elements?.id,
            };
            let preClinical =
              await preclinicalDetailApi.createPreclinicalDetail(preData);
            if (preClinical.data) {
              handleCreateGlycemic({
                ...newData,
                PRECLINICAL_DETAIL_ID: preClinical?.data?.elements?.id,
              });
            }
          } catch (error) {
            console.log("error");
          }
        }
      } catch (error) {
        console.log("error");
      }
    }
  };
  const handleCreateGlycemic = async (data) => {
    await createGlucose(data);
    handleCancel();
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <>
      <Modal
        title={title}
        visible={isOpenModal}
        onCancel={handleCancel}
        footer={false}
        style={{ top: 30 }}
        width={700}
      >
        <Form
          name="glycemic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
          validateMessages={validateMessages}
          onFinish={onFinish}
        >
          <Form.Item
            label={
              <div className="form-label">
                <p>Cơ sở khám</p>
              </div>
            }
            name="MEDICAL_FACILITY_USER_INPUT"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <div className="form-label">
                <p>Thời gian khám</p>
              </div>
            }
            name="EXAM_DATE"
          >
            <DatePicker
              style={{ width: "100%" }}
              format={dateFormat}
              disabledDate={disabledDate}
            />
          </Form.Item>
          {/* <Form.Item
            label={
              <div className="form-label">
                <p>Giới tính</p>
              </div>
            }
            name="GENDER"
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            label={
              <div className="form-label">
                <p>Chỉ số KQ nghiệm pháp dung nạp Glucose lần 1</p>
                <ToolTip
                  Icon_infomation={Icon_infomation}
                  indexConten="Dung nạp Glucose"
                  description="Nghiệm pháp dung nạp glucose là phương pháp dùng để chẩn đoán đái tháo đường, đặc biệt là đối với phụ nữ mang thai. Giúp phát hiện sớm tiểu đường thai kỳ, tránh những biến chứng ảnh hưởng đến mẹ và bé có thể xảy ra."
                />
              </div>
            }
            name="GLUCOSE_1"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <div className="form-label">
                <p>Chỉ số KQ nghiệm pháp dung nạp Glucose lần 2</p>
                <ToolTip
                  Icon_infomation={Icon_infomation}
                  indexConten="Dung nạp Glucose"
                  description="Nghiệm pháp dung nạp glucose là phương pháp dùng để chẩn đoán đái tháo đường, đặc biệt là đối với phụ nữ mang thai. Giúp phát hiện sớm tiểu đường thai kỳ, tránh những biến chứng ảnh hưởng đến mẹ và bé có thể xảy ra."
                />
              </div>
            }
            name="GLUCOSE_2"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <div className="form-label">
                <p>Chỉ số KQ nghiệm pháp dung nạp Glucose lần 3</p>
                <ToolTip
                  Icon_infomation={Icon_infomation}
                  indexConten="Dung nạp Glucose"
                  description="Nghiệm pháp dung nạp glucose là phương pháp dùng để chẩn đoán đái tháo đường, đặc biệt là đối với phụ nữ mang thai. Giúp phát hiện sớm tiểu đường thai kỳ, tránh những biến chứng ảnh hưởng đến mẹ và bé có thể xảy ra."
                />
              </div>
            }
            name="GLUCOSE_3"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <div className="form-label">
                <p>Chỉ số Glucose lúc đói</p>
                <ToolTip
                  Icon_infomation={Icon_infomation}
                  indexConten="Chỉ số Glucose đói"
                  description="Đường huyết đói là chỉ số đường huyết được đo lần đầu vào buổi sáng nhịn ăn ít nhất 8h trở nên lúc đó bạn chưa ăn hay uống bất kỳ loại thực phẩm nào. Chỉ số đường huyết lúc đói ở khoảng giữa 3.9 mmol/l đến 5.5 mmol/l là bình thường."
                />
              </div>
            }
            name="GLUCOSE_HUNGRY"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={
              <div className="form-label">
                <p>Chỉ số HbA1c</p>
                <ToolTip
                  Icon_infomation={Icon_infomation}
                  indexConten="Chỉ số HbA1c"
                  description="HbA1c là một loại hemoglobin đặc biệt kết hợp giữa hemoglobin và đường glucose, nó đại diện cho tình trạng gắn kết của đường trên Hb hồng cầu. HbA1c tồn tại trong hồng cầu, có chức năng vận chuyển oxy và glucose đi nuôi cơ thể."
                />
              </div>
            }
            name="HBAC1"
          >
            <Input />
          </Form.Item>
          <Row>
            <Col offset={9}>
              <Form.Item>
                <Button
                  form="glycemic"
                  key="glycemic"
                  htmlType="submit"
                  className="btn-update-index"
                >
                  Cập nhật
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default GlycemicModal;
