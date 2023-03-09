import { Col, Row, Space } from "antd";
import icon_grey_profile from "../../../assets/images/icon_grey_profile.svg";
import icon_grey_calendar from "../../../assets/images/icon_grey_calendar.svg";
import icon_grey_gender from "../../../assets/images/icon_grey_gender.svg";
import icon_grey_type from "../../../assets/images/icon_grey_type.svg";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { employeeState } from "../../../recoil/atom/employeeState";
import moment from "moment";
import { dateFormat } from "../../../common";
import { authState } from "../../../recoil/atom/authState";
import { authData, employeeData } from "../../../common/getAllApi";
import { LoadingOutlined } from "@ant-design/icons";

const SmallLabel = ({ employeeInfo }) => {
  const [auth, setAuth] = useRecoilState(authState);
  const [employeeList, setEmployeeList] = useRecoilState(employeeState);
  const [employeeByUser, setEmployeeByUser] = useState(undefined);

  useEffect(() => {
    if (Object.getOwnPropertyNames(auth).length === 0) {
      authData(auth, setAuth);
    }
  }, [auth]);

  useEffect(() => {
    employeeData(employeeList, setEmployeeList);
  }, []);

  useEffect(() => {
    if (employeeList && auth) {
      const data = employeeList.filter(
        (item) => item.USER_ID === auth?.profile?.id
      );
      setEmployeeByUser(data[0]);
    }
  }, [employeeList]);

  const FULL_NAME = auth?.profile?.FIRST_NAME + " " + auth?.profile?.LAST_NAME;

  return (
    <div className="small-employee-information">
      <h1>Thông tin cá nhân</h1>
      <Row justify="center" gutter={[24, 24]}>
        <Col span={8}>
          <Space size={24} direction="vertical" style={{ width: "100%" }}>
            <Space size={24}>
              <img src={icon_grey_profile} alt="" />
              <p style={{ lineHeight: "20px" }}>
                Họ và Tên <br />{" "}
                <span style={{ fontWeight: 700 }}>
                  {FULL_NAME ? FULL_NAME : <LoadingOutlined />}
                </span>
              </p>
            </Space>
            <Space size={24}>
              <img src={icon_grey_profile} alt="" />
              <p style={{ lineHeight: "20px" }}>
                Mã số nhân viên <br />{" "}
                <span style={{ fontWeight: 700 }}>
                  {auth?.profile?.Employees[0]?.CD ? (
                    auth?.profile?.Employees[0]?.CD
                  ) : (
                    <LoadingOutlined />
                  )}
                </span>
              </p>
            </Space>
            <Space size={24}>
              <img src={icon_grey_calendar} alt="" />
              <p style={{ lineHeight: "20px" }}>
                Ngày sinh <br />{" "}
                <span style={{ fontWeight: 700 }}>
                  {auth ? (
                    moment(auth?.profile?.BOD).format(dateFormat)
                  ) : (
                    <LoadingOutlined />
                  )}
                </span>
              </p>
            </Space>
            <Space size={24}>
              <img src={icon_grey_gender} alt="" />
              <p style={{ lineHeight: "20px" }}>
                Giới tính <br />{" "}
                <span style={{ fontWeight: 700 }}>
                  {auth ? auth?.profile?.Gender?.NAME : <LoadingOutlined />}
                </span>
              </p>
            </Space>
            <Space size={24}>
              <img src={icon_grey_gender} alt="" />
              <p style={{ lineHeight: "20px" }}>
                Tình trạng hôn nhân <br />{" "}
                <span style={{ fontWeight: 700 }}>
                  {employeeByUser ? (
                    employeeByUser?.Marital_Status?.MARITAL_STATUS_NAME
                  ) : (
                    <LoadingOutlined />
                  )}
                </span>
              </p>
            </Space>
            <Space size={24}>
              <img src={icon_grey_gender} alt="" />
              <p style={{ lineHeight: "20px" }}>
                Loại nhân viên <br />{" "}
                <span style={{ fontWeight: 700 }}>
                  {/* {employeeByUser ? (
                    employeeByUser?.Marital_Status?.MARITAL_STATUS_NAME
                  ) : (
                    <LoadingOutlined />
                  )} */}
                </span>
              </p>
            </Space>
            <Space size={24}>
              <img src={icon_grey_profile} alt="" />
              <p style={{ lineHeight: "20px" }}>
                Ngày vào làm việc <br />{" "}
                <span style={{ fontWeight: 700 }}>
                  {employeeByUser ? (
                    moment(employeeByUser?.START_WORKING_DATE).format(
                      dateFormat
                    )
                  ) : (
                    <LoadingOutlined />
                  )}
                </span>
              </p>
            </Space>
          </Space>
        </Col>
        <Col span={8}>
          <Space size={24} direction="vertical" style={{ width: "100%" }}>
            <Space size={24}>
              <img src={icon_grey_profile} alt="" />
              <p style={{ lineHeight: "20px" }}>
                Khối <br />{" "}
                <span style={{ fontWeight: 700 }}>
                  {employeeByUser ? (
                    employeeByUser?.Area?.AREA_NAME
                  ) : (
                    <LoadingOutlined />
                  )}
                </span>
              </p>
            </Space>
            <Space size={24}>
              <img src={icon_grey_profile} alt="" />
              <p style={{ lineHeight: "20px" }}>
                Phòng ban <br />{" "}
                <span style={{ fontWeight: 700 }}>
                  {employeeByUser ? (
                    employeeByUser?.Department?.DEPARTMENT_NAME
                  ) : (
                    <LoadingOutlined />
                  )}
                </span>
              </p>
            </Space>
            <Space size={24}>
              <img src={icon_grey_calendar} alt="" />
              <p style={{ lineHeight: "20px" }}>
                Bộ phận <br />{" "}
                <span style={{ fontWeight: 700 }}>
                  {employeeByUser ? (
                    employeeByUser?.Division?.DIVISION_NAME
                  ) : (
                    <LoadingOutlined />
                  )}
                </span>
              </p>
            </Space>
            <Space size={24}>
              <img src={icon_grey_gender} alt="" />
              <p style={{ lineHeight: "20px" }}>
                Đơn vị <br />{" "}
                <span style={{ fontWeight: 700 }}>
                  {employeeByUser ? (
                    employeeByUser?.Unit?.UNIT_NAME
                  ) : (
                    <LoadingOutlined />
                  )}
                </span>
              </p>
            </Space>
            <Space size={24}>
              <img src={icon_grey_type} alt="" />
              <p style={{ lineHeight: "20px" }}>
                Cấp bậc <br />{" "}
                <span style={{ fontWeight: 700 }}>
                  {employeeByUser ? (
                    employeeByUser?.Position?.POSITION_NAME
                  ) : (
                    <LoadingOutlined />
                  )}
                </span>
              </p>
            </Space>
            <Space size={24}>
              <img src={icon_grey_type} alt="" />
              <p style={{ lineHeight: "20px" }}>
                Nơi làm việc <br />{" "}
                <span style={{ fontWeight: 700 }}>
                  {employeeByUser ? (
                    employeeByUser?.Workplace?.BRANCH_NAME
                  ) : (
                    <LoadingOutlined />
                  )}
                </span>
              </p>
            </Space>
            <Space size={24}>
              <img src={icon_grey_type} alt="" />
              <p style={{ lineHeight: "20px" }}>
                Tỉnh/Thành làm việc <br />{" "}
                <span style={{ fontWeight: 700 }}>
                  {employeeByUser ? (
                    employeeByUser?.City?.CITY_NAME
                  ) : (
                    <LoadingOutlined />
                  )}
                </span>
              </p>
            </Space>
          </Space>
        </Col>
        <Col span={8}>
          <Space size={24} direction="vertical" style={{ width: "100%" }}>
            <Space size={24}>
              <img src={icon_grey_profile} alt="" />
              <p style={{ lineHeight: "20px" }}>
                Nội dung khám <br />{" "}
                <span style={{ fontWeight: 700 }}>
                  {employeeInfo?.CONTENT
                    ? employeeInfo?.CONTENT
                    : "Khám sức khỏe đầu vào"}
                </span>
              </p>
            </Space>
            <Space size={24}>
              <img src={icon_grey_profile} alt="" />
              <p style={{ lineHeight: "20px" }}>
                Ngày khám <br />{" "}
                <span style={{ fontWeight: 700 }}>
                  {employeeInfo &&
                    moment(employeeInfo?.PHYSICAL_DATE).format(dateFormat)}
                </span>
              </p>
            </Space>
            <Space size={24}>
              <img src={icon_grey_profile} alt="" />
              <p style={{ lineHeight: "20px" }}>
                Nơi khám <br />{" "}
                <span style={{ fontWeight: 700 }}>
                  {employeeInfo && employeeInfo?.MEDICAL_FACILITY_NAME}
                </span>
              </p>
            </Space>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default SmallLabel;
