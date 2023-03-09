import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
// import { userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import BMIApi from "../api/bmiApi";
import { useSnackbar } from "notistack";
import { BMIByUserState, BMIState } from "../recoil/atom/healthIndexState";
import physicalDetailApi from "../api/physicalDetailApi";

export const useBMI = () => {
  const [AllBMI, setAllBMI] = useState([]);
  const [BMI, setBMI] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const setBMIState = useSetRecoilState(BMIState);
  const setBMIByUserState = useSetRecoilState(BMIByUserState);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
    if (success) {
      enqueueSnackbar(success, { variant: "success" });
    }
  }, [error, success]);

  useEffect(() => {
    getAllBMI();
    getBMIByUserId();
  }, []);

  const getBMIByUserId = async () => {
    try {
      let res = await physicalDetailApi.getBMIByUserId();
      if (res.data) {
        setBMIByUserState(res.data.elements);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getAllBMI = async () => {
    setIsLoading(true);
    try {
      let res = await BMIApi.getAllBMI();
      if (res.data) {
        setAllBMI(res.data.elements);
        setBMIState(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  };
  const getBMI = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await BMIApi.getBMIById(id);
      if (res.data) {
        setBMI(res.data.elements.BMI);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };
  const createBMI = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await BMIApi.createBMI(data);
      if (res.data) {
        getAllBMI();
        getBMIByUserId();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        // callback();
        setBMI(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      // enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const updateBMI = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await BMIApi.updateBMI(data, id);
      if (res.data) {
        getAllBMI();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setBMI(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const deleteBMI = async (id) => {
    setIsLoading(true);
    try {
      let res = await BMIApi.deleteBMI(id);
      if (res.data) {
        getAllBMI();
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
    AllBMI,
    deleteBMI,
    BMI,
    getBMI,
    updateBMI,
    createBMI,
    getAllBMI,
    isLoading,
    error,
    success,
    setBMI,
  };
};
