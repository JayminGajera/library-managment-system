import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { BsPersonPlus } from "react-icons/bs";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { CgGym } from "react-icons/cg";



export default function Sidebar() {
  const location = useLocation();

  const mainLinks = [
    {
      icon: <FiHome />,
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <GrUserAdmin />,
      name: "Admin Profile",
      path: "/dashboard/admin",
    },
    {
      icon: <MdOutlineWorkspacePremium />,
      name: "Plan",
      path: "/dashboard/plan"
    }
  ]

  const secondaryLinks = [
    {
      icon: <FaRegAddressCard />,
      name: "Registration",
      path: "/dashboard/registration"
    },
    {
      icon: <BsPersonPlus />,
      name: "Members",
      path: "/dashboard/members"
    },
    {
      icon: <CgGym />,
      name: "Trainers",
      path: "/dashboard/trainers"
    },
  ]
 
  return (
    <div className="md:w-[18%] w-[4rem] h-dvh overflow-hidden pb-8 pt-5 border-r">
      <ul className="text-white flex flex-col border-b text-lg">
        {mainLinks.map(({ icon, name, path }) => (
          <li key={name} className={`m-1 pl-6 py-2 rounded-md ${location.pathname === path ? "bg-[#101c2c] text-[#DBEAFE] " : "hover:bg-[#101c2c] hover:text-[#DBEAFE]"}`}>
            <Link to={path} className="flex items-center gap-2">
              <p className="text-xl pr-10 md:pr-3">{icon}</p>
              <span className="text-base tracking-wider">{name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="text-white flex flex-col border-b-1 text-lg">
        {secondaryLinks.map(({ icon, name, path }) => (
          <li key={name} className={`m-1 pl-6 py-2 rounded-md ${location.pathname === path ? "bg-[#101c2c] text-[#DBEAFE]" : "hover:bg-[#101c2c] hover:text-[#DBEAFE]"}`}>
            <Link to={path} className="flex items-center gap-2">
              <p className="text-xl pr-10 md:pr-3">{icon}</p>
              <span className="text-base tracking-wider">{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
