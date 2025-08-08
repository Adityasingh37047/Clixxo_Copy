import React,{use, useEffect, useState}from "react";
import {fetchSystemInfo} from "../api/apiService"
// import {
//   LAN_INTERFACES,
//   SYSTEM_INFO,
//   VERSION_INFO,
// } from "../constants/SystemInfoConstants";



const InfoRow = ({ label, values, isIndented = false }) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-12 gap-4 text-sm ${isIndented ? "pl-6" : ""}`}
  >
    <div className="md:col-span-3 font-medium text-gray-700 break-words">{label}</div>
    {Array.isArray(values) ? (
      values.map((value, idx) => (
        <div key={idx} className="md:col-span-3 col-span-1 break-words">{value || ""}</div>
      ))
    ) : (
      <div className="md:col-span-9 col-span-1 break-words">{values}</div>
    )}
  </div>
);

const LanSection = ({ name, data }) => (
  <div className="p-6 border-b border-gray-200">
    <h3 className="font-semibold text-gray-700 mb-4 text-lg">{name}</h3>
    <div className="space-y-3">
      {Object.entries(data).map(([key, value]) => (
        <InfoRow key={key} label={key} values={value} />
      ))}
    </div>
  </div>
);

const SystemInfo = () => {
  const [LAN_INTERFACES,setLAN_INTERFACES]=useState([]);
  const [SYSTEM_INFO,setSYSTEM_INFO]=useState([]);
  const [VERSION_INFO, setVERSION_INFO ]=useState([]);
  const [error,setErros]=useState("");
const setSystemInfo= async()=>{
  try {
    
  
  const data = await fetchSystemInfo();
  console.log(data);
  if(data.success){
    setLAN_INTERFACES(data.details.LAN_INTERFACES);
    setSYSTEM_INFO(data.details.SYSTEM_INFO);
    setVERSION_INFO(data.details.VERSION_INFO);
    setErros("")
  }
else{
  setErros(data.error)
  setLAN_INTERFACES([]);
  setSYSTEM_INFO([]);
  setVERSION_INFO([]);
}
} catch (error) {
  setErros(error.message)
  setLAN_INTERFACES([]);
  setSYSTEM_INFO([]);
  setVERSION_INFO([]);
}
}
  useEffect(()=>{
    setSystemInfo();
    // setInterval(()=>{
    //   setSystemInfo();
    // },5000)
    
  },[]);
  return (
    <div className="bg-white min-h-[calc(100vh-80px)] p-2 sm:p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        {/* Error message with icon */}
        {error && (
          <div className="flex items-center mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <span className="mr-2 text-xl">❌</span>
            <span>{typeof error === 'string' ? error : JSON.stringify(error)}</span>
          </div>
        )}
        <div className="w-full h-9 bg-gradient-to-b from-[#d0ecff] via-[#7ecbfa] to-[#3b8fd6] rounded-t-lg flex items-center justify-center font-semibold text-lg text-gray-800 shadow mb-0">
          System Info
        </div>
        <div className="bg-white rounded-b-lg shadow-sm border-2 border-gray-400">
          {LAN_INTERFACES.map((lan) => (
            <LanSection key={lan.name} name={lan.name} data={lan.data} />
          ))}

          <div className="p-4 space-y-4">
            {SYSTEM_INFO.map((info, idx) => (
              <div key={idx}>
                <InfoRow label={info.label} values={info.value} />
                {info.extra && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-sm">
                    <div className="md:col-span-6 col-span-1"></div>
                    <div className="md:col-span-6 col-span-1">
                      {info.extra.map((item, i) => (
                        <div key={i}>{item}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <InfoRow label="Current Version" values="" />
            {VERSION_INFO.map((version, idx) => (
              <InfoRow
                key={idx}
                label={version.label}
                values={version.value}
                isIndented
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemInfo;
