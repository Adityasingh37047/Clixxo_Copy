import React from "react";
import {
  LAN_INTERFACES,
  SYSTEM_INFO,
  VERSION_INFO,
} from "../constants/SystemInfoConstants";

const InfoRow = ({ label, values, isIndented = false }) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-12 gap-4 text-sm ${isIndented ? "pl-6" : ""}`}
  >
    <div className="md:col-span-3 font-medium text-gray-700">{label}</div>
    {Array.isArray(values) ? (
      values.map((value, idx) => (
        <div key={idx} className="md:col-span-3 col-span-1">{value || ""}</div>
      ))
    ) : (
      <div className="md:col-span-9 col-span-1">{values}</div>
    )}
  </div>
);

const LanSection = ({ name, data }) => (
  <div className="p-4">
    <h3 className="font-semibold text-gray-700 mb-3">{name}</h3>
    <div className="space-y-2">
      {Object.entries(data).map(([key, value]) => (
        <InfoRow key={key} label={key} values={value} />
      ))}
    </div>
  </div>
);

const SystemInfo = () => {
  return (
    <div className="bg-white min-h-[calc(100vh-80px)] p-2 sm:p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <div className="w-full h-9 bg-gradient-to-b from-[#d0ecff] via-[#7ecbfa] to-[#3b8fd6] rounded-t-lg flex items-center justify-center font-semibold text-lg text-gray-800 shadow mb-0">
          System Info
        </div>
        <div className="bg-white rounded-b-lg shadow-sm border border-gray-400">
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
