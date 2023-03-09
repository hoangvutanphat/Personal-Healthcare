import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Modal,
  Input,
  Form,
  DatePicker,
  Row,
  Col,
  InputNumber,
} from "antd";
import Icon_infomation from "../../../assets/images/icon_infomation.svg";
import "./bloodPressureModal.scss";
import ToolTip from "../../globals/Tooltip";
import { dateFormat, disabledDate } from "../../../common";
import { useRecoilState, useRecoilValue } from "recoil";
import { SelfSpecialPhysicalExamByUserState } from "../../../recoil/atom/physicalExamState";
import physicalDetailApi from "../../../api/physicalDetailApi";
import physicalExamApi from "../../../api/physicalExamApi";
import { authState } from "../../../recoil/atom/authState";
import { useBloodPressure } from "../../../hooks/bloodPressure";
import { isChangeState } from "../../../recoil/atom/healthIndexState";
import { selfSpecialPhycalExamByUserData } from "../../../common/getAllApi";

const validateMessages = {
  required: "Trường này không được để trống",
};

const BloodPressureModal = ({ isOpenModal, onCancel, title }) => {
  const [form] = Form.useForm();
  const { profile } = useRecoilValue(authState);
  const { createBloodPressure } = useBloodPressure();
  const [isChange, setIsChange] = useRecoilState(isChangeState);
  const typingTimeoutRef = useRef(null);
  const [diastole, setDiastole] = useState("");
  const [systolic, setSystolic] = useState("");

  const [SelfSpecialPhysicalExamByUser, setSelfSpecialPhysicalExamByUser] =
    useRecoilState(SelfSpecialPhysicalExamByUserState);

  useEffect(() => {
    selfSpecialPhycalExamByUserData(
      SelfSpecialPhysicalExamByUser,
      setSelfSpecialPhysicalExamByUser
    );
  }, []);

  const onFinish = async () => {
    const newData = {
      ...form.getFieldsValue(),
    };
    const { EXAM_DATE, MEDICAL_FACILITY_USER_INPUT, SYSTOLIC, DIASTOLE } =
      newData;

    if (
      MEDICAL_FACILITY_USER_INPUT === undefined ||
      MEDICAL_FACILITY_USER_INPUT === null ||
      EXAM_DATE === undefined ||
      EXAM_DATE === null ||
      DIASTOLE === undefined ||
      DIASTOLE === null ||
      SYSTOLIC === undefined ||
      SYSTOLIC === null ||
      MEDICAL_FACILITY_USER_INPUT.trim() === ""
    ) {
      return;
    }
    const newValue = {
      EXAM_DATE: newData?.EXAM_DATE,
      TYPE: isChange === true ? 2 : 1,
      VALUE: newData?.SYSTOLIC + "/" + newData?.DIASTOLE,
    };

    if (SelfSpecialPhysicalExamByUser?.id) {
      if (SelfSpecialPhysicalExamByUser?.Physical_Details[0]?.id) {
        handleCreateBloodePressure({
          ...newValue,
          PHYSICAL_DETAIL_ID:
            SelfSpecialPhysicalExamByUser?.Physical_Details[0]?.id,
        });
      } else {
        const data = {
          PHYSICAL_EXAM_ID: SelfSpecialPhysicalExamByUser?.id,
        };
        try {
          let res = await physicalDetailApi.createPhysicalDetail(data);
          if (res.data) {
            handleCreateBloodePressure({
              ...newValue,
              PHYSICAL_DETAIL_ID: res?.data?.elements?.id,
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
            let physicalDetail = await physicalDetailApi.createPhysicalDetail(
              preData
            );
            if (physicalDetail.data) {
              handleCreateBloodePressure({
                ...newValue,
                PHYSICAL_DETAIL_ID: physicalDetail?.data?.elements?.id,
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

  const handleCreateBloodePressure = async (data) => {
    handleCancel();
    await createBloodPressure(data);
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const handleValueSystolic = (value) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setSystolic(value);
    }, 500);
  };

  const handleValueDiastole = (value) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setDiastole(value);
    }, 500);
  };

  return (
    <>
      <Modal
        title={title}
        visible={isOpenModal}
        onCancel={handleCancel}
        footer={false}
        className='modal-container'
      >
        <Form
          name="bloodepressure"
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
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Nhập tên cơ sở khám ..." />
          </Form.Item>
          <Form.Item
            label={
              <div className="form-label">
                <p>Thời gian đo</p>
              </div>
            }
            name="EXAM_DATE"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format={dateFormat}
              disabledDate={disabledDate}
              placeholder="Nhập thời gian đo ..."
            />
          </Form.Item>
          <Form.Item
            label={
              <div className="form-label">
                <p>Chỉ số tâm thu</p>
                <ToolTip
                  Icon_infomation={Icon_infomation}
                  indexConten="Chỉ số tâm thu"
                  description="Huyết áp tâm thu là áp lực của máu lên động mạch khi tim co bóp. Con số này luôn được quan tâm hơn cả, vì thể hiện được khả năng bơm máu của tim cung cấp đến các cơ quan."
                />
              </div>
            }
            name="SYSTOLIC"
            rules={[
              {
                required: true,
              },
              {
                pattern: new RegExp(/^[0-9]+$/),
                message: "Giá trị phải là số nguyên",
              },
              {
                type: "number",
                min: 40,
                max: 200,
                message: "Chỉ số tâm thu nằm trong khoảng ${min} - ${max}",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              controls={false}
              onChange={handleValueSystolic}
              placeholder="Nhập chỉ số tâm thu ..."
            />
          </Form.Item>
          <Form.Item
            label={
              <div className="form-label">
                <p>Chỉ số tâm trương</p>
                <ToolTip
                  Icon_infomation={Icon_infomation}
                  indexConten="Chỉ số tâm trương"
                  description="Huyết áp tâm trương là áp lực máu lên thành động mạch khi tim giãn ra. Không được như huyết áp tâm thu, con số này thường ít được chú ý đến, do chỉ phản ánh khả năng đàn hồi của thành mạch mà yếu tố này thì khó có thể thay đổi được."
                />
              </div>
            }
            name="DIASTOLE"
            rules={[
              {
                required: true,
              },
              {
                pattern: new RegExp(/^[0-9]+$/),
                message: "Giá trị phải là số nguyên",
              },
              {
                type: "number",
                min: 60,
                max: systolic - 1,
                message:
                  "Chỉ số tâm trương phải nhỏ hơn tâm thu,và lớn hơn ${min} ",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              controls={false}
              onChange={handleValueDiastole}
              placeholder="Nhập chỉ số tâm trương ..."
            />
          </Form.Item>
          <Row>
            <Col offset={9}>
              <Form.Item>
                <Button
                  form="bloodepressure"
                  key="bloodepressure"
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
export default BloodPressureModal;
