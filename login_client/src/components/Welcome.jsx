import axios from "axios"
import { useEffect, useState } from "react";
axios.defaults.withCredentials=true;
export const Welcome=()=>{
    const [user,setUser]=useState('');
    const sendRequest = async () => {
        try {
          const res = await axios.get('http://localhost:9000/user', {
            withCredentials: true,
          });
          if (res.status === 200) {
            const data = res.data;
            return data;
          } else {
            console.log('Error:', res.statusText);
            throw new Error('Unexpected response status');
          }
        } catch (err) {
          console.log('Error:', err.message);
          throw err;
        }
      };
    useEffect(()=>{
        sendRequest().then((data)=>setUser(data.user));
    },[])
    return(
        <>
          {user && <h1>{user.name}</h1>}
        </>
    )
}

// export const Welcome=()=>{
//     return (
//         <>
//          welcome
//         </>
//     )
// }