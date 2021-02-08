const initialState = {
  filter: {
    checkAll: false,
    check0: false,
    check1: false,
    check2: false,
    check3: false,
  },

  searchId: null,

  tickets: [],

  tabCheap: true,
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (true) {
    case action.type === 'TICKETS':
      newState.tickets = action.payload;
      return newState;

    case action.type === 'SEARCH_ID':
      newState.searchId = action.payload;
      return newState;

    case action.type === 'ALL' && newState.filter.checkAll:
      for (const key in newState.filter) {
        if (key) {
          newState.filter[key] = false;
        }
      }
      // newState.filter.checkAll = false
      return newState;

    case action.type === 'ALL':
      for (const key in newState.filter) {
        if (key) {
          newState.filter[key] = true;
        }
      }
      return newState;

    case action.type === 'NONE':
      newState.filter.checkAll = false;
      newState.filter.check0 = !newState.filter.check0;
      return newState;

    case action.type === 'ONE':
      newState.filter.checkAll = false;
      newState.filter.check1 = !newState.filter.check1;
      return newState;

    case action.type === 'TWO':
      newState.filter.checkAll = false;
      newState.filter.check2 = !newState.filter.check2;
      return newState;

    case action.type === 'THREE':
      newState.filter.checkAll = false;
      newState.filter.check3 = !newState.filter.check3;
      return newState;

    case action.type === 'CHEAP':
      newState.tabCheap = true;
      return newState;

    case action.type === 'NOT_CHEAP':
      newState.tabCheap = false;
      return newState;

    default:
      return state;
  }
};

export default reducer;
