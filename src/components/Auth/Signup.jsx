import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { EyeIcon, EyeOff } from "lucide-react";
import { BarLoader } from "react-spinners";
import SignUpSvg from "../../assets/signup.svg"
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidCred,setInvalidCred] = useState(null);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      libraryName:"",
    },
    validationSchema: Yup.object({
      libraryName: Yup.string().required("Library Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(7, "Password must be at least 7 characters long")
        .matches(
          /(?=^.{7,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
          "Password must include uppercase, lowercase, special symbol, and number"
        )
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      console.log("Form submitted", values);

      // setLoading(true);
      // try {
      //   const response = await fetch("https://fitadmin.onrender.com/gym/signup", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(values), // JSON.stringify is required here
      //   });

      //   const result = await response.json();

      //   if (result?.message) {
      //     toast(result?.message);
      //     navigate("/auth");
      //   }

      //   if(result?.error){
      //     toast(result?.error);
      //     setInvalidCred(result?.error);
      //   }

      //   console.log("res ", result);
      // } catch (error) {
      //   console.log("Error while signup ", error);
      // } finally {
      //   setLoading(false);
      // }
    },
  });
  return (
    <div className="flex">
      <Card className="w-full md:w-[30rem]">
        {loading && (
          <BarLoader className="mb-4" width={"100%"} color="#ffffff" />
        )}
        <CardHeader className="px-3 md:px-6">
          <CardTitle>Sign up For Admin</CardTitle>
          <CardDescription>
            Create your account and start journey with us.
          </CardDescription>
          {
          invalidCred && (
            <div className="text-red-500">{invalidCred}</div>
          )
        }
        </CardHeader>
        <CardContent className="px-3 md:px-6">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="gymname">Library Name</Label>
                <Input
                  id="libraryname"
                  type="text"
                  {...formik.getFieldProps("libraryName")}
                  placeholder="Enter Your Library Name"
                />
                {formik.touched.libraryName && formik.errors.libraryName ? (
                  <p className="text-red-500 text-xs">
                    {formik.errors.libraryName}
                  </p>
                ) : null}
              </div>
             
             
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                  placeholder="Enter Your Email"
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-red-500 text-xs">{formik.errors.email}</p>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...formik.getFieldProps("password")}
                    placeholder="Enter Your Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2"
                  >
                    {showPassword ? <EyeIcon /> : <EyeOff />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-red-500 text-xs">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>
            </div>
            <Button type="submit" className="w-full mt-5">
              SignUp
            </Button>

            <div onClick={() => navigate("/auth/user")} className="text-center cursor-pointer text-sm">Sign up for <span className="underline text-blue-700 mt-2">user</span></div>
          </form>
        </CardContent>
      </Card>
    
    </div>
  );
};

export default Signup;
