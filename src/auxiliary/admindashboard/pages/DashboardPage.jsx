import React from "react";


function DashboardPage(){

    return(
        <>
            <div className="mainBody_row1">

                    <div className="box_request">
                        <h6 className="mt-3 ms-3">Total no. of requests</h6>
                    </div>

                    <div className="box_request">
                        <h6 className="mt-3 ms-3">Total no. of approved requests</h6>
                    </div>

                    <div className="box_request">
                        <h6 className="mt-3 ms-3">Total no. of denied requests</h6>
                    </div>

            </div>

            <div className="mainBody_row2">
                
                    <div className="mainbodyrow2_col1 mt-4">
                         <h6 className="mt-3 ms-3">Task distribution</h6>

                         <div className="online_users">
                                <h6 className="d-flex justify-content-between mt-2 mb-2">
                                    <span className="ms-3">Staffer</span>
                                    <span className="me-3">No. of Tasked Catered</span>
                                </h6>
                         </div>
                    </div>

                    <div className="mainbodyrow2_col2 mt-4">
                        <h6 className="mt-3 ms-3">Total no. of completed <br /> task</h6>
                    </div>
                
            </div>

        </>
    )
}


export default DashboardPage;