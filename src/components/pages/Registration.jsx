import React from "react";
import Sidebar from "../Sidebar/sidebar";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { BarLoader } from "react-spinners";
import { Calendar } from "@/components/ui/calendar";

import {
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Registration = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      dateOfBirth: "",
      height: "",
      weight: "",
      contact: "",
      plan: "",
      isActive: false,
      Trainer: "",
      joiningDate: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      dateOfBirth: Yup.string().required("Date of birth is required"),
      contact: Yup.string().required("Contact Number is required"),
      height: Yup.string().required("Height is required"),
      weight: Yup.string().required("Weight is required"),
      plan: Yup.string().required("Plan is required"),
      isActive: Yup.string().required(
        "It is required to know wheather plan is currently active or not"
      ),
      trainer: Yup.string().required("Trainer is required"),
      joiningDate: Yup.string().required("Joining date is required"),
    }),

    onSubmit: async (values) => {
      console.log("Form submitted", values);

      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:4080/dashboard/registration",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values), // JSON.stringify is required here
          }
        );

        const result = await response.json();

        console.log("res ", result);
      } catch (error) {
        console.log("Error while registering a member", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex">
      <Sidebar />

      <Card className="w-full md:w-[30rem] mx-[10%] m-3 md:m-10">
        {loading && (
          <BarLoader className="mb-4" width={"100%"} color="#ffffff" />
        )}
        <CardContent className="px-3 md:px-6">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 mt-2">
                <Label htmlFor="gymname">Name</Label>
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
                <Label htmlFor="address">Contact No.</Label>
                <Input
                  id="contact"
                  type="text"
                  {...formik.getFieldProps("contact")}
                  placeholder="Enter Your Contact details"
                />
                {formik.touched.contact && formik.errors.contact ? (
                  <p className="text-red-500 text-xs">
                    {formik.errors.contact}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <Popover>
                  <PopoverTrigger >
                    {" "}
                    <Button
                      variant={"outline"}
                    >
                      {formik.initialValues.dateOfBirth ? (
                        format(formik.initialValues.dateOfBirth, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                       id="dateOfBirth"
                    {...formik.getFieldProps("dateOfBirth")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
              </div>
              <div className="flex gap-10">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Height</Label>
                  <Input
                    id="height"
                    type="string"
                    {...formik.getFieldProps("height")}
                    placeholder="Enter Your height in cm."
                  />
                  {formik.touched.height && formik.errors.height ? (
                    <p className="text-red-500 text-xs">
                      {formik.errors.height}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Weight</Label>
                  <Input
                    id="weight"
                    type="string"
                    {...formik.getFieldProps("weight")}
                    placeholder="Enter Your Weight in kg."
                  />
                  {formik.touched.weight && formik.errors.weight ? (
                    <p className="text-red-500 text-xs">
                      {formik.errors.weight}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label htmlFor="plan">Plan</label>
                <FormControl fullWidth>
                  <InputLabel id="plan-label" className="border-2">
                    Plan
                  </InputLabel>
                  <Select
                    labelId="plan-label"
                    id="plan"
                    value={formik.values.plan}
                    label="Plan"
                    onChange={(event) =>
                      formik.setFieldValue("plan", event.target.value)
                    }
                    {...formik.getFieldProps("plan")}
                  >
                    <MenuItem value="basic">Basic</MenuItem>
                    <MenuItem value="premium">Premium</MenuItem>
                    <MenuItem value="enterprise">Enterprise</MenuItem>
                  </Select>
                </FormControl>
                {formik.touched.plan && formik.errors.plan ? (
                  <p className="text-red-500 text-xs">{formik.errors.plan}</p>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="isActive">Plan Active?</label>
                <FormControlLabel
                  control={
                    <Checkbox
                      className=""
                      id="isActive"
                      checked={formik.values.isActive}
                      onChange={(event) =>
                        formik.setFieldValue("isActive", event.target.checked)
                      }
                      color="primary"
                    />
                  }
                  label="Yes"
                />
                {formik.touched.isActive && formik.errors.isActive ? (
                  <p className="text-red-500 text-xs">
                    {formik.errors.isActive}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Trainer</Label>
                <Input
                  id="trainer"
                  type="string"
                  {...formik.getFieldProps("Trainer")}
                  placeholder="What trainer do you choose"
                />
                {formik.touched.Trainer && formik.errors.Trainer ? (
                  <p className="text-red-500 text-xs">
                    {formik.errors.Trainer}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Joining Date</Label>
                <Input
                  id="joiningDate"
                  type="joiningDate"
                  {...formik.getFieldProps("joiningDate")}
                  placeholder="Enter the joining date."
                />
                {formik.touched.joiningDate && formik.errors.joiningDate ? (
                  <p className="text-red-500 text-xs">
                    {formik.errors.joiningDate}
                  </p>
                ) : null}
              </div>
            </div>
            <Button type="submit" className="w-full mt-5">
              Add
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registration;
