import { UploadOutlined } from "@ant-design/icons";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { Button, Col, Form, Input, Modal, Row, Typography, Upload } from "antd";
import { Logger } from "logging-library";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { FileViewer } from "react-file-viewer";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import bloodLipidApi from "../../api/bloodLipidApi";
import generalSettingsApi from "../../api/generalSettingsApi";
import glucoseApi from "../../api/glucoseApi";
import liverEnzymeApi from "../../api/liverEnzymeApi";
import preclinicalDetailFileApi from "../../api/preclinicalDetailFileApi";
import preclinicalDetailUserAddedApi from "../../api/preclinicalDetailUserAdded";
import preclinicalDetailApi from "../../api/preclinicDetailApi";
import ureCreatineApi from "../../api/ureCreatineApi";
import { CustomErrorComponent } from "custom-error";
import { getBase64 } from "../../common";
import {
  dynamicSubClinicalExamSelectState,
  imageDiagnosticCreateState,
  subClinicalExamMatchState,
  testDiagnosticCreateState,
} from "../../recoil/atom/dynamicSubClinicalExamState";
import { newestPreclinicalDetailState } from "../../recoil/atom/perclinicalDetailState";
import {
  newestPhysicalExamState,
  physicalExamSelectState,
} from "../../recoil/atom/physicalExamState";
import { tabActiveState } from "../../recoil/atom/tabActiveState";
import SubClinicalExamSelcetModal from "../HealthHandbooks/SelfSpecialMedicalExamination/SubClinicalExamSelcetModal";

const { Title } = Typography;

const validateMessages = {
  required: "Trường này không được để trống!",
};

