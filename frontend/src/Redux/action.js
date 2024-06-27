import axios from "axios";
import {
  GET_MOVIES_LOADING,
  GET_MOVIES_SUCCESS,
  ADD_MOVIES_SUCCESS,
  GET_MOVIES_ERROR,
  GET_MOVIES_UPDATE,
  GET_MOVIE_DELETE,
  REVIEW_UPDATE,
  WATCH_STATUS_TOGGLE,
  GET_MOVIE,
} from "./actionTypes";

const BASE_URL = "http://localhost:8000/movie";

export const getMoviesData = () => async (dispatch) => {
  dispatch({ type: GET_MOVIES_LOADING });
  try {
    let res = await axios.get(`${BASE_URL}`);
    dispatch({ type: GET_MOVIES_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_MOVIES_ERROR });
  }
};

export const addMovie = (data) => async (dispatch) => {
  dispatch({ type: GET_MOVIES_LOADING });

  try {
    const res = await axios.post(`${BASE_URL}`, data);
    dispatch({ type: ADD_MOVIES_SUCCESS, payload: res.data });
  } catch (error) {
    console.error(
      "Error updating movie:",
      error.response ? error.response.data : error.message
    );
    dispatch({ type: GET_MOVIES_ERROR });
  }
};

export const updateMovieData = (id, data) => async (dispatch) => {
  dispatch({ type: GET_MOVIES_LOADING });

  try {
    const res = await axios.put(`${BASE_URL}/${id}`, data);
    dispatch({ type: GET_MOVIES_UPDATE, payload: res.data });
  } catch (error) {
    console.error(
      "Error updating movie:",
      error.response ? error.response.data : error.message
    );
    dispatch({ type: GET_MOVIES_ERROR });
  }
};

export const reviewUpdate =
  (id, { reviews }) =>
  async (dispatch) => {
    dispatch({ type: GET_MOVIES_LOADING });

    try {
      const res = await axios.patch(`${BASE_URL}/${id}/review`, { reviews });
      dispatch({ type: REVIEW_UPDATE, payload: res.data });
    } catch (error) {
      console.error(
        "Error updating review:",
        error.response ? error.response.data : error.message
      );
      dispatch({ type: GET_MOVIES_ERROR });
    }
  };

export const deleteMovie = (id) => async (dispatch) => {
  try {
    let res = await axios.delete(`${BASE_URL}/${id}`);
    dispatch({ type: GET_MOVIE_DELETE, payload: id });
  } catch (e) {
    dispatch({ type: GET_MOVIES_ERROR });
  }
};

export const toggleWatchStatus = (id, watchStatus) => async (dispatch) => {
  try {
    const res = await axios.patch(`${BASE_URL}/${id}/watchStatus`, {
      watchStatus,
    });
    dispatch({ type: WATCH_STATUS_TOGGLE, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_MOVIES_ERROR });
  }
};

export const getMovieById = (id) => async (dispatch) => {
  dispatch({ type: GET_MOVIES_LOADING });
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    dispatch({ type: GET_MOVIE, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_MOVIES_ERROR });
  }
};
