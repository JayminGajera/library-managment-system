import React from "react";
import Sidebar from "../Sidebar/sidebar";

export default function Trainer(){
    return(
        <div className="flex">
            <Sidebar/>
            <div className="m-3 md:m-10">
                <h1>Trainer page. </h1>
            </div>
        </div>
    )
}