import axios from 'axios';

export async function loginuser(Number,password) {
  console.log("Data email",Number)
try {
    const requestData = {
      headers:{
        id_token:window.sessionStorage.getItem("id_token")
      },
    "Number": Number
  };
    // Make the POST request to your Node.js server
    const response=await axios.post('http://192.168.29.170:3000/api/endpoint/login',{
      query: {
      "Number": Number,
      "password":password
      }
    });
     
        // Handle the response from the Node.js server

        return await response;
  
      } catch (error) {
        return await error;
      } 

  } 

