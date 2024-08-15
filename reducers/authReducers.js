import { global } from "@/actions";
import { initialState } from "@/app/Context/store";

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case global.TOGGLESEARCH:
      return {
        ...state,
        toggle: true,
      };
    case global.UNTOGGLESEARCH:
      return {
        ...state,
        toggle: false,
      };
    case global.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case global.LOADINGTRUE:
      return {
        ...state,
        loading: action.payload,
      };
    case global.SHOWPOSTS:
      return {
        ...state,
        showPosts: action.payload,
      };
    case global.SHOWCOMMENTS:
      return {
        ...state,
        showComments: action.payload,
      };
    case global.SETMESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case global.GETMESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
  }
};
