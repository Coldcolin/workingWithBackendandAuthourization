import axios from "axios"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";


const Users=()=>{
    const token = useSelector((state)=> state?.token)
    const [user, setUser] = useState([])
    // const users=[{firstName: "Grace", lastName: "Adun"}, {firstName: "Micheal", lastName: "Ojo"}]

    const getUsers=async()=>{
        // console.log(token)
        const config = {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        }
        try{
            const response = await axios.get("https://testapifestac.onrender.com/api/v1/users",config)
            setUser(response?.data?.data)
        }catch(error){
            console.log(error?.response)
            Swal.fire(error?.response?.data?.message);
        }
    }

    useEffect(()=>{
        getUsers()
    },[])
    return(
        <div>
            {
                user?.map((e, i)=>(
                    <div key={i}>
                        <p>{e.firstName}</p>
                        <p>{e.lastName}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Users