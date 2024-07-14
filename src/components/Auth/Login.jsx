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
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import LoginSvg from "../../assets/login.svg";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidCred,setInvalidCred] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      console.log("Form submitted", values);
      setInvalidCred(null);
      setLoading(true);

      try {
        const response = await fetch("https://fitadmin.onrender.com/gym/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values), // JSON.stringify is required here
        });

        const result = await response.json();

        console.log("res ", result);

        if (result?.data?.user?.role == "authenticated") {
          toast(result?.message);
          dispatch(setUser(result?.data?.user?.user_metadata));
          localStorage.setItem("email",JSON.stringify(result?.data?.user?.user_metadata));
          navigate("/dashboard");
        }

        if(result?.error){
          toast(result?.error);
          setInvalidCred(result?.error);
        }
      } catch (error) {
        console.log("Error while login");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex">
    <Card className="w-full md:w-[30rem]">
      {loading && <BarLoader className="mb-4" width={"100%"} color="#ffffff" />}
      <CardHeader className="px-3 md:px-6">
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login and start management journey with us.
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
                <p className="text-red-500 text-xs">{formik.errors.password}</p>
              ) : null}
            </div>
          </div>
          <Button type="submit" className="w-full mt-5">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
    </div>
  );
};

export default Login;
