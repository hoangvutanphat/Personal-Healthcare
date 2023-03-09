import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
// import { userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import glucoseApi from "../api/glucoseApi";
import { useSnackbar } from "notistack";
import { glucoseByUserState, glucoseState } from "../recoil/atom/healthIndexState";

export const useGlucose = () => {
  const [glucoses, setGlucoses] = useState([]);
  const [glucosesByUserId, setGlucosesByUserId] = useState([]);
  const [glucose, setGlucose] = useState();
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

  const setGlucoseState = useSetRecoilState(glucoseState);
  const setGlucoseByUser = useSetRecoilState(glucoseByUserState);

  useEffect(() => {
    getAllGlucoses();
    getGlucoseByUserId();
  }, []);

  const getAllGlucoses = async () => {
    setIsLoading(true);
    try {
      let res = await glucoseApi.getAllGlucoses();
      if (res.data) {
        setGlucoses(res.data.elements);
        setGlucoseState(res.data.elements)
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // if (error?.response?.data?.status !== 401) {
      //   enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      // }
    }
  };
  const getGlucose = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await glucoseApi.getGlucoseById(id);
      if (res.data) {
        setGlucose(res.data.elements.glucose);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };
  const createGlucose = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await glucoseApi.createGlucose(data);
      if (res.data) {
        getAllGlucoses();
        getGlucoseByUserId();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        // callback();
        setGlucose(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const updateGlucose = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await glucoseApi.updateGlucose(data, id);
      if (res.data) {
        getAllGlucoses();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setGlucose(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const deleteGlucose = async (id) => {
    setIsLoading(true);
    try {
      let res = await glucoseApi.deleteGlucose(id);
      if (res.data) {
        getAllGlucoses();
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
  const getGlucoseByUserId = async () => {
    setIsLoading(true);
    try {
      let res = await glucoseApi.getGlucoseByUserId();
      if (res.data) {
        setGlucosesByUserId(res.data.elements);
        setGlucoseByUser(res.data.elements);
        // callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // if (error?.response?.data.status !== 401) {
      //   enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      // }
    }
  };

  return {
    glucoses,
    deleteGlucose,
    glucose,
    getGlucose,
    updateGlucose,
    createGlucose,
    getAllGlucoses,
    isLoading,
    error,
    success,
    setGlucose,
    glucosesByUserId,
    getGlucoseByUserId,
  };
};
