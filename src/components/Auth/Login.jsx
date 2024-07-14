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
import axios from "axios";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidCred, setInvalidCred] = useState(null);

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
        const response = await axios.post(
          "http://192.168.116.226:8055/auth/login",
          values
        );

        console.log("res ", response);

        if (response?.data?.data?.user?.role == "authenticated") {
          toast(response?.data?.message);
          dispatch(setUser(response?.data?.data?.user?.user_metadata));
          localStorage.setItem("user", JSON.stringify(response?.data?.data?.user?.user_metadata));
          navigate("/dashboard");
        }

        if (response?.error) {
          toast(response?.error);
          setInvalidCred(response?.error);
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
        {loading && (
          <BarLoader className="mb-4" width={"100%"} color="#000000" />
        )}
        <CardHeader className="px-3 md:px-6">
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login and start management journey with us.
          </CardDescription>
          {invalidCred && <div className="text-red-500">{invalidCred}</div>}
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
                  <p className="text-red-500 text-xs">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>
            </div>
            <Button type="submit" className="w-full mt-5">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="hidden md:block w-[40rem]">
        <img src="../src/assets/login.svg" alt="login" className="w-[60%] mx-[20%]" />
      </div>
    </div>
  );
};

export default Login;
