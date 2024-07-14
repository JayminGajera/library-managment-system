import React from "react";
import Sidebar from "../Sidebar/sidebar";

export default function Plan(){
    return(
        <div className="flex">
            <Sidebar/>
            <div className="m-3 md:m-10">
                <h1>Plans page </h1>
            </div>
        </div>
    )
}