import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import ureCreatineApi from "../api/ureCreatineApi";
import { useSnackbar } from "notistack";
import { ureCreatineByUserState, ureCreatineState } from "../recoil/atom/healthIndexState";

export const useUreCreatine = () => {
  const [ureCreatines, setUreCreatines] = useState([]);
  const [ureCreatinesByUserId, setUreCreatinesByUserId] = useState([]);
  const [ureCreatine, setUreCreatine] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();
  const setUreCreatineState = useSetRecoilState(ureCreatineState)
  const setUreCreatineByUser = useSetRecoilState(ureCreatineByUserState)

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
    if (success) {
      enqueueSnackbar(success, { variant: "success" });
    }
  }, [error, success]);

  useEffect(() => {
    getAllUreCreatines();
    getUreCreatineByUserId();
  }, []);

  const getAllUreCreatines = async () => {
    setIsLoading(true);
    try {
      let res = await ureCreatineApi.getAllUreCreatines();
      if (res.data) {
        setUreCreatines(res.data.elements);
        setUreCreatineState(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data?.status !== 401) {
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      }
    }
  };
  const getUreCreatine = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await ureCreatineApi.getUreCreatineById(id);
      if (res.data) {
        setUreCreatine(res.data.elements.ureCreatine);
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
  const createUreCreatine = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await ureCreatineApi.createUreCreatine(data);
      if (res.data) {
        getAllUreCreatines();
        getUreCreatineByUserId();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        // callback();
        setUreCreatine(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const updateUreCreatine = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await ureCreatineApi.updateUreCreatine(data, id);
      if (res.data) {
        getAllUreCreatines();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setUreCreatine(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const deleteUreCreatine = async (id) => {
    setIsLoading(true);
    try {
      let res = await ureCreatineApi.deleteUreCreatine(id);
      if (res.data) {
        getAllUreCreatines();
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
  const getUreCreatineByUserId = async () => {
    setIsLoading(true);
    try {
      let res = await ureCreatineApi.getUreCreatineByUserId();
      if (res.data) {
        setUreCreatinesByUserId(res.data.elements);
        setUreCreatineByUser(res.data.elements);
        // callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // if (error?.response?.data?.status !== 401) {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      // }
    }
  };

  return {
    ureCreatines,
    deleteUreCreatine,
    ureCreatine,
    getUreCreatine,
    updateUreCreatine,
    createUreCreatine,
    getAllUreCreatines,
    isLoading,
    error,
    success,
    setUreCreatine,
    ureCreatinesByUserId,
    getUreCreatineByUserId,
  };
};
