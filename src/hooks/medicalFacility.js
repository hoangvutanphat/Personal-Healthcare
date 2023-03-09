import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import medicalFacilityApi from "../api/medicalFacilityApi";
import { useSetRecoilState } from "recoil";
import { medicalFacilityState } from "../recoil/atom/medicalFacilityState";

export const useMedicalFacility = () => {
  const [medicalFacilities, setMedicalFacilities] = useState([]);
  const [medicalFacility, setMedicalFacility] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const setMedicalFacilityList = useSetRecoilState(medicalFacilityState)

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
      let res = await medicalFacilityApi.getAllMedicalFacilities();
      if (res.data) {
        setMedicalFacilities(res.data.elements);
        setMedicalFacilityList(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const getMedicalFacilityById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await medicalFacilityApi.getMedicalFacilityById(id);
      if (res.data) {
        setMedicalFacility(res.data.elements.medicalFacility);
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

  const createMedicalFacility = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await medicalFacilityApi.createMedicalFacility(data);
      if (res.data) {
        getAllMedicalFacilities();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setMedicalFacilities(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error.response.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateMedicalFacility = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await medicalFacilityApi.updateMedicalFacility(data, id);
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

  const deleteMedicalFacility = async (id) => {
    setIsLoading(true);
    try {
      let res = await medicalFacilityApi.deleteMedicalFacility(id);
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
    medicalFacilities,
    isLoading,
    error,
    success,
    setMedicalFacilities,
    createMedicalFacility,
    deleteMedicalFacility,
    getMedicalFacilityById,
    medicalFacility,
    updateMedicalFacility,
    setMedicalFacility
  };
};
