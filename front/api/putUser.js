import axiosInstance from '../api/config'

export const putUser = async (id, Informations) => {
    try {
        const userResponse = await axiosInstance.put(`/api/users/${id}`, {
            ...Informations
        })
        return userResponse
    } catch (e) {
        return e.response.data
    }
}