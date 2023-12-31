import { stringdata } from "./action"

const init = {
    userDetails: {},
    refresh: 0,
}

export const Reducer = (state = init, payload) => {
    switch (payload.type) {
        case (stringdata?.storeUser):
            return { ...state, userDetails: payload?.data }
        case (stringdata?.refresh):
            return { ...state, refresh: state.refresh + 1 }
        default:
            return state;
    }
}