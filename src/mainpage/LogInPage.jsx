import React from "react";

import "../css/mainpage.css";
import tgplogo from '../assets/image/tgplogo.png';
import biglogo from '../assets/image/biglogo.png';
import LogForm from "../auxiliary/loginpage/LogForm";

function LogInPage(){

    return(
        <>
        <div className="log_body">

            <div className="col_1">
                    <img src={biglogo}/>
            </div>

            <div className="col_2">
                    <LogForm />
            </div>

        </div>
        </>
    )
}


export default LogInPage;