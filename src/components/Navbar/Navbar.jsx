import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/userSlice";

const Navbar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    if(user){
      navigate("/dashboard");
    }else{
      navigate("/");
    }
  }, []);

  return (
    <div className="p-3 border-b ">
      <div className="flex items-center justify-between md:px-10 px-2">
        <div className="font-bold text-xl md:text-2xl ">Library Managment System</div>
        <div>
          {!user ? (
            <div className="flex gap-x-2">
              <Button onClick={() => navigate("/auth")}>Login</Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="cursor-pointer">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuLabel className="text-[0.8rem] opacity-50">
                  {user?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Profile</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel
                  className="flex items-center gap-x-2 text-red-500 hover:bg-red-800 hover:text-red-100"
                  onClick={() => {
                    navigate("/auth");
                    dispatch(setUser(""));
                    localStorage.removeItem("email");
                  }}
                >
                  <LogOut className="w-[1.2rem]" />
                  Log Out
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
