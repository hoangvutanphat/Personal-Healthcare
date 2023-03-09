import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import medicalFacilityRatingApi from "../api/medicalFacilityRatingApi";
export const useMedicalFacilityRating = () => {
  const [medicalFacilitieRatings, setMedicalFacilitieRatings] = useState([]);
  const [medicalFacilityRating, setMedicalFacilityRating] = useState('');
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
    getAllMedicalFacilitieRatings();
  }, []);

  const getAllMedicalFacilitieRatings = async () => {
    setIsLoading(true);
    try {
      let res = await medicalFacilityRatingApi.getAllMedicalFacilityRatings();

      if (res.data) {
        setMedicalFacilitieRatings(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const getMedicalFacilityRatingById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await medicalFacilityRatingApi.getMedicalFacilityRating(id);
      if (res.data) {
        setMedicalFacilityRating(res.data.elements.medicalFacilityRating);
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

  const createMedicalFacilityRating = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await medicalFacilityRatingApi.createMedicalFacilityRating(data);
      if (res.data) {
        getAllMedicalFacilitieRatings();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setMedicalFacilitieRatings(undefined);
      }
    } catch (error) {
      console.log("error",error);
      setSuccess(undefined);
      if (error?.response?.data?.status !== 401) {
        // enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateMedicalFacilityRating = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await medicalFacilityRatingApi.updateMedicalFacilityRating(data, id);
      if (res.data) {
        getAllMedicalFacilitieRatings();
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

  const deleteMedicalFacilityRating = async (id) => {
    setIsLoading(true);
    try {
      let res = await medicalFacilityRatingApi.deleteMedicalFacilityRating(id);
      if (res.data) {
        getAllMedicalFacilitieRatings();
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
    medicalFacilitieRatings,
    isLoading,
    error,
    success,
    setMedicalFacilitieRatings,
    createMedicalFacilityRating,
    deleteMedicalFacilityRating,
    getMedicalFacilityRatingById,
    medicalFacilityRating,
    updateMedicalFacilityRating,
    setMedicalFacilityRating,
    getAllMedicalFacilitieRatings
  };
};
