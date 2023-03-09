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

const ShowInputMedicalDetailsPDF = ({ onCancel, dataViewPDF }) => {
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
      textIndent: 50,
    },
    normalUnitStyles: {
      borderRight: "none",
      verticalAlign: "top",
      color: "black",
      textAlign: "center",
    },
    margin: {
      marginTop: 40,
      marginBottom: 15,
    },
  };

  const handleDownloadPDF = async () => {
    const canvasPage1 = await html2canvas(printPage1Ref.current, {
      scale: 1.5,
    });
    // const canvasPage2 = await html2canvas(printPage2Ref.current, {
    //   scale: 1.5,
    // });

    const dataPage1 = canvasPage1.toDataURL("image/png");
    // const dataPage2 = canvasPage2.toDataURL("image/png");

    const pdf = new jsPDF("portrait", "px", "a4");

    const imgProperties = pdf.getImageProperties(dataPage1);
    // const imgProperties2 = pdf.getImageProperties(dataPage2);

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = Math.floor(
      (imgProperties.height * pdfWidth) / imgProperties.width
    );
    // const pdfHeight2 = Math.floor(
    //   (imgProperties2.height * pdfWidth) / imgProperties2.width
    // );

    pdf.addImage(dataPage1, "PNG", 0, 10, pdfWidth, pdfHeight);
    pdf.setFontSize(8);
    pdf.setTextColor("Gray");
    pdf.text("page_01", 45, pdfHeight + 90, {
      baseline: "bottom",
      align: "right",
    });

    // pdf.addPage();
    // pdf.addImage(dataPage2, "PNG", 0, 10, pdfWidth, pdfHeight2);
    // pdf.text("page_02", 45, pdfHeight + 90, {
    //   baseline: "bottom",
    //   align: "right",
    // });

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
      <div ref={printPage1Ref}>
        <Row>
          <Col span={22} offset={1}>
            <Space wrap style={useStyles.setCenter} className="title">
              <Typography.Title
                level={3}
                style={{ textTransform: "uppercase" }}
              >
                KẾT QUẢ KHÁM SỨC KHỎE ĐẦU VÀO
              </Typography.Title>
            </Space>

            <Descriptions
              bordered
              column={1}
              // size="small"
              labelStyle={{ width: 0 }}
              contentStyle={{ width: "100%", padding: "5px 2px" }}
            >
              <Descriptions.Item>
                <Row>
                  <Col span={12}>
                    <Space style={{ padding: 0 }}>
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
                        {employeeUser?.User?.FIRST_NAME &&
                        employeeUser?.User?.LAST_NAME
                          ? employeeUser?.User?.LAST_NAME +
                            " " +
                            employeeUser?.User?.FIRST_NAME
                          : ""}
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space style={{ padding: 0 }}>
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{ width: 100 }}
                      >
                        PHÒNG BAN:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {employeeUser?.Department?.DEPARTMENT_NAME
                          ? employeeUser?.Department?.DEPARTMENT_NAME
                          : ""}
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item>
                <Row>
                  <Col span={12}>
                    <Space style={{ padding: 0 }}>
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{ width: 200 }}
                      >
                        NGÀY SINH:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {employeeUser?.User?.YOB
                          ? employeeUser?.User?.YOB
                          : employeeUser?.User?.BOD
                          ? new Date(
                              employeeUser?.User?.BOD
                            ).toLocaleDateString("en-GB")
                          : ""}
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space style={{ padding: 0 }}>
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{ width: 100 }}
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
                    <Space style={{ padding: 0 }}>
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
                    <Space style={{ padding: 0 }}>
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{ width: 100 }}
                      >
                        ĐƠN VỊ:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {employeeUser?.Unit?.UNIT_NAME}
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item>
                <Row>
                  <Col span={12}>
                    <Space style={{ padding: 0 }}>
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{ width: 200 }}
                      >
                        PHÂN LOẠI SỨC KHỎE:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {dataViewPDF &&
                          dataViewPDF?.Physical_Exam_Results[0]
                            ?.Physical_Classification?.NAME}
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space style={{ padding: 0 }}>
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{ width: 100 }}
                      >
                        CẤP BẬC:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {employeeUser?.Position?.POSITION_NAME}
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item>
                <Row>
                  <Col span={24}>
                    <Space style={{ padding: 0 }}>
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{ width: 200 }}
                      >
                        NGÀY KHÁM:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {dataViewPDF?.PHYSICAL_DATE
                          ? new Date(
                              dataViewPDF?.PHYSICAL_DATE
                            ).toLocaleDateString("en-GB")
                          : ""}
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                </Row>
              </Descriptions.Item>
            </Descriptions>
            <Space className="title" style={useStyles.margin}>
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
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(0, 0, 0, 0.45)",
                borderRight: "none",
                width: 80,
                padding: 4,
              }}
              column={4}
              size="small"
            >
              <Descriptions.Item label="Chiều cao:">
                {dataViewPDF
                  ? dataViewPDF?.Physical_Details[0]?.PERSONAL_HEIGH
                  : ""}
              </Descriptions.Item>
              <Descriptions.Item label="m"></Descriptions.Item>
              <Descriptions.Item label="Cân nặng:">
                {dataViewPDF
                  ? dataViewPDF?.Physical_Details[0]?.PERSONAL_WEIGHT
                  : ""}
              </Descriptions.Item>
              <Descriptions.Item label="kg"></Descriptions.Item>
              <Descriptions.Item label="Huyết áp:">
                {dataViewPDF
                  ? dataViewPDF?.Physical_Details[0]?.Blood_Pressures[0]?.VALUE
                  : ""}
              </Descriptions.Item>
              <Descriptions.Item label="mmHg"></Descriptions.Item>
              <Descriptions.Item label="Mạch:">
                {dataViewPDF
                  ? dataViewPDF?.Physical_Details[0]?.BLOOD_VESSEL
                  : ""}
              </Descriptions.Item>
              <Descriptions.Item label="lần/phút"></Descriptions.Item>
            </Descriptions>
            <Space className="title" style={useStyles.margin}>
              <Typography.Title level={4}>
                II. TÓM TẮT KẾT QUẢ KHÁM
              </Typography.Title>
            </Space>
            <Descriptions
              bordered
              column={1}
              size="small"
              labelStyle={{
                background: "none",
                fontWeight: 600,
                fontSize: "16px",

                verticalAlign: "top",
                // borderRight: "1px solid black",
                padding: 4,
              }}
              contentStyle={{
                fontWeight: 600,
                fontSize: "16px",
                borderRight: "none",

                width: "70%",
                color: "rgba(0, 0, 0, 0.45)",
                padding: 4,
              }}
            >
              <Descriptions.Item
                label="NỘI DUNG KHÁM"
                labelStyle={{
                  fontWeight: 900,
                  textAlign: "center",
                  padding: "16px 0",
                }}
                contentStyle={{
                  fontWeight: 900,
                  textAlign: "center",
                  padding: "16px 0",
                  color: "black",
                }}
              >
                KẾT QUẢ KHÁM VÀ KẾT LUẬN
              </Descriptions.Item>
              <Descriptions.Item label="Nội khoa">
                {dataViewPDF &&
                  dataViewPDF?.Clinical_Details[0]?.INTERNAL_MEDICINE_RESULT}
              </Descriptions.Item>
              <Descriptions.Item label="Ngoại khoa">
                {dataViewPDF &&
                  dataViewPDF?.Clinical_Details[0]?.SURGERY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item label="Mắt">
                {dataViewPDF &&
                  dataViewPDF?.Clinical_Details[0]?.OPHTHALMOLOGY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item label="Tai-Mũi-Họng">
                {dataViewPDF &&
                  dataViewPDF?.Clinical_Details[0]?.OTORHINOLARYNGOLOGY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item label="Răng-Hàm-Mặt">
                {dataViewPDF &&
                  dataViewPDF?.Clinical_Details[0]?.DENTAL_DEPARTMENT_RESULT}
              </Descriptions.Item>
              <Descriptions.Item label="Da liễu">
                {dataViewPDF &&
                  dataViewPDF?.Clinical_Details[0]?.DERMATOLOGY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item label="Sản Phụ khoa">
                {dataViewPDF &&
                  dataViewPDF?.Clinical_Details[0]?.GYNECOLOGY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item label="Siêu âm ">
                <Typography.Paragraph className="m0-p0" type="secondary">
                  {dataViewPDF &&
                    dataViewPDF?.Preclinical_Details[0]
                      ?.OVERAL_ULTRA_SOUND_RESULT}
                </Typography.Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="Xquang">
                {dataViewPDF &&
                  dataViewPDF?.Preclinical_Details[0]?.XRAY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item label="Công thức máu">
                <Row gutter={[8, 0]}>
                  <Col span={12}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>- Hồng cầu/RBC:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF &&
                          dataViewPDF?.Preclinical_Details[0]?.RBC_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>
                      {generalSetting?.RBC_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                  <Col span={12}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>- Bạch cầu/WBC:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF &&
                          dataViewPDF?.Preclinical_Details[0]?.WBC_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>
                      {generalSetting?.WBC_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                  <Col span={12}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>- Tiểu cầu/PLT:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF &&
                          dataViewPDF?.Preclinical_Details[0]?.PLT_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>
                      {generalSetting?.PLT_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item label="Đường huyết">
                <Row gutter={[8, 0]}>
                  <Col span={12}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>Glucose</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF &&
                          dataViewPDF?.Preclinical_Details[0]?.Glucoses[0]
                            ?.GLUCOSE_HUNGRY}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>
                      {generalSetting?.GLUCOSE_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item label="Chức năng thận">
                <Row gutter={[8, 0]}>
                  <Col span={12}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>Urea:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF &&
                          dataViewPDF?.Preclinical_Details[0]?.Ure_Creatines[0]
                            ?.UREA_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>
                      {generalSetting?.UREA_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                  <Col span={12}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>Creatine:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF &&
                          dataViewPDF?.Preclinical_Details[0]?.Ure_Creatines[0]
                            ?.CREATINE_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>
                      {generalSetting?.CREATINE_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item label="Men gan">
                <Row gutter={[8, 0]}>
                  <Col span={12}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>SGOT:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF &&
                          dataViewPDF?.Preclinical_Details[0]?.Liver_Enzymes[0]
                            ?.SGOT_AST_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>
                      {generalSetting?.SGOT_AST_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                  <Col span={12}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>SGPT:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF &&
                          dataViewPDF?.Preclinical_Details[0]?.Liver_Enzymes[0]
                            ?.SGPT_ALT_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>
                      {generalSetting?.SGPT_ALT_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item label="Tổng phân tích nước tiểu">
                {dataViewPDF &&
                  dataViewPDF?.Preclinical_Details[0]?.URINALYSIS_RESULT}
              </Descriptions.Item>
            </Descriptions>

            <Space direction="vertical" size={4} className="title">
              <Space className="title" style={useStyles.margin}>
                <Typography.Title level={4}>
                  III. KẾT LUẬN CỦA BÁC SĨ CHUYÊN KHOA:
                </Typography.Title>
              </Space>

              <Typography.Paragraph
                strong
                style={{ fontSize: 16, padding: "0 0 24px 30px" }}
              >
                {dataViewPDF &&
                  dataViewPDF?.Physical_Exam_Results[0]?.GENERAL_RESULT}
              </Typography.Paragraph>
            </Space>
          </Col>
        </Row>
      </div>
      {/* <div ref={printPage2Ref}></div> */}
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
    </Spin>
  );
};

export default ShowInputMedicalDetailsPDF;
