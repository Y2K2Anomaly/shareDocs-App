import axios from 'axios';

const uploadFile = async ({ data, setAddLoading }) => {
    try {
        setAddLoading(true)
        const response = await axios.post('/upload', data);
        setAddLoading(false)
        return response.data;
    } catch (error) {
        console.log("Error while calling the api", error.message)
    }
}

export default uploadFile;

