import { Button, Col, Descriptions, Row, Space, Spin, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRecoilValue } from "recoil";
import { generalSettingState } from "../../../recoil/atom/generalSettingState";
import { useEmployee } from "../../../hooks/employee";
import { useGeneralSetting } from "../../../hooks/generalSettings";
import { Link, useParams } from "react-router-dom";
import { usePhysicalExam } from "../../../hooks/physicalExam";
import { ROUTES } from "../../../constant/router";
import { authState } from "../../../recoil/atom/authState";
import { employeeState } from "../../../recoil/atom/employeeState";

const ShowDetailsPDF = ({ onCancel, dataViewPDF }) => {
  const printPage1Ref = useRef();
  const printPage2Ref = useRef();

  let { id } = useParams();

  const { physicalExam, isLoading } = usePhysicalExam();
  const download = useRef();
  const scroll = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  useGeneralSetting();
  useEmployee();
  const generalSetting = useRecoilValue(generalSettingState);
  const { profile } = useRecoilValue(authState);
  const employeeList = useRecoilValue(employeeState);
  const [employeeUser, setEmployeeUser] = useState([]);

  useEffect(() => {
    if (profile) {
      const employeeByUser = employeeList.filter(
        (item) => item.USER_ID === profile?.id
      );
      setEmployeeUser(employeeByUser[0]);
    }
  }, [profile, employeeList]);

  const useStyles = {
    setCenter: {
      display: "flex",
      justifyContent: "center",
      alignItem: "center",
      marginBottom: 40,
      marginTop: 40,
    },
    setSpaceBetween: {
      display: "flex",
      justifyContent: "space-between",
      alignItem: "center",
    },
    textIndent: {
      textIndent: 30,
    },
    textResult: {
      whiteSpace: "pre-line",
      paddingLeft: 50,
    },
    normalUnitStyles: {
      borderRight: "none",
      verticalAlign: "top",
      color: "black",
      textAlign: "center",
    },
  };

  const handleDownloadPDF = async () => {
    const canvasPage1 = await html2canvas(printPage1Ref.current, {
      scale: 1.5,
    });
    const canvasPage2 = await html2canvas(printPage2Ref.current, {
      scale: 1.5,
    });

    const dataPage1 = canvasPage1.toDataURL("image/png");
    const dataPage2 = canvasPage2.toDataURL("image/png");

    const pdf = new jsPDF("portrait", "px", "a4");

    const imgProperties = pdf.getImageProperties(dataPage1);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = Math.floor(
      (imgProperties.height * pdfWidth) / imgProperties.width
    );

    pdf.addImage(dataPage1, "PNG", 0, 10, pdfWidth, pdfHeight);
    pdf.setFontSize(8);
    pdf.setTextColor("Gray");
    pdf.text("page_01", 45, pdfHeight + 90, {
      baseline: "bottom",
      align: "right",
    });

    pdf.addPage();
    pdf.addImage(dataPage2, "PNG", 0, 10, pdfWidth, pdfHeight);
    pdf.text("page_02", 45, pdfHeight + 90, {
      baseline: "bottom",
      align: "right",
    });

    const pdfName = employeeUser?.CD
      ? employeeUser?.CD.trim() +
        "_" +
        employeeUser?.User?.FIRST_NAME +
        " " +
        employeeUser?.User?.LAST_NAME +
        "_" +
        employeeUser?.Department?.DEPARTMENT_NAME
      : employeeUser?.User?.FIRST_NAME +
        " " +
        employeeUser?.User?.LAST_NAME +
        "_" +
        employeeUser?.Department?.DEPARTMENT_NAME;

    pdf.save(`${pdfName}`);
  };

  return (
    <Spin spinning={isLoading}>
      <div className="">
        <div>
          <div ref={printPage1Ref}>
            <Row>
              <Col span={22} offset={1}>
                <Space wrap style={useStyles.setCenter} className="title">
                  <Typography.Title
                    level={3}
                    style={{ textTransform: "uppercase" }}
                  >
                    KẾT QUẢ KHÁM SỨC KHỎE {dataViewPDF?.PHYSICAL_NAME}
                  </Typography.Title>
                </Space>

                <Descriptions
                  bordered
                  column={1}
                  size="small"
                  labelStyle={{ width: 0 }}
                  contentStyle={{ width: "100%", padding: "5px 2px" }}
                >
                  <Descriptions.Item>
                    <Row>
                      <Col span={12}>
                        <Space className="m0-p0">
                          <Typography.Paragraph
                            className="fz16"
                            strong
                            style={{ width: 200 }}
                          >
                            HỌ VÀ TÊN:
                          </Typography.Paragraph>
                          <Typography.Paragraph
                            className="fz16"
                            type="secondary"
                            strong
                          >
                            {employeeUser?.User?.FIRST_NAME}{" "}
                            {employeeUser?.User?.LAST_NAME}
                          </Typography.Paragraph>
                        </Space>
                      </Col>
                      <Col span={12}>
                        <Space className="m0-p0">
                          <Typography.Paragraph
                            className="fz16"
                            strong
                            style={{ width: 100 }}
                          >
                            SỐ HỒ SƠ:
                          </Typography.Paragraph>
                          <Typography.Paragraph
                            className="fz16"
                            type="secondary"
                            strong
                          >
                            {dataViewPDF?.Physical_Exam?.id}
                          </Typography.Paragraph>
                        </Space>
                      </Col>
                    </Row>
                  </Descriptions.Item>
                  <Descriptions.Item>
                    <Row>
                      <Col span={12}>
                        <Space className="m0-p0">
                          <Typography.Paragraph
                            className="fz16"
                            strong
                            style={{ width: 200 }}
                          >
                            GIỚI TÍNH:
                          </Typography.Paragraph>
                          <Typography.Paragraph
                            className="fz16"
                            type="secondary"
                            strong
                          >
                            {employeeUser?.User?.Gender?.NAME}
                          </Typography.Paragraph>
                        </Space>
                      </Col>
                      <Col span={12}>
                        <Space className="m0-p0">
                          <Typography.Paragraph
                            className="fz16"
                            strong
                            style={{ width: 100 }}
                          >
                            NĂM SINH:
                          </Typography.Paragraph>
                          <Typography.Paragraph
                            className="fz16"
                            type="secondary"
                            strong
                          >
                            {new Date(employeeUser?.User?.BOD).getFullYear()}
                          </Typography.Paragraph>
                        </Space>
                      </Col>
                    </Row>
                  </Descriptions.Item>
                  <Descriptions.Item>
                    <Row>
                      <Col span={24}>
                        <Space className="m0-p0">
                          <Typography.Paragraph
                            className="fz16"
                            strong
                            style={{ width: 200 }}
                          >
                            BỘ PHẬN:
                          </Typography.Paragraph>
                          <Typography.Paragraph
                            className="fz16"
                            type="secondary"
                            strong
                          >
                            {employeeUser?.Division?.DIVISION_NAME}
                          </Typography.Paragraph>
                        </Space>
                      </Col>
                    </Row>
                  </Descriptions.Item>
                  <Descriptions.Item>
                    <Row>
                      <Col span={12}>
                        <Space className="m0-p0">
                          <Typography.Paragraph
                            className="fz16"
                            strong
                            style={{ width: 200 }}
                          >
                            CHI NHÁNH:
                          </Typography.Paragraph>
                          <Typography.Paragraph
                            className="fz16"
                            type="secondary"
                            strong
                          >
                            {employeeUser?.Workplace?.BRANCH_NAME}
                          </Typography.Paragraph>
                        </Space>
                      </Col>
                      <Col span={12}>
                        <Space className="m0-p0">
                          <Typography.Paragraph className="fz16" strong>
                            CÔNG TY AJINOMOTO VIỆT NAM
                          </Typography.Paragraph>
                        </Space>
                      </Col>
                    </Row>
                  </Descriptions.Item>
                </Descriptions>
                <Space className="title">
                  <Typography.Title level={4}>I. KHÁM THỂ LỰC</Typography.Title>
                </Space>
                <Descriptions
                  bordered
                  labelStyle={{
                    background: "none",
                    borderRight: "none",
                    fontWeight: 600,
                    fontSize: "16px",
                    padding: "2px 4px",
                  }}
                  contentStyle={{
                    borderRight: "none",
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "rgba(0, 0, 0, 0.45)",
                    width: 80,
                    padding: 4,
                  }}
                  column={4}
                  size="small"
                >
                  <Descriptions.Item
                    style={{
                      color: dataViewPDF?.Physical_Exam?.Physical_Details[0]
                        ?.PERSONAL_HEIGH
                        ? ""
                        : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                    }}
                    label="Chiều cao :"
                  >
                    {
                      dataViewPDF?.Physical_Exam?.Physical_Details?.[0]
                        ?.PERSONAL_HEIGH
                    }
                  </Descriptions.Item>
                  <Descriptions.Item label="m"></Descriptions.Item>
                  <Descriptions.Item
                    style={{
                      color: dataViewPDF?.Physical_Exam?.Physical_Details[0]
                        ?.PERSONAL_WEIGHT
                        ? ""
                        : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                    }}
                    label="Cân nặng:"
                  >
                    {
                      dataViewPDF?.Physical_Exam?.Physical_Details[0]
                        ?.PERSONAL_WEIGHT
                    }
                  </Descriptions.Item>
                  <Descriptions.Item label="kg"></Descriptions.Item>
                  <Descriptions.Item
                    style={{
                      color: dataViewPDF?.BLOOD_PRESSURE
                        ? ""
                        : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                    }}
                    label="Huyết áp:"
                  >
                    {
                      dataViewPDF?.Physical_Exam?.Physical_Details[0]
                        ?.Blood_Pressures[0]?.VALUE
                    }
                  </Descriptions.Item>
                  <Descriptions.Item label="mmHg"></Descriptions.Item>
                  <Descriptions.Item
                    style={{
                      color:
                        dataViewPDF?.WEIGHT && dataViewPDF?.HEIGH
                          ? ""
                          : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                    }}
                    label="BMI:"
                    span={2}
                  >
                    {dataViewPDF?.Physical_Exam?.Physical_Details[0]?.BMI_INDEX}
                  </Descriptions.Item>
                </Descriptions>
                <Space className="title">
                  <Typography.Title level={4}>
                    II. TÓM TẮT KẾT QUẢ KHÁM
                  </Typography.Title>
                </Space>
                <Descriptions
                  column={2}
                  bordered
                  labelStyle={{
                    background: "none",
                    fontWeight: 600,
                    fontSize: "16px",

                    verticalAlign: "top",
                    padding: 4,
                  }}
                  contentStyle={{
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "rgba(0, 0, 0, 0.45)",
                    padding: 4,
                  }}
                >
                  <Descriptions.Item
                    label="NỘI DUNG KHÁM"
                    labelStyle={{
                      width: "25%",
                      fontWeight: 900,
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                    contentStyle={{
                      fontWeight: 900,
                      textAlign: "center",
                      color: "black",
                    }}
                  >
                    KẾT QUẢ KHÁM VÀ KẾT LUẬN
                  </Descriptions.Item>
                  <Descriptions.Item
                    label=""
                    labelStyle={{
                      width: "0%",
                      borderRight: "none",
                    }}
                    contentStyle={{
                      width: "25%",
                      fontWeight: 900,
                      textAlign: "center",
                      color: "black",
                      borderRight: "none",
                    }}
                  >
                    CHỈ SỐ BÌNH THƯỜNG (Nếu có)
                  </Descriptions.Item>
                  <Descriptions.Item label="Nội khoa">
                    {
                      dataViewPDF?.Physical_Exam?.Clinical_Details[0]
                        ?.INTERNAL_MEDICINE_RESULT
                    }
                  </Descriptions.Item>
                  <Descriptions.Item
                    style={{ borderRight: "none" }}
                  ></Descriptions.Item>
                  <Descriptions.Item label="Ngoại khoa">
                    {
                      dataViewPDF?.Physical_Exam?.Clinical_Details[0]
                        ?.SURGERY_RESULT
                    }
                  </Descriptions.Item>
                  <Descriptions.Item
                    style={{ borderRight: "none" }}
                  ></Descriptions.Item>
                  <Descriptions.Item label="Mắt">
                    {
                      dataViewPDF?.Physical_Exam?.Clinical_Details[0]
                        ?.OPHTHALMOLOGY_RESULT
                    }
                  </Descriptions.Item>
                  <Descriptions.Item
                    style={{ borderRight: "none" }}
                  ></Descriptions.Item>
                  <Descriptions.Item label="Tai-Mũi-Họng">
                    {
                      dataViewPDF?.Physical_Exam?.Clinical_Details[0]
                        ?.OTORHINOLARYNGOLOGY_RESULT
                    }
                  </Descriptions.Item>
                  <Descriptions.Item
                    style={{ borderRight: "none" }}
                  ></Descriptions.Item>
                  <Descriptions.Item label="Răng-Hàm-Mặt">
                    {
                      dataViewPDF?.Physical_Exam?.Clinical_Details[0]
                        ?.DENTAL_DEPARTMENT_RESULT
                    }
                  </Descriptions.Item>
                  <Descriptions.Item
                    style={{ borderRight: "none" }}
                  ></Descriptions.Item>
                  <Descriptions.Item label="Da liễu">
                    {
                      dataViewPDF?.Physical_Exam?.Clinical_Details?.[0]
                        ?.DERMATOLOGY_RESULT
                    }
                  </Descriptions.Item>
                  <Descriptions.Item
                    style={{ borderRight: "none" }}
                  ></Descriptions.Item>
                  <Descriptions.Item label="Sản Phụ khoa">
                    {
                      dataViewPDF?.Physical_Exam?.Clinical_Details[0]
                        ?.GYNECOLOGY_RESULT
                    }
                  </Descriptions.Item>
                  <Descriptions.Item
                    style={{ borderRight: "none" }}
                  ></Descriptions.Item>
                  <Descriptions.Item label="Siêu âm bụng tổng quát">
                    <Typography.Paragraph className="m0-p0" type="secondary">
                      {
                        dataViewPDF?.Physical_Exam?.Preclinical_Details[0]
                          ?.STOMACH_ULTRA_SOUND_DESC
                      }
                    </Typography.Paragraph>
                    <Typography.Text type="secondary" className="m0-p0">
                      →{" "}
                      {
                        dataViewPDF?.Physical_Exam?.Preclinical_Details[0]
                          ?.STOMACH_ULTRA_SOUND_RESULT
                      }
                    </Typography.Text>
                  </Descriptions.Item>
                  <Descriptions.Item
                    style={{ borderRight: "none" }}
                  ></Descriptions.Item>
                  <Descriptions.Item label="Điện tâm đồ">
                    <Typography.Paragraph className="m0-p0" type="secondary">
                      {
                        dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                          ?.ECG_DESC
                      }
                    </Typography.Paragraph>
                    <Typography.Text type="secondary" className="m0-p0">
                      →{" "}
                      {
                        dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                          ?.ECG_RESULT
                      }
                    </Typography.Text>
                  </Descriptions.Item>

                  <Descriptions.Item
                    style={{ borderRight: "none" }}
                  ></Descriptions.Item>
                  <Descriptions.Item label="Xquang phổi">
                    <Typography.Paragraph className="m0-p0" type="secondary">
                      {
                        dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                          ?.XRAY_DESC
                      }
                    </Typography.Paragraph>
                    <Typography.Text type="secondary" className="m0-p0">
                      →{" "}
                      {
                        dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                          ?.XRAY_RESULT
                      }
                    </Typography.Text>
                  </Descriptions.Item>
                  <Descriptions.Item
                    style={{ borderRight: "none" }}
                  ></Descriptions.Item>
                  <Descriptions.Item label="Tổng phân tích tế bào máu">
                    <Row gutter={[8, 0]}>
                      <Col span={18}>
                        <div style={useStyles.setSpaceBetween}>
                          <Typography.Text>- Bạch cầu/WBC:</Typography.Text>
                          <Typography.Text type="secondary">
                            {
                              dataViewPDF?.Physical_Exam
                                ?.Preclinical_Details?.[0]?.WBC_RESULT
                            }
                          </Typography.Text>
                        </div>
                      </Col>
                      <Col span={6}>
                        <Typography.Text>
                          {
                            dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                              ?.WBC_UNIT_DEFAULT
                          }
                        </Typography.Text>
                      </Col>
                      <Col span={18}>
                        <div style={useStyles.setSpaceBetween}>
                          <Typography.Text>- Hồng cầu/RBC:</Typography.Text>
                          <Typography.Text type="secondary">
                            {
                              dataViewPDF?.Physical_Exam
                                ?.Preclinical_Details?.[0]?.RBC_RESULT
                            }
                          </Typography.Text>
                        </div>
                      </Col>
                      <Col span={6}>
                        <Typography.Text>
                          {
                            dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                              ?.RBC_UNIT_DEFAULT
                          }
                        </Typography.Text>
                      </Col>
                      <Col span={18}>
                        <div style={useStyles.setSpaceBetween}>
                          <Typography.Text>
                            - Huyết sắc tố/HGB:{" "}
                          </Typography.Text>
                          <Typography.Text type="secondary">
                            {
                              dataViewPDF?.Physical_Exam
                                ?.Preclinical_Details?.[0]?.HGB_RESULT
                            }
                          </Typography.Text>
                        </div>
                      </Col>
                      <Col span={6}>
                        <Typography.Text>
                          {
                            dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                              ?.HGB_UNIT_DEFAULT
                          }
                        </Typography.Text>
                      </Col>
                      <Col span={18}>
                        <div style={useStyles.setSpaceBetween}>
                          <Typography.Text>
                            - Dung tích hồng cầu/HCT:{" "}
                          </Typography.Text>
                          <Typography.Text type="secondary">
                            {
                              dataViewPDF?.Physical_Exam
                                ?.Preclinical_Details?.[0]?.HCT_RESULT
                            }
                          </Typography.Text>
                        </div>
                      </Col>
                      <Col span={6}>
                        <Typography.Text>
                          {
                            dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                              ?.HCT_UNIT_DEFAULT
                          }
                        </Typography.Text>
                      </Col>
                      <Col span={18}>
                        <div style={useStyles.setSpaceBetween}>
                          <Typography.Text>
                            - Số lượng huyết sắc tố trung bình/MCH:{" "}
                          </Typography.Text>
                          <Typography.Text type="secondary">
                            {
                              dataViewPDF?.Physical_Exam
                                ?.Preclinical_Details?.[0]?.MCH_RESULT
                            }
                          </Typography.Text>
                        </div>
                      </Col>
                      <Col span={6}>
                        <Typography.Text>
                          {
                            dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                              ?.MCH_UNIT_DEFAULT
                          }
                        </Typography.Text>
                      </Col>
                      <Col span={18}>
                        <div style={useStyles.setSpaceBetween}>
                          <Typography.Text>
                            - Thể tích hồng cầu/MCV:{" "}
                          </Typography.Text>
                          <Typography.Text type="secondary">
                            {
                              dataViewPDF?.Physical_Exam
                                ?.Preclinical_Details?.[0]?.MCV_RESULT
                            }
                          </Typography.Text>
                        </div>
                      </Col>
                      <Col span={6}>
                        <Typography.Text>
                          {
                            dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                              ?.MCV_UNIT_DEFAULT
                          }
                        </Typography.Text>
                      </Col>
                      <Col span={18}>
                        <div style={useStyles.setSpaceBetween}>
                          <Typography.Text>- Tiểu cầu/PLT:</Typography.Text>
                          <Typography.Text type="secondary">
                            {
                              dataViewPDF?.Physical_Exam
                                ?.Preclinical_Details?.[0]?.PLT_RESULT
                            }
                          </Typography.Text>
                        </div>
                      </Col>
                      <Col span={6}>
                        <Typography.Text>
                          {
                            dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                              ?.PLT_UNIT_DEFAULT
                          }
                        </Typography.Text>
                      </Col>
                    </Row>
                    <Typography.Text type="secondary" className="m0-p0">
                      →{" "}
                      {
                        dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                          ?.BLOOD_RESULT
                      }
                    </Typography.Text>
                  </Descriptions.Item>

                  <Descriptions.Item style={useStyles.normalUnitStyles}>
                    <Typography.Text>
                      {generalSetting?.WBC_MIN} - {generalSetting?.WBC_MAX}
                    </Typography.Text>
                    <br />
                    <Typography.Text>
                      {generalSetting?.RBC_MIN} - {generalSetting?.RBC_MAX}
                    </Typography.Text>
                    <br />
                    <Typography.Text>
                      {generalSetting?.HGB_MIN} - {generalSetting?.HGB_MAX}
                    </Typography.Text>
                    <br />
                    <Typography.Text>
                      {generalSetting?.HCT_MIN} - {generalSetting?.HCT_MAX}
                    </Typography.Text>
                    <br />
                    <Typography.Text>
                      {generalSetting?.MCH_MIN} - {generalSetting?.MCH_MAX}
                    </Typography.Text>
                    <br />
                    <Typography.Text>
                      {generalSetting?.MCV_MIN} - {generalSetting?.MCV_MAX}
                    </Typography.Text>
                    <br />
                    <Typography.Text>
                      {generalSetting?.PLT_MIN} - {generalSetting?.PLT_MAX}
                    </Typography.Text>
                  </Descriptions.Item>

                  <Descriptions.Item label="Đường huyết đói (Glucose)">
                    <Row gutter={[8, 0]}>
                      <Col span={18}>
                        <div style={useStyles.setSpaceBetween}>
                          <Typography.Text></Typography.Text>
                          <Typography.Text type="secondary">
                            {
                              dataViewPDF?.Physical_Exam
                                ?.Preclinical_Details?.[0]?.Glucoses?.[0]
                                ?.GLUCOSE_HUNGRY
                            }
                          </Typography.Text>
                        </div>
                      </Col>
                      <Col span={6}>
                        <Typography.Text>
                          {
                            dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                              ?.Glucoses?.[0]?.DEFAULT_UNIT
                          }
                        </Typography.Text>
                      </Col>
                    </Row>
                  </Descriptions.Item>
                  <Descriptions.Item style={useStyles.normalUnitStyles}>
                    {generalSetting?.GLUCOSE_MIN} -{" "}
                    {generalSetting?.GLUCOSE_MAX}
                  </Descriptions.Item>
                  <Descriptions.Item label="Chức năng thận">
                    <Row gutter={[8, 0]}>
                      <Col span={18}>
                        <div style={useStyles.setSpaceBetween}>
                          <Typography.Text>Urea:</Typography.Text>
                          <Typography.Text type="secondary">
                            {
                              dataViewPDF?.Physical_Exam
                                ?.Preclinical_Details?.[0]?.Ure_Creatines?.[0]
                                ?.UREA_RESULT
                            }
                          </Typography.Text>
                        </div>
                      </Col>
                      <Col span={6}>
                        <Typography.Text>
                          {
                            dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                              ?.Ure_Creatines?.[0]?.UREA_DEFAULT_UNIT
                          }
                        </Typography.Text>
                      </Col>
                      <Col span={18}>
                        <div style={useStyles.setSpaceBetween}>
                          <Typography.Text>Creatine:</Typography.Text>
                          <Typography.Text type="secondary">
                            {
                              dataViewPDF?.Physical_Exam
                                ?.Preclinical_Details?.[0]?.Ure_Creatines?.[0]
                                ?.CREATINE_RESULT
                            }
                          </Typography.Text>
                        </div>
                      </Col>
                      <Col span={6}>
                        <Typography.Text>
                          {
                            dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                              ?.Ure_Creatines?.[0]?.CREATINE_DEFAULT_UNIT
                          }
                        </Typography.Text>
                      </Col>
                    </Row>
                  </Descriptions.Item>
                  <Descriptions.Item style={useStyles.normalUnitStyles}>
                    <Typography.Text>
                      {generalSetting?.UREA_MIN} - {generalSetting?.UREA_MAX}
                    </Typography.Text>
                    <br />
                    <Typography.Text>
                      {generalSetting?.CREATINE_MIN} -{" "}
                      {generalSetting?.CREATINE_MAX}
                    </Typography.Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Chức năng gan">
                    <Row gutter={[8, 0]}>
                      <Col span={18}>
                        <div style={useStyles.setSpaceBetween}>
                          <Typography.Text>SGOT:</Typography.Text>
                          <Typography.Text type="secondary">
                            {
                              dataViewPDF?.Physical_Exam
                                ?.Preclinical_Details?.[0]?.Liver_Enzymes?.[0]
                                ?.SGOT_AST_RESULT
                            }
                          </Typography.Text>
                        </div>
                      </Col>
                      <Col span={6}>
                        <Typography.Text>
                          {
                            dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                              ?.Liver_Enzymes?.[0]?.SGOT_AST_DEFAULT_UNIT
                          }
                        </Typography.Text>
                      </Col>
                      <Col span={18}>
                        <div style={useStyles.setSpaceBetween}>
                          <Typography.Text>SGPT:</Typography.Text>
                          <Typography.Text type="secondary">
                            {
                              dataViewPDF?.Physical_Exam
                                ?.Preclinical_Details?.[0]?.Liver_Enzymes?.[0]
                                ?.SGPT_ALT_RESULT
                            }
                          </Typography.Text>
                        </div>
                      </Col>
                      <Col span={6}>
                        <Typography.Text>
                          {
                            dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                              ?.Liver_Enzymes?.[0]?.SGPT_ALT_DEFAULT_UNIT
                          }
                        </Typography.Text>
                      </Col>
                    </Row>
                  </Descriptions.Item>
                  <Descriptions.Item style={useStyles.normalUnitStyles}>
                    <Typography.Paragraph>
                      {generalSetting?.SGOT_AST_MIN} -{" "}
                      {generalSetting?.SGOT_AST_MAX}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                      {generalSetting?.SGPT_ALT_MIN} -{" "}
                      {generalSetting?.SGPT_ALT_MAX}
                    </Typography.Paragraph>
                  </Descriptions.Item>
                  <Descriptions.Item label="Lipid máu (Bộ mỡ máu)">
                    <Row gutter={[8, 0]}>
                      <Col span={18}>
                        <div style={useStyles.setSpaceBetween}>
                          <Typography.Text>Cholesterol: :</Typography.Text>
                          <Typography.Text type="secondary">
                            {
                              dataViewPDF?.Physical_Exam
                                ?.Preclinical_Details?.[0]?.Blood_Lipids?.[0]
                                ?.CHOLESTEROL_RESULT
                            }
                          </Typography.Text>
                        </div>
                      </Col>
                      <Col span={6}>
                        <Typography.Text>
                          {
                            dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                              ?.Blood_Lipids?.[0]?.CHOLESTEROL_DEFAULT_UNIT
                          }
                        </Typography.Text>
                      </Col>
                      <Col span={18}>
                        <div style={useStyles.setSpaceBetween}>
                          <Typography.Text>HDL: </Typography.Text>
                          <Typography.Text type="secondary">
                            {
                              dataViewPDF?.Physical_Exam
                                ?.Preclinical_Details?.[0]?.Blood_Lipids?.[0]
                                ?.HDL_RESULT
                            }
                          </Typography.Text>
                        </div>
                      </Col>
                      <Col span={6}>
                        <Typography.Text>
                          {
                            dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                              ?.Blood_Lipids?.[0]?.HDL_DEFAULT_UNIT
                          }
                        </Typography.Text>
                      </Col>
                      <Col span={18}>
                        <div style={useStyles.setSpaceBetween}>
                          <Typography.Text>LDL:</Typography.Text>
                          <Typography.Text type="secondary">
                            {
                              dataViewPDF?.Physical_Exam
                                ?.Preclinical_Details?.[0]?.Blood_Lipids?.[0]
                                ?.LDL_RESULT
                            }
                          </Typography.Text>
                        </div>
                      </Col>
                      <Col span={6}>
                        <Typography.Text>
                          {
                            dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                              ?.Blood_Lipids?.[0]?.LDL_DEFAULT_UNIT
                          }
                        </Typography.Text>
                      </Col>
                      <Col span={18}>
                        <div style={useStyles.setSpaceBetween}>
                          <Typography.Text>Triglyceride:</Typography.Text>
                          <Typography.Text type="secondary">
                            {
                              dataViewPDF?.Physical_Exam
                                ?.Preclinical_Details?.[0]?.Blood_Lipids?.[0]
                                ?.TRIGLYCERIDE_RESULT
                            }
                          </Typography.Text>
                        </div>
                      </Col>
                      <Col span={6}>
                        <Typography.Text>
                          {
                            dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                              ?.Blood_Lipids?.[0]?.TRIGLYCERIDE_DEFAULT_UNIT
                          }
                        </Typography.Text>
                      </Col>
                    </Row>
                  </Descriptions.Item>
                  <Descriptions.Item style={useStyles.normalUnitStyles}>
                    <Typography.Text>
                      {generalSetting?.CHOLESTEROL_MIN} -{" "}
                      {generalSetting?.CHOLESTEROL_MAX}
                    </Typography.Text>
                    <br />
                    <Typography.Text>
                      {generalSetting?.HDL_MIN} - {generalSetting?.HDL_MAX}
                    </Typography.Text>
                    <br />
                    <Typography.Text>
                      {generalSetting?.LDL_MIN} - {generalSetting?.LDL_MAX}
                    </Typography.Text>
                    <br />
                    <Typography.Text>
                      {generalSetting?.TRIGLYCERIDE_MIN} -{" "}
                      {generalSetting?.TRIGLYCERIDE_MAX}
                    </Typography.Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Tổng phân tích nước tiểu">
                    <Typography.Paragraph className="m0-p0" type="secondary">
                      →{" "}
                      {
                        dataViewPDF?.Physical_Exam?.Preclinical_Details?.[0]
                          ?.URINALYSIS_RESULT
                      }
                    </Typography.Paragraph>
                  </Descriptions.Item>
                  <Descriptions.Item
                    style={{ borderRight: "none" }}
                  ></Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </div>
          <div ref={printPage2Ref}>
            <Row>
              <Col span={22} offset={1}>
                <Space direction="vertical" size={4} className="title">
                  <Typography.Title level={4}>
                    III. KẾT LUẬN CỦA BÁC SĨ CHUYÊN KHOA:
                  </Typography.Title>
                  <Space className="m0-p0">
                    <Typography.Title
                      level={5}
                      style={{
                        ...useStyles.textIndent,
                      }}
                    >
                      1. Phân loại sức khỏe:
                    </Typography.Title>
                    <Space className="m0-p0">
                      <Typography.Title
                        level={5}
                        style={{
                          ...useStyles.textIndent,
                        }}
                      >
                        Loại{" "}
                        {
                          dataViewPDF?.Physical_Exam?.Physical_Exam_Results[0]
                            ?.PHYSICAL_CLASSIFY_ID
                        }
                      </Typography.Title>
                    </Space>
                  </Space>
                  <Space className="m0-p0">
                    <Typography.Title
                      level={5}
                      style={{
                        ...useStyles.textIndent,
                      }}
                    >
                      Lý do:
                    </Typography.Title>
                    <Space className="m0-p0">
                      <Typography.Title
                        level={5}
                        style={{
                          ...useStyles.textIndent,
                        }}
                      >
                        Loại{" "}
                        {
                          dataViewPDF?.Physical_Exam?.Physical_Exam_Results[0]
                            ?.PHYSICAL_CLASSIFY_ID
                        }
                      </Typography.Title>
                    </Space>
                  </Space>
                  <Typography.Title
                    level={5}
                    style={{
                      ...useStyles.textIndent,
                    }}
                  >
                    2. Bệnh lý hiện tại:
                  </Typography.Title>
                  {dataViewPDF?.Physical_Exam?.Physical_Exam_Results?.[0]?.Disease_Currents.map(
                    (value) => (
                      <Typography.Title
                        type="secondary"
                        level={5}
                        style={{
                          ...useStyles.textResult,
                        }}
                      >
                        - {value?.DISEASE_NAME}
                      </Typography.Title>
                    )
                  )}
                  <Space className="m0-p0">
                    <Typography.Title
                      level={5}
                      style={{
                        ...useStyles.textIndent,
                      }}
                    >
                      3. Kết luận:
                    </Typography.Title>
                    <Typography.Title
                      type="secondary"
                      level={5}
                      style={{
                        ...useStyles.textIndent,
                      }}
                    >
                      {dataViewPDF?.Physical_Exam?.Physical_Exam_Results?.[0]
                        ?.RESULT === 0
                        ? "Không đủ sức khỏe làm việc"
                        : dataViewPDF?.Physical_Exam?.Physical_Exam_Results?.[0]
                            ?.RESULT === 1
                        ? "Đủ sức khỏe làm việc"
                        : ""}
                    </Typography.Title>
                  </Space>
                  <Space className="m0-p0">
                    <Typography.Title
                      level={5}
                      style={{
                        ...useStyles.textIndent,
                      }}
                    >
                      4. Đề nghị:
                    </Typography.Title>
                    <Typography.Title
                      type="secondary"
                      level={5}
                      style={{
                        ...useStyles.textIndent,
                      }}
                    >
                      {
                        dataViewPDF?.Physical_Exam?.Physical_Exam_Results?.[0]
                          ?.SUGGESTION
                      }
                    </Typography.Title>
                  </Space>
                  <Typography.Title level={4}>
                    IV. TƯ VẤN CỦA BÁC SĨ CHUYÊN KHOA:
                  </Typography.Title>
                  <Space className="m0-p0">
                    <Typography.Title
                      level={5}
                      style={{
                        ...useStyles.textIndent,
                      }}
                    >
                      1. Căn cứ vào kết quả khám sức khỏe. Anh/ Chị cần đi khám
                      kiểm tra:
                    </Typography.Title>
                    <Typography.Title
                      type="secondary"
                      level={5}
                      style={{
                        ...useStyles.textResult,
                      }}
                    >
                      {
                        dataViewPDF?.Physical_Exam?.Physical_Exam_Results?.[0]
                          ?.REQUEST
                      }
                    </Typography.Title>
                  </Space>
                  <Space className="m0-p0">
                    <Typography.Title
                      level={5}
                      style={{
                        ...useStyles.textIndent,
                      }}
                    >
                      2. Các biến chứng của căn bệnh nếu không đi khám kiểm tra
                      và điều trị:
                    </Typography.Title>
                    <Typography.Title
                      type="secondary"
                      level={5}
                      style={{
                        ...useStyles.textResult,
                      }}
                    >
                      {
                        dataViewPDF?.Physical_Exam?.Physical_Exam_Results?.[0]
                          ?.WARNING_REQUEST
                      }
                    </Typography.Title>
                  </Space>
                  <Space className="m0-p0">
                    <Typography.Title
                      level={5}
                      style={{
                        ...useStyles.textIndent,
                      }}
                    >
                      4. Chế độ phòng bệnh, phòng biến chứng :
                    </Typography.Title>
                    <Typography.Title
                      type="secondary"
                      level={5}
                      style={{
                        ...useStyles.textResult,
                      }}
                    >
                      {
                        dataViewPDF?.Physical_Exam?.Physical_Exam_Results?.[0]
                          ?.PREVENTION
                      }
                    </Typography.Title>
                  </Space>
                </Space>
              </Col>
            </Row>
          </div>
          <Row style={{ marginTop: 40 }}>
            <Col span={12} push={3}>
              <Button type="primary" onClick={onCancel}>
                Quay lại
              </Button>
            </Col>
            <Col ref={download} className="col-download-pdf" push={7}>
              <Button type="primary" onClick={handleDownloadPDF}>
                Tải file PDF
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </Spin>
  );
};

export default ShowDetailsPDF;
