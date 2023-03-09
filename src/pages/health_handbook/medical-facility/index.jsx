import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { removeAccents } from "../../../common";
import BreadcrumbProvider from "../../../components/globals/Breadcrumb";
import ListMedicalFacility from "../../../components/HealthHandbooks/MedicalFacility/ListMedicalFacility";
import SearchMedicalFacility from "../../../components/HealthHandbooks/MedicalFacility/SearchMedicalFacility";
import { ROUTES } from "../../../constant/router";
import { useMedicalFacility } from "../../../hooks/medicalFacility";
import "./style.scss";
const MedicalFacility = () => {
  const itemBreadcrumb = [
    {
      label: "Cơ sở khám chữa bệnh uy tín",
      link: ROUTES.HEALTH_HANDBOOK.MEDICAL_FACILITY.path,
    },
  ];
  const [filterEmployee, setFilterEmployee] = useState([]);
  const [filterResultList, setFilterResultList] = useState(undefined);
  const { medicalFacilities, isLoading } = useMedicalFacility();

  const [datas, setDatas] = useState([]);
  //pagination
  // const [state, setState] = useState({
  //   data: [],
  //   totalPage: 0,
  //   current: 1,
  //   minIndex: 0,
  //   maxIndex: 0,
  // });

  // useEffect(() => {
  //   if (datas) {
  //     setState({
  //       data: datas,
  //       totalPage: datas.length / pageSize,
  //       minIndex: 0,
  //       maxIndex: pageSize,
  //     });
  //   }
  // }, [datas]);

  // const handleChange = (page) => {
  //   setState({
  //     data: datas,
  //     current: page,
  //     minIndex: (page - 1) * pageSize,
  //     maxIndex: page * pageSize,
  //   });
  // };
  // const { data, current, minIndex, maxIndex } = state;
  // //pagination
  const checkFilterList = (a, b) => {
    return a ? a : b;
  };
  //Filter search
  useEffect(() => {
    if (
      filterEmployee?.NAME ||
      filterEmployee?.SOCIAL_CD ||
      filterEmployee?.CITY_ID ||
      filterEmployee?.DISTRICT_ID ||
      filterEmployee?.MEDICAL_TYPE ||
      filterEmployee?.TECHNICAL_AREA ||
      filterEmployee?.LEVEL ||
      filterEmployee?.MEDICAL_MODEL ||
      filterEmployee?.TREATMENT_TYPE ||
      filterEmployee?.DIRECT_INSURANCE
    ) {
      let newDatas = undefined;
      // FILTER BY FIRST_NAME
      if (filterEmployee?.NAME) {
        let tempDatas = [];
        checkFilterList(newDatas, medicalFacilities).forEach((item, index) => {
          const dataOfList = removeAccents(
            String(item?.NAME).toLowerCase().trim()
          );
          const keyWord = removeAccents(
            filterEmployee.NAME.toLowerCase().trim()
          );
          const isMatching = dataOfList.includes(keyWord);
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY SOCIAL_CD
      if (filterEmployee?.SOCIAL_CD) {
        let tempDatas = [];
        checkFilterList(newDatas, medicalFacilities).forEach((item, index) => {
          const dataOfList = String(item.SOCIAL_CD).toLowerCase().trim();
          const keyWord = filterEmployee.SOCIAL_CD.toLowerCase().trim();
          const isMatching = dataOfList.includes(keyWord);
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY CITY
      if (filterEmployee?.CITY_ID) {
        let tempDatas = [];
        checkFilterList(newDatas, medicalFacilities).forEach((item, index) => {
          const dataOfList = item.CITY_ID;
          const keyWord = filterEmployee.CITY_ID;
          const isMatching = dataOfList === keyWord;
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY DISTRICT_ID
      if (filterEmployee?.DISTRICT_ID) {
        let tempDatas = [];
        checkFilterList(newDatas, medicalFacilities).forEach((item, index) => {
          const dataOfList = item.DISTRICT_ID;
          const keyWord = filterEmployee.DISTRICT_ID;
          const isMatching = dataOfList === keyWord;
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY MEDICAL_TYPE
      if (filterEmployee?.MEDICAL_TYPE) {
        let tempDatas = [];
        checkFilterList(newDatas, medicalFacilities).forEach((item, index) => {
          const dataOfList = item.MEDICAL_TYPE;
          const keyWord = filterEmployee.MEDICAL_TYPE;
          const isMatching = dataOfList === keyWord;
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY TECHNICAL_AREA
      if (filterEmployee?.TECHNICAL_AREA) {
        let tempDatas = [];
        checkFilterList(newDatas, medicalFacilities).forEach((item, index) => {
          const dataOfList = item.TECHNICAL_AREA;
          const keyWord = filterEmployee.TECHNICAL_AREA;
          const isMatching = dataOfList === keyWord;
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // // FILTER BY LEVEL
      if (filterEmployee?.LEVEL) {
        let tempDatas = [];
        checkFilterList(newDatas, medicalFacilities).forEach((item, index) => {
          const dataOfList = item.LEVEL;
          const keyWord = filterEmployee.LEVEL;
          const isMatching = dataOfList === keyWord;
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // // FILTER BY MEDICAL_MODEL
      if (filterEmployee?.MEDICAL_MODEL) {
        let tempDatas = [];
        checkFilterList(newDatas, medicalFacilities).forEach((item, index) => {
          const dataOfList = item.MEDICAL_MODEL;
          const keyWord = filterEmployee.MEDICAL_MODEL;
          const isMatching = dataOfList === keyWord;
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // // FILTER BY TREATMENT_TYPE
      if (filterEmployee?.TREATMENT_TYPE) {
        let tempDatas = [];
        checkFilterList(newDatas, medicalFacilities).forEach((item, index) => {
          const dataOfList = item.TREATMENT_TYPE;
          const keyWord = filterEmployee.TREATMENT_TYPE;
          const isMatching = dataOfList === keyWord;
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }

      // FILTER BY DIRECT_INSURANCE
      if (filterEmployee?.DIRECT_INSURANCE) {
        let tempDatas = [];
        checkFilterList(newDatas, medicalFacilities).forEach((item, index) => {
          const dataOfList = item.DIRECT_INSURANCE.toString();
          const keyWord = filterEmployee.DIRECT_INSURANCE.toString();
          const isMatching = dataOfList === keyWord;
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      setFilterResultList(newDatas);
    } else {
      setFilterResultList(undefined);
    }
  }, [filterEmployee]);

  useEffect(() => {
    if (filterResultList) {
      setDatas(filterResultList);
    } else {
      setDatas(medicalFacilities);
    }
  }, [filterResultList, medicalFacilities]);
  return (
    <>
      <BreadcrumbProvider item={itemBreadcrumb} />
      <div className="container-fluid page-container">
        <div className="container">
          <div className="search">
            <SearchMedicalFacility setFilterEmployee={setFilterEmployee} />
          </div>
          {/* {data &&
            data.map(
              (value, index) =>
                index >= minIndex &&
                index < maxIndex && (
                  <div className="facility">
                    <ListMedicalFacility
                      id={value?.id}
                      NameFacility={value?.NAME}
                      specialName={value?.SPECIAL_DEP_NAME}
                      address={value?.ADDRESS}
                      phone={value?.PHONE}
                      treatment={
                        value?.TREATMENT_TYPE === 1
                          ? "Nội trú"
                          : value?.TREATMENT_TYPE === 2
                          ? "Ngoại trú"
                          : "Nội ngoại trú"
                      }
                    />
                  </div>
                )
            )} */}
          {/* <Pagination
            pageSize={pageSize}
            defaultCurrent={current}
            total={datas?.length}
            onChange={handleChange}
            style={{ bottom: "0px" }}
          /> */}
          <div className="facility">
            <ListMedicalFacility isLoading={isLoading} datas={datas} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicalFacility;
