import axios from 'axios';

export async function loginuser(Number,password) {
  console.log("Mobile",Number)
try {
    const requestData = {
      // headers:{
      //   id_token:window.sessionStorage.getItem("id_token")
      // },
      "username": Number,
      "password": password
  };
  console.log("Request", requestData)
    // Make the POST request to your Node.js server
    const response=await axios.post('http://13.50.183.255:9003/user-service/auth/login', requestData);
     
        // Handle the response from the Node.js server

        return await response;
  
      } catch (error) {
        return await error;
      } 

  } 

