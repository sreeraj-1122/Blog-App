import axios from 'axios'
import { baseUrl } from '../config/BaseUrl';
 const getPostApi=async()=>{
   const result= await axios.get(baseUrl+'/post')
   return result
}
export default getPostApi