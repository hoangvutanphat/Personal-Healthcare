import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import medicalFacilityFileApi from "../api/medicalFacilityFileApi";

export const useMedicalFacilityFile = () => {
  const [medicalFacilityFiles, setMedicalFacilityFiles] = useState([]);
  const [medicalFacilityFile, setMedicalFacilityFile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
    if (success) {
      enqueueSnackbar(success, { variant: "success" });
    }
  }, [error, success]);

  useEffect(() => {
    getAllMedicalFacilities();
  }, []);

  const getAllMedicalFacilities = async () => {
    setIsLoading(true);
    try {
      let res = await medicalFacilityFileApi.getAllMedicalFacilityFiles();
      if (res.data) {
        setMedicalFacilityFiles(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const getMedicalFacilityFileById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await medicalFacilityFileApi.getMedicalFacilityFileById(id);
      if (res.data) {
        setMedicalFacilityFile(res.data.elements.medicalFacilityFile);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const createMedicalFacilityFile = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await medicalFacilityFileApi.createMedicalFacilityFile(data);
      if (res.data) {
        getAllMedicalFacilities();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setMedicalFacilityFiles(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error.response.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateMedicalFacilityFile = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await medicalFacilityFileApi.updateMedicalFacilityFile(data, id);
      if (res.data) {
        getAllMedicalFacilities();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const deleteMedicalFacilityFile = async (id) => {
    setIsLoading(true);
    try {
      let res = await medicalFacilityFileApi.deleteMedicalFacilityFile(id);
      if (res.data) {
        getAllMedicalFacilities();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };



  return {
    medicalFacilityFiles,
    isLoading,
    error,
    success,
    setMedicalFacilityFiles,
    createMedicalFacilityFile,
    deleteMedicalFacilityFile,
    getMedicalFacilityFileById,
    medicalFacilityFile,
    updateMedicalFacilityFile,
    setMedicalFacilityFile
  };
};
