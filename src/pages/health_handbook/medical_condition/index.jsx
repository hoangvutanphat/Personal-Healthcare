import { Col, Pagination, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import icon_arrow_down from "../../../assets/images/icon_arrow_down_white.svg";
import icon_empty from "../../../assets/images/icon_empty.svg";
import {
  employeeData,
  healthHisData,
  medicalConsultationDiseaseData
} from "../../../common/getAllApi";
import BreadcrumbProvider from "../../../components/globals/Breadcrumb";
import EmployeeCode from "../../../components/globals/EmployeeCode";
import EmployeeDescription from "../../../components/globals/EmployeeDescription";
import SmallTutorial from "../../../components/globals/EmployeeInformation/SmallTutorial";
import EmployeeName from "../../../components/globals/EmployeeName";
import BannerBot from "../../../components/home/banners/bot_banner/index.";
import MedicalConsultation from "../../../components/meidcal_condition/medical_consultation/MedicalConsultation";
import { ROUTES } from "../../../constant/router";
import { authState } from "../../../recoil/atom/authState";
import { employeeState } from "../../../recoil/atom/employeeState";
import {
  healthHistoryByUserState, healthHistoryState
} from "../../../recoil/atom/healthHistotyState";
import { medicalConditionState } from "../../../recoil/atom/medicalConditionState";
import { medicalConsultationDiseaseState } from "../../../recoil/atom/medicalConsultationDiseaseState";

const MedicalCondition = () => {
  const { profile } = useRecoilValue(authState);
  const [employeeList, setEmployeeList] = useRecoilState(employeeState);
  const [healthHiss, setHealthHiss] = useRecoilState(healthHistoryState);
  const [medicalConsultationDisease, setMedicalConsultationDisease] =
    useRecoilState(medicalConsultationDiseaseState);
  const [medicalCondition, setMedicalCondition] = useRecoilState(
    medicalConditionState
  );
  const [listCureds, setListCureds] = useState([]);
  const [beingTreateds, setBeingTreateds] = useState([]);
  const [hadSurgerys, setHadSurgerys] = useState([]);
  const [others, setOthers] = useState([]);
  const [isTableStatus, setIsTableStatus] = useState(true);
  const [listDiseases, setListDiseases] = useState([]);
  const [isShow, setIsShow] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [state, setState] = useState({
    data: [],
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
  });

  useEffect(() => {
    if (employeeList.length === 0) {
      employeeData(employeeList, setEmployeeList);
    }
  }, [employeeList]);

  useEffect(() => {
    if (healthHiss.length === 0) {
      healthHisData(healthHiss, setHealthHiss);
    }
  }, [healthHiss]);

  const employeeUser = employeeList.filter(
    (item) => item.USER_ID === profile?.id
  );

  useEffect(() => {
    if (medicalConsultationDisease.length === 0) {
      medicalConsultationDiseaseData(
        medicalConsultationDisease,
        setMedicalConsultationDisease
      );
    }
  }, [medicalConsultationDisease]);

  const healthHistoryByUser = useRecoilValue(healthHistoryByUserState);

  useEffect(() => {
    if (healthHistoryByUser && healthHistoryByUser.length > 0) {
      const beingTreated = healthHistoryByUser.filter(
        (item) => item.Disease_Status?.NAME === "Đang điều trị"
      );
      setBeingTreateds(beingTreated);

      const listCured = healthHistoryByUser.filter(
        (item) => item.Disease_Status?.NAME === "Đã khỏi"
      );
      setListCureds(listCured);

      const hadSurgery = healthHistoryByUser.filter(
        (item) => item.Disease_Status?.NAME === "Đã phẫu thuật"
      );
      setHadSurgerys(hadSurgery);

      const other = healthHistoryByUser.filter(
        (item) => item.Disease_Status?.NAME === "Khác"
      );
      setOthers(other);

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

  const handleShowListUpdate = () => {
    setIsTableStatus(false);
    setListDiseases(healthHistoryByUser);
  };
  const handleUpdateDisease = () => {
    alert("Cập nhật thành công");
  };
  const handleCancel = () => {
    setIsTableStatus(true);
  };

  const handleDiseadeStatus = (data) => {
    setIsTableStatus(false);
    setListDiseases(data);
  };

  //pagination
  useEffect(() => {
    if (medicalCondition) {
      setState({
        data: medicalCondition,
        totalPage: medicalCondition.length / pageSize,
        minIndex: 0,
        maxIndex: pageSize,
      });
    }
  }, [medicalCondition, pageSize]);

  const handleChange = (page) => {
    setState({
      data: medicalCondition,
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize,
    });
  };
  const { data, current, minIndex, maxIndex } = state;
  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
  };

  return (
    <div className="container-wrapper employee-health-handbook">
      <BreadcrumbProvider address="Bệnh lý hiện tại của bạn" />
      <Row justify="center" gutter={[0, 24]} className="employee-health-info">
        <Col xs={{ span: 22 }} lg={{ span: 15 }}>
          <Row gutter={[0, 24]}>
            <Col
              xs={{ span: 22 }}
              lg={{ span: 12 }}
              style={{ paddingRight: 40 }}
            >
              <EmployeeCode
                avatar={employeeUser[0]?.User?.AVATAR}
                code={employeeUser[0]?.CD}
              />
              <EmployeeName
                title="Hồ sơ sức khoẻ cá nhân"
                name={profile?.FIRST_NAME + " " + profile?.LAST_NAME}
              />
              <EmployeeDescription
                description="Đoạn giới thiệu ngắn, Lorem ipsum dolor sit amet,
                     consectetur adipiscing elit,
                     sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
              />
              <div className="btn-medical-consultation">
                <a href="#detail_medical" style={{ display: "block" }}>
                  <div className="title-bottom-container">
                    <p>XEM TÌNH TRẠNG BỆNH LÝ CỦA BẠN</p>
                    <img src={icon_arrow_down} alt="" />
                  </div>
                </a>
              </div>
            </Col>
            <Col xs={{ span: 22 }} lg={{ span: 12 }}>
              <div className="chart-container ">
                <div className="tutorial-medical">
                  <SmallTutorial title="Hướng dẫn xem tình trạng bệnh lý của bạn" />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="employee-health-handbook__healtHandbook">
        <div className="container-fluid healthIndex-wrapper">
          <div className="container">
            <div className=" medical-condition-container">
              {/* <TblMedicalCondition
                medicalCondition={listDiseases}
                beingTreateds={beingTreateds}
                listCureds={listCureds}
                hadSurgerys={hadSurgerys}
                others={others}
                onShowList={handleShowListUpdate}
                onCancel={handleCancel}
                onUpdate={handleUpdateDisease}
                isTableStatus={isTableStatus}
                onShow={handleDiseadeStatus}
              /> */}

              <>
                {medicalCondition && medicalCondition.length > 0 ? (
                  <>
                    <p className="being-treated" id="detail_medical">
                      Chi tiết các bệnh lý
                    </p>
                    <div>
                      {medicalCondition &&
                        medicalCondition.length > 0 &&
                        medicalCondition.map(
                          (item, index) =>
                            index >= minIndex &&
                            index < maxIndex && (
                              <MedicalConsultation
                                key={index}
                                infoItem={item}
                                index={index + 1}
                                route={
                                  ROUTES.HEALTH_HANDBOOK.HEALTH_ADVICE.path
                                }
                              />
                            )
                        )}
                      <div className="footer-pagination">
                        <Pagination
                          pageSize={pageSize}
                          defaultCurrent={current}
                          total={medicalCondition?.length}
                          onChange={handleChange}
                          showTotal={() =>
                            `Bạn đang có ${medicalCondition.length} bệnh`
                          }
                          showSizeChanger
                          onShowSizeChange={onShowSizeChange}
                          size="small"
                          pageSizeOptions={[5, 10, 15, 20, 50]}
                        />
                      </div>
                    </div>
                  </>
                ) : (
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
              </>
            </div>
          </div>
        </div>
      </div>
      <div className="medical_advice">
        <p>
          <span>{profile?.LAST_NAME}</span> nhớ tự khám sức khoẻ định kỳ của
          mình nhé.
        </p>
      </div>
      <BannerBot isShow={isShow} />
    </div>
  );
};

export default MedicalCondition;
