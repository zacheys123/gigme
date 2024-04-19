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
  }
};
