import "./SignUp.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'

const SignUp=()=>{
    const [seePassword, setSeePassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const User = z.object({
        firstName: z.string().min(3, { message: "Must be 3 or more characters long" }),
        lastName: z.string().min(3, { message: "Must be 3 or more characters long" }),
        Phone: z.string().length(10, {message: "Must be greater than 10 digits"}),
        DOB: z.string().date(),
        Sex: z.string(),
        isAdmin: z.coerce.boolean(),
        email: z.string().trim().email({message: "use a correct email"}).endsWith(".com", { message: "Only .com and .ng domains allowed" }),
        password: z.string().regex(/[!@#$%^&*(),.?":{}|<>]\d/, {message: "password must contain special character and number"})
    });
    
    const {register,handleSubmit, formState: { errors }} = useForm({ resolver: zodResolver(User) });

    const handleForm=async(t)=>{
        try{
            setLoading(true)
            await axios.post("https://testapifestac.onrender.com/api/v1/signup", t)
            Swal.fire("Sign Up Successfull!");
            setLoading(false)
            navigate("/")   
        }catch(err){
            console.log(err);
            setLoading(false)
        }
    }
    return(
        <div className="SignUp">
            <form  onSubmit={handleSubmit(handleForm)}>
                <input placeholder="email" required={true} {...register("email")}/>
                {errors.email && <span className="signUpError">{errors.email.message}</span>}
                <input placeholder="firstName" type="text" required={true} name="firstName" autoComplete="off" {...register("firstName")}/>
                {errors.firstName && <span className="signUpError">{errors.firstName.message}</span>}
                <input placeholder="lastName" type="text" required={true} name="lastName" autoComplete="off" {...register("lastName")}/>
                {errors.lastName && <span className="signUpError">{errors.lastName.message}</span>}
               
                <select {...register("Sex")}>
                    <option>---Sex---</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                {errors.Sex && <span className="signUpError">{errors.Sex.message}</span>}
                <select {...register("isAdmin")}>
                    <option>---admin---</option>
                    <option value="true">Admin</option>
                    <option value="">Not Admin</option>
                </select>
                {errors.isAdmin && <span className="signUpError">{errors.isAdmin.message}</span>}
                <input placeholder="date of Birth" type="date" {...register("DOB")}/>
                {errors.DOB && <span className="signUpError">{errors.DOB.message}</span>}
                <input placeholder="Phone Number" type="number" name="Phone Number" autoComplete="off" {...register("Phone")}/>
                {errors.Phone && <span className="signUpError">{errors.Phone.message}</span>}
                <div>
                <input placeholder="password" type={seePassword? "text":"password"}  required={true} {...register("password")}/>
                {seePassword?<IoEyeOff onClick={()=>setSeePassword(!seePassword)}/>: <IoEye onClick={()=>setSeePassword(!seePassword)}/>}
                {errors.password && <span className="signUpError">{errors.password.message}</span>}
                </div>
                <button type="submit" style={loading? {backgroundColor: "grey"}:{}} disabled={loading? true: false}>{ loading? "Signing Up...": "Sign Up"}</button>
            </form>
            <p>Already have an account? <span><Link to="/">Log In</Link></span></p>
        </div>
    )
}

export default SignUp