import axios from 'axios'
import { baseUrl } from '../config/BaseUrl';
 const signApi=async(credentials)=>{
   const result= await axios.post(baseUrl+'/register',credentials)
   return result
}
export default signApi