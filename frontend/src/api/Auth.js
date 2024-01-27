import axios from 'axios'
import { baseUrl } from '../config/BaseUrl';
 const loginApi=async(credentials)=>{
    
   const result= await axios.post(baseUrl+'/login',credentials)
//    console.log(result);
   return result
} 
export default loginApi