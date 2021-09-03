
export const getRequest = (url, data, method, type, params) => {
    return {
        url, data, method, params, type, isApi: true
    }

}