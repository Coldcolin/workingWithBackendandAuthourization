import {Outlet} from "react-router-dom";
import "./AuthLayout.css";
import illus from "../assets/iluss.png"

const AuthLayout=()=>{
    
    return(
        <div className="AuthLayout">
            <div className="ContentHolder">
            <Outlet/>
            <div className="Illustration">
                <img src={illus}/>
            </div>
            </div>
            
        </div>
    )
}

export default AuthLayout