const SubClinicalExaminationForm = ({
  onKeyChange,
  reload,
  formRef,
  setFileList,
  fileList,
}) => {
  const [form] = Form.useForm();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  let index = 0;
  const regex = /^-?\d+\.?\d*$/;
  const storage = process.env.REACT_APP_BASE_URL + "/files";

  const [tabActive, setTabActive] = useRecoilState(tabActiveState);
  const subClinicalExamSelect = useRecoilValue(subClinicalExamMatchState);
  const setSubClinicalExamSelect = useSetRecoilState(
    dynamicSubClinicalExamSelectState
  );
  const [imageDiagnosticCreate, setImageDiagnosticCreate] = useRecoilState(
    imageDiagnosticCreateState
  );
  const [testDiagnosticCreate, setTestDiagnosticCreate] = useRecoilState(
    testDiagnosticCreateState
  );
  const physicalExam = useRecoilValue(physicalExamSelectState);
  const newestPhysicalExam = useRecoilValue(newestPhysicalExamState);
  const newestPreclinicalDetail = useRecoilValue(newestPreclinicalDetailState);

  const [openModal, setOpenModal] = useState(false);
  const [preclinicalDetail, setPreclinicalDetail] = useState();
  const [preclinicDetail, setPreclinicDetail] = useState(undefined);

  const [type, setType] = useState(undefined);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const res = await generalSettingsApi.getAllGeneralSettings();
        if (res.data) {
          const data = res.data.elements.generalSetting;
          form.setFieldsValue({
            ...data,
            BONE_DENSITY_UNIT_DEFAULT: "SD",
            BONE_DENSITY_MIN: -1,
          });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [form]);

  useEffect(() => {
    if (physicalExam?.Preclinical_Details[0]?.id) {
      (async () => {
        const id = physicalExam?.Preclinical_Details[0]?.id;
        const res = await preclinicalDetailApi.getPreclinicalDetailById(id);
        if (res.data) {
          setPreclinicDetail(res.data.elements.preclinicalDetail);
        }
      })();
    }
  }, [physicalExam]);

  useEffect(() => {
    if (!physicalExam && !tabActive.conclusions) {
      (async () => {
        try {
          let res = await preclinicalDetailApi.getPreclinicalDetailById(
            newestPreclinicalDetail.id
          );
          if (res.data) {
            setPreclinicalDetail(res.data.elements.preclinicalDetail);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [physicalExam, tabActive.conclusions, newestPreclinicalDetail]);
  useEffect(() => {
    if (physicalExam) {
      if (physicalExam?.Preclinical_Details?.length) {
        const preclinicalDetails = physicalExam.Preclinical_Details[0];
        let imageDiagnosticList = [];
        let testDiagnosticList = [];
        if (
          preclinicalDetails.STOMACH_ULTRA_SOUND_DESC ||
          preclinicalDetails.STOMACH_ULTRA_SOUND_RESULT
        ) {
          imageDiagnosticList.push(1);
        }
        if (
          preclinicalDetails.THYROID_ULTRA_SOUND_DESC ||
          preclinicalDetails.THYROID_ULTRA_SOUND_RESULT
        ) {
          imageDiagnosticList.push(2);
        }
        if (
          preclinicalDetails.MAMMARY_ULTRA_SOUND_DESC ||
          preclinicalDetails.MAMMARY_ULTRA_SOUND_RESULT
        ) {
          imageDiagnosticList.push(3);
        }
        if (
          preclinicalDetails.HEART_ULTRA_SOUND_DESC ||
          preclinicalDetails.HEART_ULTRA_SOUND_RESULT
        ) {
          imageDiagnosticList.push(4);
        }
        if (preclinicalDetails.ECG_DESC || preclinicalDetails.ECG_RESULT) {
          imageDiagnosticList.push(5);
        }
        if (preclinicalDetails.XRAY_DESC || preclinicalDetails.XRAY_RESULT) {
          imageDiagnosticList.push(6);
        }
        if (preclinicalDetails.PAP_SMEAR_RESULT) {
          imageDiagnosticList.push(7);
        }
        if (
          preclinicalDetails.BONE_DENSITY_RATING ||
          preclinicalDetails.BONE_DENSITY_RESULT
        ) {
          testDiagnosticList.push(11);
        }
        if (
          preclinicalDetails.BLOOD_RESULT ||
          preclinicalDetails.WBC_RESULT ||
          preclinicalDetails.RBC_RESULT ||
          preclinicalDetails.HGB_RESULT ||
          preclinicalDetails.HCT_RESULT ||
          preclinicalDetails.MCV_RESULT ||
          preclinicalDetails.MCH_RESULT ||
          preclinicalDetails.PLT_RESULT
        ) {
          testDiagnosticList.push(12);
        }
        if (preclinicalDetails.Glucoses.length) {
          testDiagnosticList.push(13);
        }
        if (preclinicalDetails.Ure_Creatines.length) {
          testDiagnosticList.push(14);
        }
        if (preclinicalDetails.Liver_Enzymes.length) {
          testDiagnosticList.push(15);
        }
        if (preclinicalDetails.Blood_Lipids.length) {
          testDiagnosticList.push(16);
        }
        if (preclinicalDetails.URINALYSIS_RESULT) {
          testDiagnosticList.push(17);
        }
        if (preclinicalDetails.BLOOD_CALCIUM_RESULT) {
          testDiagnosticList.push(18);
        }
        if (preclinicalDetails?.Preclinical_Detail_User_Addeds?.length) {
          const data = preclinicalDetails.Preclinical_Detail_User_Addeds;
          setImageDiagnosticCreate(() => {
            const result = data
              .filter((item) => item.TYPE === 1)
              .map((item) => ({ ...item, label: item.NAME }));
            return result;
          });
          setTestDiagnosticCreate(() => {
            const result = data
              .filter((item) => item.TYPE === 2)
              .map((item) => ({ ...item, label: item.NAME }));
            return result;
          });
        }
        setSubClinicalExamSelect(() => [
          ...imageDiagnosticList,
          ...testDiagnosticList,
        ]);
        const glucosesData = preclinicalDetails.Glucoses.length
          ? preclinicalDetails.Glucoses[0]
          : "";
        const ureCreatinesData = preclinicalDetails.Ure_Creatines.length
          ? preclinicalDetails.Ure_Creatines[0]
          : "";
        const liverEnzymesData = preclinicalDetails.Liver_Enzymes.length
          ? preclinicalDetails.Liver_Enzymes[0]
          : "";
        const bloodLipidsData = preclinicalDetails.Blood_Lipids.length
          ? preclinicalDetails.Blood_Lipids[0]
          : "";
        form.setFieldsValue({
          ...preclinicalDetails,
          ...glucosesData,
          ...ureCreatinesData,
          ...liverEnzymesData,
          ...bloodLipidsData,
          GLUCOSE_UNIT_DEFAULT: glucosesData?.DEFAULT_UNIT,
          GLUCOSE_MIN: glucosesData?.GLUCOSE_HUNGRY_REFERENCE_MIN,
          GLUCOSE_MAX: glucosesData?.GLUCOSE_HUNGRY_REFERENCE_MAX,
          UREA_UNIT_DEFAULT: ureCreatinesData?.UREA_DEFAULT_UNIT,
          CREATINE_UNIT_DEFAULT: ureCreatinesData?.CREATINE_DEFAULT_UNIT,
          UREA_MIN: ureCreatinesData.UREA_REFERENCE_MIN,
          UREA_MAX: ureCreatinesData.UREA_REFERENCE_MAX,
          CREATINE_MIN: ureCreatinesData.CREATINE_REFERENCE_MIN,
          CREATINE_MAX: ureCreatinesData.CREATINE_REFERENCE_MAX,
          SGOT_AST_UNIT_DEFAULT: liverEnzymesData?.SGOT_AST_DEFAULT_UNIT,
          SGPT_ALT_UNIT_DEFAULT: liverEnzymesData?.SGPT_ALT_DEFAULT_UNIT,
          SGOT_AST_MIN: liverEnzymesData?.SGOT_AST_REFERENCE_MIN,
          SGOT_AST_MAX: liverEnzymesData?.SGOT_AST_REFERENCE_MAX,
          SGPT_ALT_MIN: liverEnzymesData?.SGPT_ALT_REFERENCE_MIN,
          SGPT_ALT_MAX: liverEnzymesData?.SGPT_ALT_REFERENCE_MAX,
          CHOLESTEROL_UNIT_DEFAULT: bloodLipidsData?.CHOLESTEROL_DEFAULT_UNIT,
          HDL_UNIT_DEFAULT: bloodLipidsData?.HDL_DEFAULT_UNIT,
          LDL_UNIT_DEFAULT: bloodLipidsData?.LDL_DEFAULT_UNIT,
          TRIGLYCERIDE_UNIT_DEFAULT: bloodLipidsData?.TRIGLYCERIDE_DEFAULT_UNIT,
          CHOLESTEROL_MIN: bloodLipidsData.CHOLESTEROL_REFERENCE_MIN,
          CHOLESTEROL_MAX: bloodLipidsData.CHOLESTEROL_REFERENCE_MAX,
          HDL_MIN: bloodLipidsData.HDL_REFERENCE_MIN,
          HDL_MAX: bloodLipidsData.HDL_REFERENCE_MAX,
          LDL_MIN: bloodLipidsData.LDL_REFERENCE_MIN,
          LDL_MAX: bloodLipidsData.LDL_REFERENCE_MAX,
          TRIGLYCERIDE_MIN: bloodLipidsData.TRIGLYCERIDE_REFERENCE_MIN,
          TRIGLYCERIDE_MAX: bloodLipidsData.TRIGLYCERIDE_REFERENCE_MAX,
        });
      }
    }
  }, [physicalExam, form]);
  useEffect(() => {
    if (preclinicalDetail) {
      if (preclinicalDetail?.Preclinical_Detail_User_Addeds?.length) {
        const data = preclinicalDetail.Preclinical_Detail_User_Addeds;
        setImageDiagnosticCreate(() => {
          const result = data
            .filter((item) => item.TYPE === 1)
            .map((item) => ({ ...item, label: item.NAME }));
          return result;
        });
        setTestDiagnosticCreate(() => {
          const result = data
            .filter((item) => item.TYPE === 2)
            .map((item) => ({ ...item, label: item.NAME }));
          return result;
        });
      }
    }
  }, [preclinicalDetail]);
  useEffect(() => {
    if (imageDiagnosticCreate.length || testDiagnosticCreate.length) {
      const imgDiagnosticData = imageDiagnosticCreate?.map((item, index) => ({
        [`DESC_${index}`]: item?.DESC,
        [`CONCLUSION_${index}`]: item?.CONCLUSION,
        id: item.id,
      }));
      const testDiagnosticData = testDiagnosticCreate?.map((item, index) => ({
        [`RESULT_${index}`]: item?.RESULT,
        [`UNIT_${index}`]: item?.UNIT,
        [`REFERENCE_MIN_${index}`]: item?.REFERENCE_MIN,
        [`REFERENCE_MAX_${index}`]: item?.REFERENCE_MAX,
        id: item.id,
      }));
      form.setFieldsValue({
        imgDiagnostic: Object.assign({}, ...imgDiagnosticData),
        testDiagnostic: Object.assign({}, ...testDiagnosticData),
      });
    }
  }, [form, imageDiagnosticCreate, testDiagnosticCreate]);

  useEffect(() => {
    if (preclinicDetail?.Preclinical_Detail_Files?.length > 0) {
      let temporary = preclinicDetail?.Preclinical_Detail_Files?.map(
        (element) => ({
          id: element.id,
          name: element.NAME,
          status: "done",
          url: storage + "/" + element.NAME,
        })
      );
      setFileList(temporary);
    }
  }, [preclinicDetail]);

  const onChange = async ({ fileList: newFileList, file }) => {
    let newImage = [...newFileList];

    if (file.status !== "removed") {
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        return;
      }
    }

    // if (file.status === "error") {
    if (file.status === "uploading") {
      if (newImage && newImage.length > 0) {
        newImage[newFileList.length - 1].status = "success";
      }
      let formData = new FormData();
      if (file && file.originFileObj) {
        formData.append("file", file?.originFileObj);
      }
      formData.append(
        "PRECLINICAL_DETAIL_ID",
        physicalExam
          ? physicalExam?.Preclinical_Details[0]?.id
          : newestPreclinicalDetail?.id
      );
      const newPreclinicalFile =
        await preclinicalDetailFileApi.createPreclinicalDetailFile(formData);
      newImage[newFileList.length - 1] = {
        ...newPreclinicalFile?.data?.elements,
        name: newPreclinicalFile?.data?.elements?.NAME,
        status: "done",
        url: storage + "/" + newPreclinicalFile?.data?.elements?.NAME,
      };
    }
    if (file.status === "removed") {
      try {
        await preclinicalDetailFileApi.deletePreclinicalDetailFile(file.id);
      } catch (error) {
        console.log("error");
      }
    }
    setFileList(newImage);
  };
  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      enqueueSnackbar("File tải lên phải nhỏ hơn 5MB!", { variant: "error" });
    }

    return isLt2M;
  };
  const getFileExtension = (filename) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  const onError = (e) => {
    Logger.logError(e, "error in file-viewer");
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    const getFileType = getFileExtension(file.url || file.preview);
    if (getFileType) {
      setType(getFileType?.[0]);
    }

    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
    setPreviewOpen(true);
  };

  const handleCancel = () => {
    setPreviewOpen(false);
    setPreviewImage(undefined);
    setType(undefined);
    setPreviewTitle(undefined);
  };

  const handleSubmitData = () => {
    const data = { ...form.getFieldsValue() };

    const glucoseData = {
      EXAM_DATE: physicalExam
        ? physicalExam.PHYSICAL_DATE
        : newestPhysicalExam.PHYSICAL_DATE,
      PRECLINICAL_DETAIL_ID: physicalExam
        ? physicalExam.Preclinical_Details[0]?.id
        : newestPreclinicalDetail.id,
      GLUCOSE_HUNGRY: Number(data?.GLUCOSE_HUNGRY),
      DEFAULT_UNIT: data?.GLUCOSE_UNIT_DEFAULT,
      GLUCOSE_HUNGRY_REFERENCE_MIN: Number(data?.GLUCOSE_MIN),
      GLUCOSE_HUNGRY_REFERENCE_MAX: Number(data?.GLUCOSE_MAX),
    };
    const liverEnzymeData = {
      EXAM_DATE: physicalExam
        ? physicalExam.PHYSICAL_DATE
        : newestPhysicalExam.PHYSICAL_DATE,
      PRECLINICAL_DETAIL_ID: physicalExam
        ? physicalExam.Preclinical_Details[0]?.id
        : newestPreclinicalDetail.id,
      SGOT_AST_DEFAULT_UNIT: data?.SGOT_AST_UNIT_DEFAULT,
      SGPT_ALT_DEFAULT_UNIT: data?.SGPT_ALT_UNIT_DEFAULT,
      SGOT_AST_RESULT: Number(data?.SGOT_AST_RESULT),
      SGPT_ALT_RESULT: Number(data?.SGPT_ALT_RESULT),
      SGOT_AST_REFERENCE_MIN: Number(data?.SGOT_AST_MIN),
      SGOT_AST_REFERENCE_MAX: Number(data?.SGOT_AST_MAX),
      SGPT_ALT_REFERENCE_MIN: Number(data?.SGPT_ALT_MIN),
      SGPT_ALT_REFERENCE_MAX: Number(data?.SGPT_ALT_MAX),
    };
    const ureCreatineData = {
      EXAM_DATE: physicalExam
        ? physicalExam.PHYSICAL_DATE
        : newestPhysicalExam.PHYSICAL_DATE,
      PRECLINICAL_DETAIL_ID: physicalExam
        ? physicalExam.Preclinical_Details[0]?.id
        : newestPreclinicalDetail.id,
      UREA_DEFAULT_UNIT: data?.UREA_UNIT_DEFAULT,
      CREATINE_DEFAULT_UNIT: data?.CREATINE_UNIT_DEFAULT,
      UREA_RESULT: Number(data?.UREA_RESULT),
      CREATINE_RESULT: Number(data?.CREATINE_RESULT),
      UREA_REFERENCE_MIN: Number(data.UREA_MIN),
      UREA_REFERENCE_MAX: Number(data.UREA_MAX),
      CREATINE_REFERENCE_MIN: Number(data.CREATINE_MIN),
      CREATINE_REFERENCE_MAX: Number(data.CREATINE_MAX),
    };
    const bloodLipidData = {
      EXAM_DATE: physicalExam
        ? physicalExam.PHYSICAL_DATE
        : newestPhysicalExam.PHYSICAL_DATE,
      PRECLINICAL_DETAIL_ID: physicalExam
        ? physicalExam.Preclinical_Details[0]?.id
        : newestPreclinicalDetail.id,
      CHOLESTEROL_DEFAULT_UNIT: data?.CHOLESTEROL_UNIT_DEFAULT,
      HDL_DEFAULT_UNIT: data?.HDL_UNIT_DEFAULT,
      LDL_DEFAULT_UNIT: data?.LDL_UNIT_DEFAULT,
      TRIGLYCERIDE_DEFAULT_UNIT: data?.TRIGLYCERIDE_UNIT_DEFAULT,
      CHOLESTEROL_RESULT: Number(data?.CHOLESTEROL_RESULT),
      HDL_RESULT: Number(data?.HDL_RESULT),
      LDL_RESULT: Number(data?.LDL_RESULT),
      TRIGLYCERIDE_RESULT: Number(data?.TRIGLYCERIDE_RESULT),
      CHOLESTEROL_REFERENCE_MIN: Number(data.CHOLESTEROL_MIN),
      CHOLESTEROL_REFERENCE_MAX: Number(data.CHOLESTEROL_MAX),
      HDL_REFERENCE_MIN: Number(data.HDL_MIN),
      HDL_REFERENCE_MAX: Number(data.HDL_MAX),
      LDL_REFERENCE_MIN: Number(data.LDL_MIN),
      LDL_REFERENCE_MAX: Number(data.LDL_MAX),
      TRIGLYCERIDE_REFERENCE_MIN: Number(data.TRIGLYCERIDE_MIN),
      TRIGLYCERIDE_REFERENCE_MAX: Number(data.TRIGLYCERIDE_MAX),
    };
    const preClinicalData = {
      ...data,
      BONE_DENSITY_RATING: Number(data.BONE_DENSITY_RATING),
      WBC_RESULT: Number(data.WBC_RESULT),
      RBC_RESULT: Number(data.RBC_RESULT),
      HGB_RESULT: Number(data.HGB_RESULT),
      HCT_RESULT: Number(data.HCT_RESULT),
      MCV_RESULT: Number(data.MCV_RESULT),
      MCH_RESULT: Number(data.MCH_RESULT),
      PLT_RESULT: Number(data.PLT_RESULT),
      BLOOD_CALCIUM_RESULT: Number(data.BLOOD_CALCIUM_RESULT),
    };
    if (
      subClinicalExamSelect?.testDiagnosticMatch.some(
        (item) => item.value === 13
      )
    ) {
      let id = physicalExam
        ? physicalExam.Preclinical_Details[0]?.Glucoses[0]?.id
        : preclinicalDetail?.Glucose[0]?.id;
      if (id) {
        (async () => {
          await glucoseApi.updateGlucose(glucoseData, id);
        })();
      } else {
        (async () => {
          await glucoseApi.createGlucose(glucoseData);
        })();
      }
    }
    if (
      subClinicalExamSelect?.testDiagnosticMatch.some(
        (item) => item.value === 14
      )
    ) {
      let id = physicalExam
        ? physicalExam.Preclinical_Details[0]?.Ure_Creatines[0]?.id
        : preclinicalDetail?.Ure_Creatines[0]?.id;
      if (id) {
        (async () => {
          await ureCreatineApi.updateUreCreatine(ureCreatineData, id);
        })();
      } else {
        (async () => {
          await ureCreatineApi.createUreCreatine(ureCreatineData);
        })();
      }
    }
    if (
      subClinicalExamSelect?.testDiagnosticMatch.some(
        (item) => item.value === 15
      )
    ) {
      let id = physicalExam
        ? physicalExam.Preclinical_Details[0]?.Liver_Enzymes[0]?.id
        : preclinicalDetail?.Liver_Enzymes[0]?.id;
      if (id) {
        (async () => {
          await liverEnzymeApi.updateLiverEnzyme(liverEnzymeData, id);
        })();
      } else {
        (async () => {
          await liverEnzymeApi.createLiverEnzyme(liverEnzymeData);
        })();
      }
    }
    if (
      subClinicalExamSelect?.testDiagnosticMatch.some(
        (item) => item.value === 16
      )
    ) {
      let id = physicalExam
        ? physicalExam.Preclinical_Details[0]?.Blood_Lipids[0]?.id
        : preclinicalDetail?.Blood_Lipids[0]?.id;
      if (id) {
        (async () => {
          await bloodLipidApi.updateBloodLipid(bloodLipidData, id);
        })();
      } else {
        (async () => {
          await bloodLipidApi.createBloodLipid(bloodLipidData);
        })();
      }
    }
    if (
      subClinicalExamSelect?.testDiagnosticMatch.some(
        (item) =>
          item.value === 11 ||
          item.value === 12 ||
          item.value === 17 ||
          item.value === 18
      ) ||
      subClinicalExamSelect?.imageDiagnosticMatch.length
    ) {
      (async () => {
        let id = physicalExam
          ? physicalExam.Preclinical_Details[0]?.id
          : newestPreclinicalDetail.id;
        await preclinicalDetailApi.updatePreclinicalDetail(preClinicalData, id);
      })();
    }
    if (imageDiagnosticCreate.length) {
      imageDiagnosticCreate.forEach((item, index) => {
        let key1 = `DESC_${index}`;
        let key2 = `CONCLUSION_${index}`;
        const precilinicalAddedData = {
          DESC: data.imgDiagnostic[key1],
          CONCLUSION: data.imgDiagnostic[key2],
          PRECLINICAL_DETAIL_ID: physicalExam
            ? physicalExam.Preclinical_Details[0]?.id
            : newestPreclinicalDetail.id,
          TYPE: 1,
          NAME: item.label,
        };
        let id = item.id;
        if (id) {
          (async () => {
            try {
              await preclinicalDetailUserAddedApi.updatePreclinicalDetailUserAdded(
                precilinicalAddedData,
                id
              );
            } catch (err) {
              console.log(err);
            }
          })();
        } else {
          (async () => {
            try {
              await preclinicalDetailUserAddedApi.createPreclinicalDetailUserAdded(
                precilinicalAddedData
              );
            } catch (err) {
              console.log(err);
            }
          })();
        }
      });
    }
    if (testDiagnosticCreate.length) {
      testDiagnosticCreate.forEach((item, index) => {
        const precilinicalAddedData = {
          RESULT: Number(data.testDiagnostic[`RESULT_${index}`]),
          UNIT: data.testDiagnostic[`UNIT_${index}`],
          REFERENCE_MIN: Number(data.testDiagnostic[`REFERENCE_MIN_${index}`]),
          REFERENCE_MAX: Number(data.testDiagnostic[`REFERENCE_MAX_${index}`]),
          PRECLINICAL_DETAIL_ID: physicalExam
            ? physicalExam.Preclinical_Details[0]?.id
            : newestPreclinicalDetail.id,
          TYPE: 2,
          NAME: item.label,
        };
        let id = item.id;
        if (id) {
          (async () => {
            try {
              await preclinicalDetailUserAddedApi.updatePreclinicalDetailUserAdded(
                precilinicalAddedData,
                id
              );
            } catch (err) {
              console.log(err);
            }
          })();
        } else {
          (async () => {
            try {
              await preclinicalDetailUserAddedApi.createPreclinicalDetailUserAdded(
                precilinicalAddedData
              );
            } catch (err) {
              console.log(err);
            }
          })();
        }
      });
    }
    setTabActive({ ...tabActive, conclusions: false });
    reload();
    onKeyChange("6");
  };

  return (
    <>
      <Form
        form={form}
        name="subClinicalExamination"
        labelAlign="left"
        labelWrap
        autoComplete="off"
        style={{ marginTop: 20 }}
        colon={false}
        onFinish={handleSubmitData}
        ref={formRef}
        validateMessages={validateMessages}
      >
        <Row justify="end">
          <Col>
            <Form.Item>
              <Button
                type="primary"
                onClick={() => setOpenModal(true)}
                disabled={physicalExam ? true : false}
              >
                <strong>+ Chọn hạng mục khám</strong>
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row justify={{ lg: "center", xs: "center" }}>
          <Col span={22}>
            {!subClinicalExamSelect
              ? ""
              : !subClinicalExamSelect.imageDiagnosticMatch?.length
                ? ""
                : subClinicalExamSelect.imageDiagnosticMatch
                  .filter((item) => item.value !== 7)
                  .map((item) => (
                    <Row key={item.value}>
                      <Col lg={12} xs={24}>
                        <Form.Item
                          label={
                            <Title level={5}>
                              {++index}. {item.label}
                            </Title>
                          }
                          name={item.desc_key}
                          labelCol={{ span: 12 }}
                        >
                          <Input allowClear placeholder="Nhập mô tả vào đây" />
                        </Form.Item>
                      </Col>
                      <Col lg={12} xs={24}>
                        <Form.Item
                          name={item.result_key}
                          label="Kết luận"
                          labelCol={{ span: 6, offset: 2 }}
                        >
                          <Input
                            allowClear
                            placeholder="Nhập kết luận khám của bác sĩ"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  ))}
            {!subClinicalExamSelect
              ? ""
              : !subClinicalExamSelect.imageDiagnosticMatch?.length
                ? ""
                : subClinicalExamSelect.imageDiagnosticMatch
                  .filter((item) => item.value === 7)
                  .map((item) => (
                    <Row justify="start" key={item.value}>
                      <Col span={24}>
                        <Form.Item>
                          <Title level={5}>
                            {++index}. {item.label}
                          </Title>
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          name={item.result_key}
                          label="Kết luận"
                          labelCol={{
                            lg: { span: 4, offset: 2 },
                            xs: { span: 6, offset: 2 },
                          }}
                        >
                          <Input
                            allowClear
                            placeholder="Nhập kết luận khám của bác sĩ"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  ))}
            {!imageDiagnosticCreate?.length
              ? ""
              : imageDiagnosticCreate.map((item, i) => (
                <Row key={i + 100}>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={
                        <Title level={4}>
                          {++index}. {item.label}
                        </Title>
                      }
                      name={["imgDiagnostic", `DESC_${i}`]}
                      labelCol={{ span: 12 }}
                    >
                      <Input allowClear placeholder="Nhập mô tả vào đây" />
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      name={["imgDiagnostic", `CONCLUSION_${i}`]}
                      label="Kết luận"
                      labelCol={{ span: 6, offset: 2 }}
                    >
                      <Input
                        allowClear
                        placeholder="Nhập kết luận khám của bác sĩ"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ))}
            {!subClinicalExamSelect ? (
              ""
            ) : subClinicalExamSelect?.testDiagnosticMatch?.length ? (
              <Row justify="start">
                <Col push={18}>
                  <Form.Item>
                    <Title level={5}>Chỉ số tham chiếu</Title>
                  </Form.Item>
                </Col>
              </Row>
            ) : (
              ""
            )}
            {!subClinicalExamSelect ? (
              ""
            ) : subClinicalExamSelect?.testDiagnosticMatch?.length &&
              subClinicalExamSelect?.testDiagnosticMatch.some(
                (item) => item.value === 11
              ) ? (
              <Row>
                <Col lg={12} xs={24}>
                  <Form.Item
                    label={<Title level={5}>{++index}. Đo mật độ xương</Title>}
                    labelCol={{ span: 12 }}
                  >
                    <Input.Group compact>
                      <Form.Item
                        name="BONE_DENSITY_RATING"
                        noStyle
                        getValueFromEvent={(e) => {
                          const inputValue = e.target.value;
                          if (inputValue === "-" || regex.test(inputValue)) {
                            return inputValue;
                          } else {
                            return "";
                          }
                        }}
                      >
                        <Input style={{ width: "70%" }} />
                      </Form.Item>
                      <Form.Item name="BONE_DENSITY_UNIT_DEFAULT" noStyle>
                        <Input style={{ width: "30%" }} />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item
                    wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                  >
                    <Input.Group compact>
                      <Form.Item
                        name="BONE_DENSITY_MIN"
                        noStyle
                        getValueFromEvent={(e) => {
                          const inputValue = e.target.value;
                          if (inputValue === "-" || regex.test(inputValue)) {
                            return inputValue;
                          } else {
                            return "";
                          }
                        }}
                      >
                        <Input style={{ width: "70%" }} />
                      </Form.Item>
                      <Form.Item name="BONE_DENSITY_UNIT_DEFAULT" noStyle>
                        <Input style={{ width: "30%" }} disabled />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="BONE_DENSITY_RESULT"
                    label="Kết luận"
                    labelCol={{
                      lg: { span: 4, offset: 2 },
                      xs: { span: 6, offset: 2 },
                    }}
                  >
                    <Input
                      allowClear
                      placeholder="Nhập kết luận khám của bác sĩ"
                    />
                  </Form.Item>
                </Col>
              </Row>
            ) : (
              ""
            )}
            {!subClinicalExamSelect ? (
              ""
            ) : subClinicalExamSelect?.testDiagnosticMatch?.length &&
              subClinicalExamSelect?.testDiagnosticMatch.some(
                (item) => item.value === 12
              ) ? (
              <>
                <Row justify="start">
                  <Col>
                    <Form.Item>
                      <Title level={5}>
                        {++index}. Tổng phân tích tế bào máu
                      </Title>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="BLOOD_RESULT"
                      label="Kết luận"
                      labelCol={{
                        lg: { span: 4, offset: 2 },
                        xs: { span: 6, offset: 2 },
                      }}
                    >
                      <Input
                        allowClear
                        placeholder="Nhập kết luận khám của bác sĩ"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={
                        <Title level={5}>
                          {index}.1. WBC <br />
                          &emsp;&emsp;&nbsp;Số lượng bạch cầu
                        </Title>
                      }
                      labelCol={{ span: 10, offset: 2 }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="WBC_RESULT"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "70%" }} />
                        </Form.Item>
                        <Form.Item name="WBC_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="WBC_MIN"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item
                          name="WBC_MAX"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item name="WBC_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} disabled />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={
                        <Title level={5}>
                          {index}.2. RBC <br />
                          &emsp;&emsp;&nbsp;Số lượng hồng cầu
                        </Title>
                      }
                      labelCol={{ span: 10, offset: 2 }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="RBC_RESULT"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "70%" }} />
                        </Form.Item>
                        <Form.Item name="RBC_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="RBC_MIN"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item
                          name="RBC_MAX"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item name="RBC_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} disabled />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={
                        <Title level={5}>
                          {index}.3. HGB <br />
                          &emsp;&emsp;&nbsp;Huyết sắc tố
                        </Title>
                      }
                      labelCol={{ span: 10, offset: 2 }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="HGB_RESULT"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "70%" }} />
                        </Form.Item>
                        <Form.Item name="HGB_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="HGB_MIN"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item
                          name="HGB_MAX"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item name="HGB_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} disabled />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={
                        <Title level={5}>
                          {index}.4. HCT <br />
                          &emsp;&emsp;&nbsp;Dung tích hồng cầu
                        </Title>
                      }
                      labelCol={{ span: 10, offset: 2 }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="HCT_RESULT"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "70%" }} />
                        </Form.Item>
                        <Form.Item name="HCT_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="HCT_MIN"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item
                          name="HCT_MAX"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item name="HCT_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} disabled />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={
                        <Title level={5}>
                          {index}.5. MCV <br />
                          &emsp;&emsp;&nbsp;Thể tích trung bình một hồng cầu
                        </Title>
                      }
                      labelCol={{ span: 10, offset: 2 }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="MCV_RESULT"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "70%" }} />
                        </Form.Item>
                        <Form.Item name="MCV_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="MCV_MIN"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item
                          name="MCV_MAX"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item name="MCV_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} disabled />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={
                        <Title level={5}>
                          {index}.6. MCH <br />
                          &emsp;&emsp;&nbsp;Số lượng huyết sắc tố trung bình một
                          hồng cầu
                        </Title>
                      }
                      labelCol={{ span: 10, offset: 2 }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="MCH_RESULT"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "70%" }} />
                        </Form.Item>
                        <Form.Item name="MCH_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="MCH_MIN"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item
                          name="MCH_MAX"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item name="MCH_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} disabled />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={
                        <Title level={5}>
                          {index}.7. PLT <br />
                          &emsp;&emsp;&nbsp;Số lượng tiểu cầu
                        </Title>
                      }
                      labelCol={{ span: 10, offset: 2 }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="PLT_RESULT"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "70%" }} />
                        </Form.Item>
                        <Form.Item name="PLT_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="PLT_MIN"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item
                          name="PLT_MAX"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item name="PLT_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} disabled />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            ) : (
              ""
            )}
            {!subClinicalExamSelect ? (
              ""
            ) : subClinicalExamSelect?.testDiagnosticMatch?.length &&
              subClinicalExamSelect?.testDiagnosticMatch.some(
                (item) => item.value === 13
              ) ? (
              <Row>
                <Col lg={12} xs={24}>
                  <Form.Item
                    label={
                      <Title level={5}>
                        {++index}. Đường huyết đói <br />
                        &emsp;&nbsp;Glucose
                      </Title>
                    }
                    labelCol={{ span: 12 }}
                  >
                    <Input.Group compact>
                      <Form.Item
                        name="GLUCOSE_HUNGRY"
                        noStyle
                        getValueFromEvent={(e) => {
                          const inputValue = e.target.value;
                          if (regex.test(inputValue)) {
                            return inputValue;
                          } else {
                            return "";
                          }
                        }}
                      >
                        <Input style={{ width: "70%" }} />
                      </Form.Item>
                      <Form.Item noStyle name="GLUCOSE_UNIT_DEFAULT">
                        <Input style={{ width: "30%" }} />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item
                    wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                  >
                    <Input.Group compact>
                      <Form.Item
                        name="GLUCOSE_MIN"
                        noStyle
                        getValueFromEvent={(e) => {
                          const inputValue = e.target.value;
                          if (regex.test(inputValue)) {
                            return inputValue;
                          } else {
                            return "";
                          }
                        }}
                      >
                        <Input style={{ width: "35%" }} />
                      </Form.Item>
                      <Form.Item
                        name="GLUCOSE_MAX"
                        noStyle
                        getValueFromEvent={(e) => {
                          const inputValue = e.target.value;
                          if (regex.test(inputValue)) {
                            return inputValue;
                          } else {
                            return "";
                          }
                        }}
                      >
                        <Input style={{ width: "35%" }} />
                      </Form.Item>
                      <Form.Item name="GLUCOSE_UNIT_DEFAULT" noStyle>
                        <Input style={{ width: "30%" }} disabled />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
            ) : (
              ""
            )}
            {!subClinicalExamSelect ? (
              ""
            ) : subClinicalExamSelect?.testDiagnosticMatch?.length &&
              subClinicalExamSelect?.testDiagnosticMatch.some(
                (item) => item.value === 14
              ) ? (
              <>
                <Row justify="start">
                  <Col>
                    <Form.Item>
                      <Title level={5}>{++index}. Chức năng thận</Title>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={<Title level={5}>{index}.1 Urea</Title>}
                      labelCol={{ span: 10, offset: 2 }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="UREA_RESULT"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "70%" }} />
                        </Form.Item>
                        <Form.Item name="UREA_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="UREA_MIN"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item
                          name="UREA_MAX"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item name="UREA_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} disabled />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={<Title level={5}>{index}.2 Creatine</Title>}
                      labelCol={{ span: 10, offset: 2 }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="CREATINE_RESULT"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "70%" }} />
                        </Form.Item>
                        <Form.Item name="CREATINE_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="CREATINE_MIN"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item
                          name="CREATINE_MAX"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item name="CREATINE_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} disabled />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            ) : (
              ""
            )}
            {!subClinicalExamSelect ? (
              ""
            ) : subClinicalExamSelect?.testDiagnosticMatch?.length &&
              subClinicalExamSelect?.testDiagnosticMatch.some(
                (item) => item.value === 15
              ) ? (
              <>
                <Row justify="start">
                  <Col>
                    <Form.Item>
                      <Title level={5}>{++index}. Chức năng gan</Title>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={<Title level={5}>{index}.1 SGOT/AST</Title>}
                      labelCol={{ span: 10, offset: 2 }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="SGOT_AST_RESULT"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "70%" }} />
                        </Form.Item>
                        <Form.Item name="SGOT_AST_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="SGOT_AST_MIN"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item
                          name="SGOT_AST_MAX"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item name="SGOT_AST_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} disabled />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={<Title level={5}>{index}.2 SGPT/ALT</Title>}
                      labelCol={{ span: 10, offset: 2 }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="SGPT_ALT_RESULT"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "70%" }} />
                        </Form.Item>
                        <Form.Item name="SGPT_ALT_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="SGPT_ALT_MIN"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item
                          name="SGPT_ALT_MAX"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item name="SGPT_ALT_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} disabled />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            ) : (
              ""
            )}
            {!subClinicalExamSelect ? (
              ""
            ) : subClinicalExamSelect?.testDiagnosticMatch?.length &&
              subClinicalExamSelect?.testDiagnosticMatch.some(
                (item) => item.value === 16
              ) ? (
              <>
                <Row justify="start">
                  <Col>
                    <Form.Item>
                      <Title level={5}>
                        {++index}. Chỉ số Lipid máu (Bộ mỡ máu)
                      </Title>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={<Title level={5}>{index}.1 Cholesterol</Title>}
                      labelCol={{ span: 10, offset: 2 }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="CHOLESTEROL_RESULT"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "70%" }} />
                        </Form.Item>
                        <Form.Item name="CHOLESTEROL_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="CHOLESTEROL_MIN"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item
                          name="CHOLESTEROL_MAX"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item name="CHOLESTEROL_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} disabled />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={<Title level={5}>{index}.2 HDL</Title>}
                      labelCol={{ span: 10, offset: 2 }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="HDL_RESULT"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "70%" }} />
                        </Form.Item>
                        <Form.Item name="HDL_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="HDL_MIN"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item
                          name="HDL_MAX"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item name="HDL_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} disabled />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={<Title level={5}>{index}.3 LDL</Title>}
                      labelCol={{ span: 10, offset: 2 }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="LDL_RESULT"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "70%" }} />
                        </Form.Item>
                        <Form.Item name="LDL_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="LDL_MIN"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item
                          name="LDL_MAX"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item name="LDL_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} disabled />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={<Title level={5}>{index}.4 Triglyceride</Title>}
                      labelCol={{ span: 10, offset: 2 }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="TRIGLYCERIDE_RESULT"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "70%" }} />
                        </Form.Item>
                        <Form.Item name="TRIGLYCERIDE_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="TRIGLYCERIDE_MIN"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item
                          name="TRIGLYCERIDE_MAX"
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item name="TRIGLYCERIDE_UNIT_DEFAULT" noStyle>
                          <Input style={{ width: "30%" }} disabled />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            ) : (
              ""
            )}
            {!subClinicalExamSelect ? (
              ""
            ) : subClinicalExamSelect?.testDiagnosticMatch?.length &&
              subClinicalExamSelect?.testDiagnosticMatch.some(
                (item) => item.value === 17
              ) ? (
              <>
                <Row justify="start">
                  <Col>
                    <Form.Item>
                      <Title level={5}>
                        {++index}. Tổng phân tích nước tiểu
                      </Title>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="URINALYSIS_RESULT"
                      label="Kết luận"
                      labelCol={{
                        lg: { span: 4, offset: 2 },
                        xs: { span: 6, offset: 2 },
                      }}
                    >
                      <Input
                        allowClear
                        placeholder="Nhập kết luận khám của bác sĩ"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            ) : (
              ""
            )}
            {!subClinicalExamSelect ? (
              ""
            ) : subClinicalExamSelect?.testDiagnosticMatch?.length &&
              subClinicalExamSelect?.testDiagnosticMatch.some(
                (item) => item.value === 18
              ) ? (
              <Row>
                <Col lg={12} xs={24}>
                  <Form.Item
                    label={
                      <Title level={5}>
                        {++index}. Canxi máu
                        <br />
                        &emsp;&emsp;Nồng độ canxi máu
                      </Title>
                    }
                    labelCol={{ span: 12 }}
                  >
                    <Input.Group compact>
                      <Form.Item
                        name="BLOOD_CALCIUM_RESULT"
                        noStyle
                        getValueFromEvent={(e) => {
                          const inputValue = e.target.value;
                          if (regex.test(inputValue)) {
                            return inputValue;
                          } else {
                            return "";
                          }
                        }}
                      >
                        <Input style={{ width: "70%" }} />
                      </Form.Item>
                      <Form.Item name="BLOOD_CALCIUM_UNIT_DEFAULT" noStyle>
                        <Input style={{ width: "30%" }} />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item
                    wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                  >
                    <Input.Group compact>
                      <Form.Item
                        name="BLOOD_CALCIUM_MIN"
                        noStyle
                        getValueFromEvent={(e) => {
                          const inputValue = e.target.value;
                          if (regex.test(inputValue)) {
                            return inputValue;
                          } else {
                            return "";
                          }
                        }}
                      >
                        <Input style={{ width: "35%" }} />
                      </Form.Item>
                      <Form.Item
                        name="BLOOD_CALCIUM_MAX"
                        noStyle
                        getValueFromEvent={(e) => {
                          const inputValue = e.target.value;
                          if (regex.test(inputValue)) {
                            return inputValue;
                          } else {
                            return "";
                          }
                        }}
                      >
                        <Input style={{ width: "35%" }} />
                      </Form.Item>
                      <Form.Item name="BLOOD_CALCIUM_UNIT_DEFAULT" noStyle>
                        <Input style={{ width: "30%" }} disabled />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
            ) : (
              ""
            )}
            {!testDiagnosticCreate?.length
              ? ""
              : testDiagnosticCreate.map((item, i) => (
                <Row key={i + 200}>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      label={
                        <Title level={4}>
                          {++index}. {item.label}
                        </Title>
                      }
                      labelCol={{ span: 12 }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name={["testDiagnostic", `RESULT_${i}`]}
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "70%" }} />
                        </Form.Item>
                        <Form.Item
                          name={["testDiagnostic", `UNIT_${i}`]}
                          noStyle
                        >
                          <Input style={{ width: "30%" }} />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={12} xs={24}>
                    <Form.Item
                      wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name={["testDiagnostic", `REFERENCE_MIN_${i}`]}
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item
                          name={["testDiagnostic", `REFERENCE_MAX_${i}`]}
                          noStyle
                          getValueFromEvent={(e) => {
                            const inputValue = e.target.value;
                            if (regex.test(inputValue)) {
                              return inputValue;
                            } else {
                              return "";
                            }
                          }}
                        >
                          <Input style={{ width: "35%" }} />
                        </Form.Item>
                        <Form.Item
                          name={["testDiagnostic", `UNIT_${i}`]}
                          noStyle
                        >
                          <Input style={{ width: "30%" }} disabled />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                </Row>
              ))}
            {!subClinicalExamSelect ? (
              ""
            ) : subClinicalExamSelect?.imageDiagnosticMatch?.length ||
              subClinicalExamSelect?.testDiagnosticMatch.length ? (
              <Row justify="start">
                <Col>
                  <Form.Item>
                    <Title level={5}>
                      {++index}. Hồ sơ/kết quả khám sức khỏe
                    </Title>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item name="files">
                    <Upload
                      beforeUpload={beforeUpload}
                      maxCount={5}
                      fileList={fileList}
                      onChange={onChange}
                      onPreview={handlePreview}
                      listType="picture"
                      accept=" .png, .jpg, .jpeg, .pdf, .csv, 
                                                    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, 
                                                    application/vnd.ms-excel, .heif, .heic"
                    >
                      {fileList?.length < 5 && (
                        <UploadOutlined style={{ fontSize: 30 }} />
                      )}
                    </Upload>
                    {(type && type === "xls") ||
                      type === "xlsx" ||
                      type === "doc" ||
                      type === "docx" ? (
                      ""
                    ) : (
                      <Modal
                        open={previewOpen}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                        width={1200}
                        style={{ top: 20 }}
                        key={type}
                      >
                        {type && type === "pdf" ? (
                          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
                            <Viewer
                              fileUrl={previewImage}
                              plugins={[defaultLayoutPluginInstance]}
                            />
                          </Worker>
                        ) : (
                          // <FileViewer
                          //   fileType={type}
                          //   filePath={`${previewImage}`}
                          //   //   errorComponent={CustomErrorComponent}
                          //   onError={onError}
                          // />
                          <img src={previewImage} alt="" />
                        )}
                      </Modal>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            ) : (
              ""
            )}
          </Col>
        </Row>
        {subClinicalExamSelect || physicalExam ? (
          ""
        ) : (
          <Form.Item>
            <Row justify="center">
              <Col>
                <Typography.Paragraph type="secondary" italic>
                  Nhấn vào " Chọn hạng mục khám " để nhập dữ liệu
                </Typography.Paragraph>
              </Col>
            </Row>
          </Form.Item>
        )}
        <Row justify="space-between">
          <Col>
            <Button onClick={() => onKeyChange("4")}>Quay lại</Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              Tiếp
            </Button>
          </Col>
        </Row>
      </Form>
      <SubClinicalExamSelcetModal
        isOpen={openModal}
        onCancel={() => setOpenModal(false)}
      />
    </>
  );
};

export default SubClinicalExaminationForm;
