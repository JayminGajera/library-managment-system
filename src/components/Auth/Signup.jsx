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
import SignUpSvg from "../../assets/signup.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidCred, setInvalidCred] = useState(null);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      role: "", // Add role to initial values
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
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
      role: Yup.string().required("Role is required"), // Add validation for role
    }),
    onSubmit: async (values) => {
      console.log("Form submitted", values);

      setLoading(true);
      try {
        const response = await axios.post(
          "https://wrl1t22t-8055.inc1.devtunnels.ms/auth/register",
          values
        );

       

        // if (result?.message) {
        //   toast(result?.message);
        //   navigate("/auth");
        // }

        // if (result?.error) {
        //   toast(result?.error);
        //   setInvalidCred(result?.error);
        // }

        console.log("res ", response);
      } catch (error) {
        console.log("Error while signup ", error);
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
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Create your account and start journey with us.
          </CardDescription>
          {invalidCred && <div className="text-red-500">{invalidCred}</div>}
        </CardHeader>
        <CardContent className="px-3 md:px-6">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="gymname">name</Label>
                <Input
                  id="name"
                  type="text"
                  {...formik.getFieldProps("name")}
                  placeholder="Enter Your Name"
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-red-500 text-xs">{formik.errors.name}</p>
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

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  {...formik.getFieldProps("role")}
                  className="input"
                >
                  <option value="" label="Select role" />
                  <option value="librarian" label="Librarian" />
                  <option value="admin" label="Admin" />
                  <option value="user" label="User" />
                </select>
                {formik.touched.role && formik.errors.role ? (
                  <p className="text-red-500 text-xs">{formik.errors.role}</p>
                ) : null}
              </div>
            </div>
            <Button type="submit" className="w-full mt-5">
              SignUp
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
