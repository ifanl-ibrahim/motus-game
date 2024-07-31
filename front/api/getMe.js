import axiosInstance from '../api/config'

export const getMe = async () => {
    if (localStorage.getItem('authenticationToken') !== null) {
        try {
            const user = (await axiosInstance.get(`/api/users/me`)).data
            return user
        } catch (e) {
            switch (e) {
                case e.request:
                    console.log(e.request)
                    console.log(e.message)
                    break
                case e.response:
                    console.log(e.response)
                    console.log(e.message)
                    break
                default:
                    console.log(e.config)
            }
            console.log(e)
        }
    }
}