import axios from 'axios'
import { baseUrl } from '../config/BaseUrl';
 const uploadPostApi=async(credentials,header)=>{
   const result= await axios.post(baseUrl+'/create',credentials,header)
   return result
}
export default uploadPostApi