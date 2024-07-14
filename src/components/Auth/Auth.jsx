import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./Login";
import Signup from "./Signup";


const Auth = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <Tabs defaultValue="login" className="w-full md:px-10 px-2">
        <TabsList className="w-full md:w-[30rem] flex justify-center">
          <TabsTrigger value="login" className="w-[50%]">
            Login
          </TabsTrigger>
          <TabsTrigger value="signup" className="w-[50%]">
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
