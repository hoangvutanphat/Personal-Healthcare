import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
// import { userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import axitUricApi from "../api/axitUricApi";
import { useSnackbar } from "notistack";
import { axitUricByUserState, axitUricState } from "../recoil/atom/healthIndexState";

export const useAxitUric = () => {
  const [axitUrics, setAxitUrics] = useState([]);
  const [axitUricsByUserId, setAxitUricsByUserId] = useState([]);
  const [axitUric, setAxitUric] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const setAxitUricState = useSetRecoilState(axitUricState)
  const setAxitUricByUser = useSetRecoilState(axitUricByUserState)

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
    getAllAxitUrics();
    getAxitUricByUserId();
  }, []);

  const getAllAxitUrics = async () => {
    setIsLoading(true);
    try {
      let res = await axitUricApi.getAllAxitUrics();
      if (res.data) {
        setAxitUrics(res.data.elements);
        setAxitUricState(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // if (error?.response?.data?.status !== 401) {
      //   enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      // }
    }
  };
  const getAxitUric = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await axitUricApi.getAxitUricById(id);
      if (res.data) {
        setAxitUric(res.data.elements.axitUric);
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
  const createAxitUric = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await axitUricApi.createAxitUric(data);
      if (res.data) {
        getAllAxitUrics();
        getAxitUricByUserId();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        // callback();
        setAxitUric(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data?.status !== 401) {
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateAxitUric = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await axitUricApi.updateAxitUric(data, id);
      if (res.data) {
        getAllAxitUrics();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setAxitUric(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const deleteAxitUric = async (id) => {
    setIsLoading(true);
    try {
      let res = await axitUricApi.deleteAxitUric(id);
      if (res.data) {
        getAllAxitUrics();
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
  const getAxitUricByUserId = async () => {
    setIsLoading(true);
    try {
      let res = await axitUricApi.getAxitUricByUserId();
      if (res.data) {
        setAxitUricsByUserId(res.data.elements);
        setAxitUricByUser(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    axitUrics,
    deleteAxitUric,
    axitUric,
    getAxitUric,
    updateAxitUric,
    createAxitUric,
    getAllAxitUrics,
    isLoading,
    error,
    success,
    setAxitUric,
    axitUricsByUserId,
    getAxitUricByUserId,
  };
};
