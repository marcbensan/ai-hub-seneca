import React, { useState, useEffect } from "react";
import { SidebarData } from "./SidebarData";
import "../globals.css";

function Sidebar() {
    // since 'window' is client-side and using it for tailwind with templates
    // was executing the code server-side. Hence by using states we ensure it doesn't
    // cause server-side errors
    const [route, setRoute] = useState("")

    useEffect(() => {
        setRoute(window.location.pathname)
    }, [])

  return (
    <div className="h-full w-64 bg-[#2F4050]">
      <ul className="h-auto p-0 w-full">
        {SidebarData.map((row, key) => {
          return (
            <li
              key={key}
              onClick={() => {
                window.location.pathname = row.link;
            }}
            className={`w-full h-16 m-0 flex flex-row justify-center items-center text-slate-300 hover:cursor-pointer hover:bg-[#293846] ${route == row.link ? "bg-[#293846]" : ""}`}
            >
              <div className="flex-[30%] grid place-items-center">{row.icon}</div>
              <div className="flex-[70%]">{row.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
