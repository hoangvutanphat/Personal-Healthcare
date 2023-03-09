import React, { useEffect, useState } from "react";
import { Button, Col, Row, Select, Space, Table, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import BtnShowDetail from "./BtnShowDetail";
import BtnMedicalCondition from "./BtnMedicalCondition";
import { useDiseaseStatus } from "../../hooks/diseaseStatus";
import { selectOptions } from "../../common";
import icon_arrow_down from "../../assets/images/icon_arrow_down.svg";
import icon_sum from "../../assets/images/icon_sum.svg";
import icon_refresh from "../../assets/images/icon_refresh.svg";
import icon_close from "../../assets/images/icon_close.svg";
import useConfirmDelete from "../../hooks/useConfirmDelete";
import "./style.scss";
const { Title } = Typography;

const TblMedicalCondition = ({
  medicalCondition,
  beingTreateds,
  listCureds,
  hadSurgerys,
  others,
  onShowList,
  onUpdate,
  onCancel,
  isTableStatus,
  onShow,
}) => {
  const { diseasesStatus } = useDiseaseStatus();

  const [diseaseStatusOption, setDiseaseStatusOption] = useState([]);

  useEffect(() => {
    if (diseasesStatus && diseasesStatus.length > 0) {
      setDiseaseStatusOption(selectOptions(diseasesStatus));
    } else {
      setDiseaseStatusOption([]);
    }
  }, [diseasesStatus]);

  const handleDelete = () => {
    alert("delete ok");
  };

  const { confirm } = useConfirmDelete(
    handleDelete,
    "Bạn có chắc muốn xóa bệnh này?"
  );

  const columns = [
    {
      title: "STT",
      width: "5%",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên bệnh",
      render: (record) => <>{record?.DISEASE_NAME}</>,
      width: "40%",
      align: "left",
    },
    {
      title: "Thời gian phát hiện",
      render: (_, record) => (
        <>
          {record.START_DATE !== null &&
            new Date(record.START_DATE).toLocaleDateString("en-GB")}
        </>
      ),
      width: "25%",
      align: "left",
    },
    {
      title: "Tình trạng hiện tại",
      width: "25%",
      align: "left",
      render: (_, record) => (
        <>
          <Select
            allowClear
            options={diseaseStatusOption}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            style={{ width: "100%" }}
            value={record?.Disease_Status?.NAME}
          ></Select>
        </>
      ),
    },
    {
      title: "",
      width: "5%",
      align: "left",
      render: (record) => (
        <>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            className={"delete-btn"}
            onClick={() => confirm(record.id)}
          />
        </>
      ),
    },
  ];
  // console.log("medicalCondition:", medicalCondition);
  return (
    <div className="medical-condition-wrapper">
      <Row justify="space-between" className="medical-condition-header">
        <Col>
          <Title className="medical-title">Tình trạng bệnh lý của bạn</Title>
        </Col>
        <Col>
          <BtnMedicalCondition
            onOk={onShowList}
            title={
              isTableStatus === false
                ? "Thêm bệnh lý"
                : "Cập nhật tình trạng bệnh lý"
            }
            icon_btn={icon_sum}
          />
        </Col>
      </Row>
      {isTableStatus ? (
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Tình trạng hiện tại</th>
              <th scope="col">Số bệnh</th>
              <th scope="col">Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {beingTreateds.length > 0 && (
              <tr>
                <td>Đang điều trị</td>
                <td>{beingTreateds.length}</td>
                <td style={{ width: "33%" }}>
                  {" "}
                  <div onClick={() => onShow(beingTreateds)}>
                    <BtnShowDetail icon_arrow={icon_arrow_down} />
                  </div>
                </td>
              </tr>
            )}
            {listCureds.length > 0 && (
              <tr>
                <td>Đã khỏi</td>
                <td>{listCureds.length}</td>
                <td>
                  {" "}
                  <div onClick={() => onShow(listCureds)}>
                    <BtnShowDetail icon_arrow={icon_arrow_down} />
                  </div>
                </td>
              </tr>
            )}
            {hadSurgerys.length > 0 && (
              <tr>
                <td>Đã phẫu thuật</td>
                <td>{hadSurgerys.length} </td>
                <td>
                  {" "}
                  <div onClick={() => onShow(hadSurgerys)}>
                    <BtnShowDetail icon_arrow={icon_arrow_down} />
                  </div>
                </td>
              </tr>
            )}
            {others.length > 0 && (
              <tr>
                <td>Khác</td>
                <td>{others.length} </td>
                <td>
                  {" "}
                  <div onClick={() => onShow(others)}>
                    <BtnShowDetail icon_arrow={icon_arrow_down} />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <Row style={{ marginTop: 24 }}>
          <Col>
            <Table
              columns={columns}
              dataSource={medicalCondition}
              pagination={false}
            />
            <div className="flex-center my-4">
              <BtnMedicalCondition
                onOk={onUpdate}
                title="Cập nhật"
                icon_btn={icon_refresh}
                bg_color="primary-default-bg"
                text_color="text-white"
                border="border-none"
              />
              <BtnMedicalCondition
                title="Đóng"
                icon_btn={icon_close}
                onOk={onCancel}
              />
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default TblMedicalCondition;
