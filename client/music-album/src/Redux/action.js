import axios from "axios";
import {
  ALBUM_DETAILS_FAILURE,
  ALBUM_DETAILS_REQUEST,
  ALBUM_DETAILS_SUCCESS,
} from "./actionTypes";

const albumRequest = (payload) => {
  return {
    type: ALBUM_DETAILS_REQUEST,
    payload,
  };
};

const albumFailure = (payload) => {
  return {
    type: ALBUM_DETAILS_FAILURE,
    payload,
  };
};
const albumSuccess = (payload) => {
  return {
    type: ALBUM_DETAILS_SUCCESS,
    payload,
  };
};

const albumPagination = (payload) => (dispatch) => {
  // console.log("action", payload);
  dispatch(albumRequest());
  return axios
    .get(
      `http://localhost:5000/api/albumPages?page=${payload.page}&limit=${payload.limit}&genres=${payload.genres}&year=${payload.year}&name=${payload.name}`
    )
    .then((res) => dispatch(albumSuccess(res.data)))
    .catch((err) => dispatch(albumFailure(err)));
};

export {
  albumFailure,
  albumSuccess,
  albumPagination,
  albumRequest,
  ALBUM_DETAILS_SUCCESS,
  ALBUM_DETAILS_FAILURE,
  ALBUM_DETAILS_REQUEST,
};
