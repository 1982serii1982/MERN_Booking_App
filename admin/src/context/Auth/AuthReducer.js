export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "login_start": {
      return {
        user: null,
        loading: true,
        error: null,
      };
    }
    case "login_success": {
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    }
    case "login_fail": {
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    }
    case "login_out": {
      return {
        user: null,
        loading: false,
        error: null,
      };
    }
  }
  throw Error("Unknown action: " + action.type);
};
