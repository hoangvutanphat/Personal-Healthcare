import { Button, Col, DatePicker, Form, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import ItemList from "../ItemList";
import "./style.scss";
import itemHardToxicBackground from "../../../../assets/images/itemHardToxicBackground.svg";
import { useRecoilValue } from "recoil";
import { useMedicalFacility } from "../../../../hooks/medicalFacility";
import { medicalFacilityOptionsState } from "../../../../recoil/atom/medicalFacilityState";

const ListResult = ({ physicalExam }) => {
  const medicalFacilityOptions = useRecoilValue(medicalFacilityOptionsState);
  const checkFilterList = (a, b) => {
    return a ? a : b;
  };
  useMedicalFacility();

  const [form] = Form.useForm();
  const [dataToxic, setDataToxic] = useState();
  const [fillter, setFillterOption] = useState();
  useEffect(() => {
    if (physicalExam) {
      setDataToxic(physicalExam);
    }
  }, [physicalExam, fillter]);
  const handleOk = () => {
    const newData = { ...form.getFieldValue() };
    setFillterOption(newData);
    console.log("object", newData);
  };
  useEffect(() => {
    let data = undefined;
    if (fillter?.FACILITY) {
      let tempDatas = [];
      checkFilterList(data, dataToxic).forEach((item, index) => {
        const dataOfList = item?.Medical_Facility?.id;
        const keyWord = fillter?.FACILITY;
        const isMatching = dataOfList === keyWord;
        if (isMatching) {
          tempDatas.push(item);
        }
      });
      setDataToxic(tempDatas);
    }
  }, [fillter]);
  return (
    <div className="wrapper-list">
      <div className="wrapper-list-title">
        <h1>Danh sách các kết quả khám sức khỏe</h1>
      </div>
      <div className="wrapper-list-fillter">
        <Form form={form} layout="vertical" className="form" name="hardToxic">
          <Row>
            <div className="title-h6">
              <h6>Bộ lọc từ kết quả</h6>
            </div>
          </Row>
          <Row style={{ paddingTop: "16px" }} className="row2">
            <Col span={6}>
              <Form.Item
                name="START_DAY"
                style={{ width: "100%" }}
                label="Từ ngày"
                wrapperCol={{ span: 24 }}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="END_DAY" label="Đến ngày">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Cơ sở khám" name="FACILITY">
                <Select
                  showSearch
                  placeholder={"Tất cả"}
                  style={{ width: "230px" }}
                  options={medicalFacilityOptions}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col>
              <Button
                htmlType="submit"
                onClick={handleOk}
                className="btn-fillter"
                form="hardToxic"
              >
                <p>Lọc</p>
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="item">
        {dataToxic &&
          dataToxic.map((value) => (
            <div className="item-list">
              <ItemList
                date={new Date(value?.PHYSICAL_DATE).toLocaleDateString(
                  "en-GB"
                )}
                medicalFacility={value?.Medical_Facility?.NAME}
                background={itemHardToxicBackground}
                isHidden="true"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListResult;
