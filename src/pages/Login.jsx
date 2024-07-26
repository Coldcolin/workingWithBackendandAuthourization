import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import "./Login.css"
import { Link } from "react-router-dom";
import { loginUser } from "../redux/auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {useDispatch} from "react-redux";
import Swal from 'sweetalert2'

const Login=()=>{
    const [seePassword, setSeePassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    

    const User = z.object({
        email: z.string().trim().email({message: "use a correct email"}).endsWith(".com", { message: "Only .com and .ng domains allowed" }),
        password: z.string().regex(/[!@#$%^&*(),.?":{}|<>]\d/, {message: "password must contain special character and number"})
    });

    const {register,handleSubmit, formState: { errors }} = useForm({ resolver: zodResolver(User) });
    const loginFunc=async(e)=>{
        try{
            setLoading(true)
            const response = await axios.post("https://testapifestac.onrender.com/api/v1/login", e);
            Swal.fire("login Successfull!");
            console.log(response)
            dispatch(loginUser(response?.data?.token));
            setLoading(false)
            // navigate("/")   
        }catch(err){
            console.log(err);
            setLoading(false)
        }
        
    }
    return(
        <div className="Login">
            <form onSubmit={handleSubmit(loginFunc)}>
                <input placeholder="email" name="email" required={true} {...register("email")}/>
                <div>
                <input placeholder="password" type={seePassword? "text":"password"} {...register("password")} required={true} />
                {seePassword?<IoEyeOff onClick={()=>setSeePassword(!seePassword)}/>: <IoEye onClick={()=>setSeePassword(!seePassword)}/>}
                </div>
                <button type="submit"style={loading? {backgroundColor: "grey"}:{}} disabled={loading? true: false}>{ loading? "Loging in...": "Login"}</button>
            </form>
            <p>You don't have an account? <span><Link to="/signUp">Sign Up</Link></span></p>
        </div>
    )
}
export default Login