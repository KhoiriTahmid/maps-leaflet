import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Routing from "./Routing";
import FindLocation from "./FindLocation";
import { useState, useEffect } from "react";

export default function MapWithSide({ loc = null, verifInput = null, h, w, type, user }) {
  const [position, setPosition] = useState([-6.3059358475001135, 106.75275203904764]);
  const [destination, setDestination] = useState(user?.alamat?.koor);
  const [infoMap, setInfoMap] = useState(null);
  const handleMapClick = (e) => {
    setDestination([e.latlng.lat, e.latlng.lng]);
  };

  return (
    <div className={`mx-auto ${type != 'tambah' ? (type!="updateAdmin" ? 'basis-2/3 ' : '') : ''}   h-[${h}] overflow-hidden no-scrollbar`}>
      <div className={`flex ${type=="showOnDash"? " w-11/12":"w-screen"} `}>
        <MapContainer style={{ height: h, width: "100%" }} className=" basis-3/5" center={[position[0], position[1] + 0.05]} zoom={13} onClick={handleMapClick}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Routing setInfoMap={setInfoMap} position={[position, destination]} setDestination={setDestination} destination={destination}/>
          <Marker position={position} />
          {destination && <Marker position={destination} />}
        </MapContainer>
        <SideInfo infoMap={infoMap} user={user} />
      </div>
    </div>
  );
}

const SideInfo = ({ infoMap, user }) => {
    return (
      <>
        {infoMap != null ? (
          <div className="pl-3 gap-2 flex flex-col h-[94vh] basis-2/5 text-slate-100 bg-slate-800 z-10 px-5 overflow-y-auto">
            <div className="header mb-3 mt-3 flex flex-col gap-3 text-xl font-bold">
              <p>Asal: FST</p>
              <p className="break-words">Tujuan: {user.alamat.nama}</p>
              <p className="text-base font-medium text-slate-300">
                {Math.floor(infoMap[0].summary.totalTime / 60)} menit ({Math.floor(infoMap[0].summary.totalDistance / 1000)} km)
              </p>
            </div>
            <div className="flex-grow overflow-y-auto">
              {infoMap[0].instructions.map((e, index) => (
                <div key={index} className="mb-4">
                  <p className="text-lg font-semibold">
                    {e.type === "Head" || e.type === "DestinationReached" ? e.type : e.text}
                  </p>
                  <p className="text-sm font-light">{e.distance} m</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="pl-3 gap-2 flex-col h-[94vh] w-[35%] text-slate-100 bg-slate-800 z-10 flex items-center justify-center text-center">
            Masukan alamat anda
          </div>
        )}
      </>
    );
  };
  
  