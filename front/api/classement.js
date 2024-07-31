import axiosInstance from '../api/config'

export const getClassement = async () => {
  try {
    const classement = await axiosInstance.get(`/api/users`, {
      params: {
        fields: ['id', 'username', 'score'],
        sort: ['score:desc'], 
      },
    })
    const { data } = classement
    return data
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