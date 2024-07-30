import axios from "axios";

export const getApiCallFunction = async () =>{
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data;
    } catch (error) {
        console.log(error)
    }
}


export const deleteApiCallFunction = async (userId) =>{
    console.log("id",userId)
    try {
         const res = await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
        // return response.data;
        console.log("chack",res)
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
}

// export const EditApiCallFunction = async (userId) =>{
//     console.log("id",userId)
//     try {
//          const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${userId}`);
//         // return response.data;
//         console.log("chack",res)
//         return { success: true, data: res.data };
//     } catch (error) {
//         return { success: false, error };
//     }
// }


export const EditApiCallFunction = async (userId, updatedData) => {
    console.log("id", userId);
    try {
        // Send a PUT request with the updated data
        const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${userId}`, updatedData);
        console.log("response", res.data);
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, error };
    }
}







