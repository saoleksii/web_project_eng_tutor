import client from './axios'

export const uploadPhoto = async (file) => {
    const uploadData = new FormData()
    uploadData.append('photo', file)
    const res = await client.post('/upload', uploadData, {headers: { 'Content-Type': 'multipart/form-data' }})
    return res
}