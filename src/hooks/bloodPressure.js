import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import bloodPressureApi from "../api/bloodPressureApi";
import { useSnackbar } from "notistack";
import { bloodPressureByUserState, bloodPressureState } from "../recoil/atom/healthIndexState";

export const useBloodPressure = () => {
  const [bloodPressures, setBloodPressures] = useState([]);
  const [bloodPressuresByUserId, setBloodPressuresByUserId] = useState([]);
  const [bloodPressure, setBloodPressure] = useState();
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

  const setBloodPressureState = useSetRecoilState(bloodPressureState)
  const setBloodPressureByUserState = useSetRecoilState(bloodPressureByUserState)

  useEffect(() => {
    getAllBloodPressures();
    getBloodPressureByUserId();
  }, []);

  const getAllBloodPressures = async () => {
    setIsLoading(true);
    try {
      let res = await bloodPressureApi.getAllBloodPressures();
      if (res.data) {
        setBloodPressures(res.data.elements);
        setBloodPressureState(res.data.elements)
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };
  const getBloodPressure = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await bloodPressureApi.getBloodPressureById(id);
      if (res.data) {
        setBloodPressure(res.data.elements.bloodPressure);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };
  const createBloodPressure = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await bloodPressureApi.createBloodPressure(data);
      if (res.data) {
        getAllBloodPressures();
        getBloodPressureByUserId();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        // callback();
        setBloodPressure(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      // enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const updateBloodPressure = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await bloodPressureApi.updateBloodPressure(data, id);
      if (res.data) {
        getAllBloodPressures();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setBloodPressure(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const deleteBloodPressure = async (id) => {
    setIsLoading(true);
    try {
      let res = await bloodPressureApi.deleteBloodPressure(id);
      if (res.data) {
        getAllBloodPressures();
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
  const getBloodPressureByUserId = async () => {
    setIsLoading(true);
    try {
      let res = await bloodPressureApi.getBloodPressureByUserId();
      if (res.data) {
        setBloodPressuresByUserId(res.data.elements);
        setBloodPressureByUserState(res.data.elements)
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    bloodPressures,
    deleteBloodPressure,
    bloodPressure,
    getBloodPressure,
    updateBloodPressure,
    createBloodPressure,
    getAllBloodPressures,
    isLoading,
    error,
    success,
    setBloodPressure,
    bloodPressuresByUserId,
    getBloodPressureByUserId,
    setBloodPressuresByUserId
  };
};
