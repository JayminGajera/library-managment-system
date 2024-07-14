import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./Login";
import Signup from "./Signup";
import SignUpSvg from "../../assets/signup.svg";
import LoginSvg from "../../assets/login.svg";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="w-[100vw] h-auto my-8 md:my-3 mx-auto">
      {isLogin ? (
        <div className="md:hidden block w-[25rem] mb-4 mt-10">
          <img src={LoginSvg} alt="login" className="w-[60%] mx-[20%]" />
        </div>
      ) : (
        <div className="md:hidden block w-[25rem] mb-4 mt-10">
          <img src={SignUpSvg} alt="" className="w-[60%] mx-[20%]" />
        </div>
      )}

      <Tabs defaultValue="login" className="w-full md:px-10 px-2">
        <TabsList className="w-full md:w-[30rem] flex justify-center">
          <TabsTrigger
            onClick={() => setIsLogin(true)}
            value="login"
            className="w-[50%]"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setIsLogin(false)}
            value="signup"
            className="w-[50%]"
          >
            SignUp
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
