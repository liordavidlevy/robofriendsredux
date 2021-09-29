import { INCREASE_COUNT, CHANGE_SEARCH_FIELD, REQUEST_ROBOTS_FAILED, REQUEST_ROBOTS_PENDING, REQUEST_ROBOTS_SUCCESS } from "./constants";

const initialStateSearch = {
    searchField: ''
};

const initialStateRobots = {
    robots: [],
    isPending: false,
    error: null
};

const initialStateCount = {
    count: 0
};

export const searchRobots = (state = initialStateSearch, action = {}) => {
    switch (action.type) {
        case CHANGE_SEARCH_FIELD:
            return { ...state, searchField: action.payload };
        default:
            return state;
    }
}

export const requestRobots = (state = initialStateRobots, action = {}) => {
    switch (action.type) {
        case REQUEST_ROBOTS_PENDING:
            return { ...state, isPending: true }
        case REQUEST_ROBOTS_SUCCESS:
            return { ...state, robots: action.payload, isPending: false }
        case REQUEST_ROBOTS_FAILED:
            console.log(action)
            return { ...state, error: action.payload, isPending: false }
        default:
            return state;
    }
}

export const changeCount = (state = initialStateCount, action = {}) => {
    switch (action.type) {
        case INCREASE_COUNT:
            return { ...state, count: state.count + 1 };
        default:
            return state;
    }
}