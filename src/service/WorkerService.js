import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function loginuser(Number,password) {
  console.log("Data email",Number.value)
try {
  //   const requestData = {
  //     headers:{
  //       id_token:window.sessionStorage.getItem("id_token")
  //     },
  //   "Number": Number
  // };
    // Make the POST request to your Node.js server
    const response=await axios.post('http://192.168.29.170:3000/api/endpoint/login',{
      query: {
      "Number": Number.value,
      "password":password.value
      }
    });
     
        // Handle the response from the Node.js server

        return await response;
  
      } catch (error) {
        return await error;
      } 

  } 

  export async function checkinAPI(token,userId) {
    console.log("Data token",token,'--',userId)
  try {

      const response=await axios.post('http://192.168.29.170:3000/api/endpoint/checkin',{
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json"
        },
        query: {
          'Authorization':token,
          userId
        }
      });
          return await response;
        } catch (error) {
          return await error;
        } 
    } 
    export async function checkoutAPI(token,userId) {
      console.log("Data token",token,'-checkout-',userId)
    try {
  
        const response=await axios.post('http://192.168.29.170:3000/api/endpoint/checkout',{
          query: {
            'Authorization':token,
            userId
          }
        });
            return await response;
          } catch (error) {
            return await error;
          } 
      } 

      export async function attendanceHistoryAPI(token) {
        console.log("attendanceHistoryAPI token",token)
      try {
    
          const response=await axios.get('http://192.168.29.170:3000/api/endpoint/attendanceHistory',{
            headers: {
              Authorization: ` ${token}`,
              "Content-Type": "application/json"
            },
            params: {
              "Authorization":token,
            }
          });
              return await response;
            } catch (error) {
              return await error;
            } 
        } 

      