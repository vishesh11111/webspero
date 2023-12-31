
export const stringdata = {
    storeUser: "User",
    refresh: "Ref"
}

export const UserDetailsAction= (data) => {
    return {
        type: stringdata?.storeUser,
        data: data
    }
}

export const RefreshAction= (data) => {
    return {
        type: stringdata?.refresh,
        data: 1
    }
}