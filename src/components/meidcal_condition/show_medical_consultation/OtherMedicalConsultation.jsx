import { AutoComplete, Col, Row, Empty, TreeSelect } from "antd";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useDisease } from "../../../hooks/disease";
import {
  diseaseOptionsState,
  diseasesSelectState,
  diseasesState,
} from "../../../recoil/atom/diseaseState";
import BtnMedicalCondition from "../BtnMedicalCondition";
import icon_search_grey from "../../../assets/images/icon_search_grey.svg";
import { removeAccents, selectDiseases } from "../../../common";
import Input from "antd/lib/input/Input";
import { useSearch } from "react-use-search";
import "./otherMedical.scss";
import "./style.scss";
import { useEffect } from "react";
import icon_empty from "../../../assets/images/icon_empty.svg";
import { diseasesData } from "../../../common/getAllApi";

const predicate = (diseaseModified, query) => {
  const newQuery = removeAccents(String(query)).toLowerCase().trim();

  const DISEASE_NAME = removeAccents(String(diseaseModified.label))
    .toLowerCase()
    .trim();
  return DISEASE_NAME.includes(newQuery);
};

const OtherMedicalConsultation = () => {
  const diseaseOptions = useRecoilValue(diseaseOptionsState);
  const [diseases, setDiseases] = useRecoilState(diseasesState);

  const [diseaseSelectOption, setDiseaseSelectOption] =
    useRecoilState(diseasesSelectState);

  const [diseaseModified, setDiseaseModified] = useState([]);
  const [treeSelectDisease, setTreeSelectDisease] = useState("");

  useEffect(() => {
    if (diseases.length === 0) {
      diseasesData(diseases, setDiseases);
    }
  }, [diseases]);

  useEffect(() => {
    if (diseases.length) {
      setDiseaseModified(selectDiseases(diseases));
    } else {
      setDiseaseModified([]);
    }
  }, [diseases]);

  const [filteredDivisions, query, handleChange, setQuery] = useSearch(
    diseaseModified,
    predicate,
    { debounce: 200 }
  );

  console.log("diseaseSelectOption", diseaseSelectOption);

  const handleSelectDisease = (data, option) => {
    setDiseaseSelectOption(option);
  };

  const handleClear = () => {
    setDiseaseSelectOption(undefined);
    setTreeSelectDisease(undefined);
  };

  const handleTreeSelecDisease = (data, option) => {
    setTreeSelectDisease(option);
  };

  const handleSearchMedical = () => {
    if (!treeSelectDisease) return;
    setDiseaseSelectOption(treeSelectDisease);
  };

  const htmlContent =
    diseaseSelectOption?.Medical_Consultation_Diseases[0]?.Medical_Consultation
      ?.CONTENT;

  const showContent =
    diseaseSelectOption?.Medical_Consultation_Diseases[0]?.Medical_Consultation
      ?.DISPLAY_STATUS;

  return (
    <div className="other-medical-consultation">
      <Row className="search-disease">
        <Col span={24}>
          <Row>
            <Col span={12} style={{ paddingRight: 40 }}>
              <p className="title-search">Tìm bệnh lý theo từ khóa</p>
              <div className="input-search" style={{ width: "100%" }}>
                <AutoComplete
                  style={{ width: "100%" }}
                  options={filteredDivisions}
                  onChange={handleChange}
                  onSelect={handleSelectDisease}
                  onClear={handleClear}
                  allowClear
                  placeholder="Nhập tên bệnh tại đây..."
                >
                  <Input />
                </AutoComplete>
                <img src={icon_search_grey} alt="" />
              </div>
            </Col>
            <Col span={12}>
              <p className="title-search">
                Tìm bệnh lý cần tư vấn theo danh sách có sẵn
              </p>
              <div className="select-disease">
                <label style={{ marginBottom: 10 }}>Bệnh lý</label>
                <TreeSelect
                  style={{ width: "100%" }}
                  treeData={diseaseOptions}
                  allowDrop={false}
                  showSearch
                  filterTreeNode={(input, item) =>
                    (item?.title ?? "")
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  allowClear
                  placeholder="Chọn tên bệnh tại đây"
                  onSelect={handleTreeSelecDisease}
                  onClear={handleClear}
                />
              </div>
              <Row style={{ display: "flex", justifyContent: "center" }}>
                <Col>
                  <BtnMedicalCondition
                    title="Tìm kiếm"
                    onOk={handleSearchMedical}
                    bg_color="primary-default-bg"
                    text_color="text-white"
                    border="border-none"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      {diseaseSelectOption ? (
        <Row className="medical-consultation-content">
          <Col span={24}>
            <Row style={{ marginBottom: 40 }}>
              <Col span={24}>
                <h1 className="text-title-h1">
                  Kết quả thông tin tư vấn cho <br />
                  <span className="name-title">
                    {diseaseSelectOption?.NAME}
                  </span>
                </h1>
              </Col>
            </Row>
            {showContent === 1 ? (
              <Row className="disease-info-wrapper">
                <Col>
                  <div
                    className="html-content"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                </Col>
              </Row>
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
                  Hiện tại chưa có thông tin tư vấn về bệnh lý này. Vui lòng
                  quay lại sau!!
                </h3>
              </Row>
            )}
          </Col>
        </Row>
      ) : (
        <Row className="medical-consultation-content">
          <Col span={24}>
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
                Vui lòng chọn bệnh lý cần tư vấn
              </h3>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default OtherMedicalConsultation;
