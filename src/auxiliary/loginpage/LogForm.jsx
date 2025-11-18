import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CiLogin } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { LuEye, LuEyeOff } from "react-icons/lu";


function LogForm(){

     const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const navigate = useNavigate();

    const handleLogin = (e) => {
                                    e.preventDefault();
                                    // You can add authentication logic here later
                                    navigate("/dashboard"); // ✅ go to dashboard page
                                };

    return(
        <>
            <div className="logform">
                        <div className="logo mb-3">
                                <div className="logo_img">
                                    
                                </div>
                        </div>

                        <div className="formlogin">

                            <form className="log_form" onSubmit={handleLogin}>

                                    <div className="input-group mb-3 mt-5">
                                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Email"/>
                                    </div>

                                    <div className="input-group mb-3">
                                        <input className="form-control" type={showPassword ? "text" : "password"} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Password" />
                                         <span className="toggle-password" onClick={() => setShowPassword((prev) => !prev)}>
                                            {showPassword ? <LuEyeOff /> : <LuEye />}
                                         </span>
                                    </div>

                                    <button className="login_button" type="submit"><CiLogin className="mb-1"/> LOGIN</button>

                                    <div class="divider">
                                        <span className="or">OR</span>
                                    </div>

                                    <button className="google_button"><FcGoogle className="mb-1"/> Sign in the Google</button>

                            </form>

                        </div>
            </div>
        </>
    )
}

export default LogForm;