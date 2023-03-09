import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
// import { userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import medicalConsultationDiseaseApi from "../api/medicalConsultationDiseaseApi";
import { useSnackbar } from "notistack";
import { medicalConsultationDiseaseState } from "../recoil/atom/medicalConsultationDiseaseState";

export const useMedicalConsultationDisease = () => {
  const [medicalConsultationDiseases, setMedicalConsultationDiseases] = useState([]);
  const [medicalConsultationDisease, setMedicalConsultationDisease] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const setMedicalConsultationDiseaseState = useSetRecoilState(medicalConsultationDiseaseState);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
    if (success) {
      enqueueSnackbar(success, { variant: "success" });
    }
  }, [error, success]);

  useEffect(() => {
    getAllMedicalConsultationDiseases();
  }, []);

  const getAllMedicalConsultationDiseases = async () => {
    setIsLoading(true);
    try {
      let res = await medicalConsultationDiseaseApi.getAllMedicalConsultationDiseases();
      if (res.data) {
        setMedicalConsultationDiseases(res.data.elements);
        setMedicalConsultationDiseaseState(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };
  const getMedicalConsultationDiseaseById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await medicalConsultationDiseaseApi.getMedicalConsultationDiseaseById(id);
      if (res.data) {
        setMedicalConsultationDisease(res.data.elements.medicalConsultationDisease);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };
  const createMedicalConsultationDisease = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await medicalConsultationDiseaseApi.createMedicalConsultationDisease(data);
      if (res.data) {
        getAllMedicalConsultationDiseases();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setMedicalConsultationDisease(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const updateMedicalConsultationDisease = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await medicalConsultationDiseaseApi.updateMedicalConsultationDisease(data, id);
      if (res.data) {
        getAllMedicalConsultationDiseases();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setMedicalConsultationDisease(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const deleteMedicalConsultationDisease = async (id) => {
    setIsLoading(true);
    try {
      let res = await medicalConsultationDiseaseApi.deleteMedicalConsultationDisease(id);
      if (res.data) {
        getAllMedicalConsultationDiseases();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
      }
    } catch (error) {
      setSuccess(undefined);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  return {
    medicalConsultationDiseases,
    deleteMedicalConsultationDisease,
    medicalConsultationDisease,
    getMedicalConsultationDiseaseById,
    updateMedicalConsultationDisease,
    createMedicalConsultationDisease,
    getAllMedicalConsultationDiseases,
    isLoading,
    error,
    success,
    setMedicalConsultationDisease,
  };
};
