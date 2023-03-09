import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, Row, Spin } from "antd";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import icon_empty from "../../../assets/images/icon_empty.svg";
import {
  healthHisData
} from "../../../common/getAllApi";
import {
  healthHistoryByUserState, healthHistoryState
} from "../../../recoil/atom/healthHistotyState";
import { indexKeyChangeState } from "../../../recoil/atom/healthIndexState";
import { medicalConditionState } from "../../../recoil/atom/medicalConditionState";
import ShowDiseaseItem from "./ShowDiseaseItem";
const { Panel } = Collapse;

const ShowConsultationDisease = () => {
  const [healthHiss, setHealthHiss] = useRecoilState(healthHistoryState);
  const healthHistoryByUser = useRecoilValue(healthHistoryByUserState);
  const indexKeyChange = useRecoilValue(indexKeyChangeState);

  const [medicalCondition, setMedicalCondition] = useRecoilState(
    medicalConditionState
  );

  // useEffect(() => {
  //   if (medicalCondition.length === 0) {
  //     medicalConsultationDiseaseData(medicalCondition, setMedicalCondition);
  //   }
  // }, [medicalCondition]);

  useEffect(() => {
    if (healthHiss.length === 0) {
      healthHisData(healthHiss, setHealthHiss);
    }
  }, [healthHiss]);

  useEffect(() => {
    if (healthHistoryByUser && healthHistoryByUser.length > 0) {
      //get  different disease
      let newArr = [];
      newArr = healthHistoryByUser.filter(function (item) {
        return newArr.includes(item.DISEASE_ID)
          ? ""
          : newArr.push(item.DISEASE_ID);
      });
      setMedicalCondition(newArr);
    }
  }, [healthHiss]);
  const onChange = (key) => {
    // console.log(key);
  };

  return (
    <div className="show-consultation-disease">
      {medicalCondition.length > 0 ? (
        <Collapse
          bordered={false}
          defaultActiveKey={indexKeyChange}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          className="site-collapse-custom-collapse"
          expandIconPosition="end"
          onChange={onChange}
        >
          {medicalCondition &&
            medicalCondition.length > 0 &&
            medicalCondition.map((item, index) => (
              <Panel
                style={{ flex: "none" }}
                header={
                  <div className="disease-name">
                    <p>{item?.DISEASE_NAME}</p>
                  </div>
                }
                key={index + 1}
                className="site-collapse-custom-panel"
              >
                <ShowDiseaseItem diseaseItem={item} />
              </Panel>
            ))}
        </Collapse>
      ) : (
        <div
          style={{ display: "flex", justifyContent: "center", minHeight: 500 }}
        >
          <Spin />
        </div>
      )}

      {!medicalCondition && (
        <Row
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            padding: 174,
          }}
        >
          <img src={icon_empty} alt="" />
          <h3 style={{ textAlign: "center", marginTop: 40 }}>
            Bạn hiện không có bệnh lý nào cần xem tư vấn, hãy{" "}
            <a href="" style={{ color: "#4AD143" }}>
              tham khảo thêm
            </a>{" "}
            để phòng tránh các bệnh nhé.
          </h3>
        </Row>
      )}
    </div>
  );
};

export default ShowConsultationDisease;
