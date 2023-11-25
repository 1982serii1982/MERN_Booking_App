export const SearchReducer = (state, action) => {
  switch (action.type) {
    case "new_search": {
      return action.payload;
    }
    case "reset_search": {
      return INITIAL_STATE;
    }
    case "set_search": {
      return {
        ...state,
        [action.key]:
          action.key !== "personOption"
            ? action.payload
            : action.mode === "uno"
            ? {
                ...state.personOption,
                [action.name]: action.val,
              }
            : {
                ...state.personOption,
                [action.name]:
                  action.unary === "i"
                    ? state.personOption[action.name] + 1
                    : state.personOption[action.name] - 1,
              },
      };
    }
  }
  throw Error("Unknown action: " + action.type);
};
