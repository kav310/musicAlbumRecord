import {
  ALBUM_DETAILS_SUCCESS,
  ALBUM_DETAILS_FAILURE,
  ALBUM_DETAILS_REQUEST,
} from "./action";

const initStore = {
  albumData: [],
  total: 0,
  isError: false,
};

const albumReducer = (state = initStore, { type, payload }) => {
  switch (type) {
    case ALBUM_DETAILS_REQUEST:
      return {
        ...state,
      };
    case ALBUM_DETAILS_SUCCESS:
      // console.log(payload);
      return {
        ...state,
        total: payload.finalPage,
        albumData: [...payload.data],
        isError: false,
      };
    case ALBUM_DETAILS_FAILURE:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
};

export default albumReducer;
