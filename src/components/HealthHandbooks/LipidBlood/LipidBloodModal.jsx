import React, { useEffect } from "react";
import { Button, Modal, Input, Form, DatePicker, Row, Col } from "antd";
import Icon_infomation from "../../../assets/images/icon_infomation.svg";
import "./style.scss";
import ToolTip from "../../globals/Tooltip";
import { dateFormat, disabledDate } from "../../../common";
import { useBloodLipid } from "../../../hooks/bloodLipid";
import { authState } from "../../../recoil/atom/authState";
import { useRecoilState, useRecoilValue } from "recoil";
import { SelfSpecialPhysicalExamByUserState } from "../../../recoil/atom/physicalExamState";
import preclinicalDetailApi from "../../../api/preclinicDetailApi";
import physicalExamApi from "../../../api/physicalExamApi";
import { useAuth } from "../../../hooks/auth";
import { selfSpecialPhycalExamByUserData } from "../../../common/getAllApi";

const validateMessages = {
  required: "Trường này không được để trống",
};

const LipidBloodModal = ({ isOpenModal, onCancel, title }) => {
  useAuth();
  const [form] = Form.useForm();
  const { createBloodLipid } = useBloodLipid();
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
      CHOLESTEROL_RESULT,
      HDL_RESULT,
      LDL_RESULT,
      TRIGLYCERIDE_RESULT,
    } = newData;
    if (
      MEDICAL_FACILITY_USER_INPUT === undefined ||
      MEDICAL_FACILITY_USER_INPUT === null ||
      EXAM_DATE === undefined ||
      EXAM_DATE === null ||
      CHOLESTEROL_RESULT === undefined ||
      CHOLESTEROL_RESULT === null ||
      HDL_RESULT === undefined ||
      HDL_RESULT === null ||
      LDL_RESULT === undefined ||
      LDL_RESULT === null ||
      TRIGLYCERIDE_RESULT === undefined ||
      TRIGLYCERIDE_RESULT === null ||
      MEDICAL_FACILITY_USER_INPUT.trim() === "" ||
      CHOLESTEROL_RESULT.trim() === "" ||
      HDL_RESULT.trim() === "" ||
      LDL_RESULT.trim() === "" ||
      TRIGLYCERIDE_RESULT.trim() === ""
    ) {
      return;
    }

    if (SelfSpecialPhysicalExamByUser?.id) {
      if (SelfSpecialPhysicalExamByUser?.Preclinical_Details[0]?.id) {
        handleCreateBloodLipid({
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
            handleCreateBloodLipid({
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
              handleCreateBloodLipid({
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
  const handleCreateBloodLipid = async (data) => {
    await createBloodLipid(data);
    handleCancel();
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <>
      <Modal
        width={550}
        title={title}
        visible={isOpenModal}
        onCancel={handleCancel}
        footer={false}
        className='modal-container'
      >
        <Form
          name="lipidBloods"
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
            {/* <div className="input-modal"> */}
            <Input placeholder="Nhập tên cơ sở khám..." />
            {/* </div> */}
          </Form.Item>
          <Form.Item
            label={
              <div className="form-label">
                <p>Thời gian xét nghiệm</p>
              </div>
            }
            name="EXAM_DATE"
          >
            {/* <div className="input-modal"> */}
            <DatePicker
              style={{ width: "100%" }}
              format={dateFormat}
              disabledDate={disabledDate}
            />
            {/* </div> */}
          </Form.Item>
          <Form.Item
            label={
              <div className="form-label">
                <p>Chỉ số Cholesterol</p>
                <ToolTip
                  Icon_infomation={Icon_infomation}
                  indexConten="Chỉ số Cholesterol"
                  description="Cholesterol là chất béo được tạo ra ở gan và có mặt trong mỗi tế bào của cơ thể. Cholesterol là một thành phần quan trọng và phục vụ nhiều quá trình chuyển hóa trong cơ thể, là thành phần tạo dựng một số hoóc-môn quan trọng."
                />
              </div>
            }
            name="CHOLESTEROL_RESULT"
          >
            {/* <div className="input-modal"> */}
            <Input placeholder="Nhập chỉ số..." />
            {/* </div> */}
          </Form.Item>
          <Form.Item
            label={
              <div className="form-label">
                <p>Chỉ số HDL</p>
                <ToolTip
                  Icon_infomation={Icon_infomation}
                  indexConten="Chỉ số HDL"
                  description="HDL-Cholesterol có chức năng quan trọng là vận chuyển cholesterol dư thừa từ các mô, cơ quan, mạch máu về gan để xử lý, tại gan các cholesterol sẽ được chuyển hóa và thải ra khỏi cơ thể, do đó HDL-Cholesterol làm giảm tích tụ cholesterol trong máu và trong các mô. Đây là lý do nó được gọi là mỡ tốt."
                />
              </div>
            }
            name="HDL_RESULT"
          >
            {/* <div className="input-modal"> */}
            <Input placeholder="Nhập chỉ số..." />
            {/* </div> */}
          </Form.Item>
          <Form.Item
            label={
              <div className="form-label">
                <p>Chỉ số LDL</p>
                <ToolTip
                  Icon_infomation={Icon_infomation}
                  indexConten="Chỉ số LDL"
                  description="LDL là “cholesterol xấu” bởi nó gây nên tình trạng vữa xơ động mạch, là nguyên nhân dẫn tới các bệnh lý đe dọa tính mạng như nhồi máu cơ tim hay đột quỵ."
                />
              </div>
            }
            name="LDL_RESULT"
          >
            {/* <div className="input-modal"> */}
            <Input placeholder="Nhập chỉ số..." />
            {/* </div> */}
          </Form.Item>
          <Form.Item
            label={
              <div className="form-label">
                <p>Chỉ số Triglyceride</p>
                <ToolTip
                  Icon_infomation={Icon_infomation}
                  indexConten="Chỉ số Triglyceride"
                  description="Triglyceride là một dạng chất béo mà cơ thể chúng ta vẫn tiêu thụ mỗi ngày. Triglyceride cũng là một trong những thành phần chủ yếu của mỡ động vật, thực vật. Sau khi cơ thể tiêu hóa Triglyceride sẽ được tiêu thụ dưới dạng năng lượng tế bào khi di chuyển trong mạch máu."
                  description1="Triglycerides chứa 3 axit béo. Sau khi được đưa vào cơ thể, Triglyceride sẽ được đưa đến phần ruột non sau đó phân tách ra và kết hợp với Cholesterol để tạo thành năng lượng."
                />
              </div>
            }
            name="TRIGLYCERIDE_RESULT"
          >
            {/* <div className="input-modal"> */}
            <Input placeholder="Nhập chỉ số..." />
            {/* </div> */}
          </Form.Item>
          <Row>
            <Col offset={9}>
              <Form.Item>
                <Button
                  form="lipidBloods"
                  key="lipidBloods"
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
export default LipidBloodModal;
