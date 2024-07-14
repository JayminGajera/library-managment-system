import React from "react";

export default function User(){
    return(
        <div>
            <div className="m-3 md:m-10 w-[82%] rounded-md">
            <p className="font-bold text-xl">👋 Welcome {user?.name}</p>
          </div>
        </div>
    )
}