import { MapContainer, TileLayer } from "react-leaflet";
import "./index.css";
import "leaflet/dist/leaflet.css";

import Routing from "./Routing";
import { useState } from "react";

export default function App() {
  const [position, setPosition] = useState({start:[-6.3059358475001135, 106.75275203904764], end:null})
  const [infoMap, setInfoMap] = useState(null)

  return (
    <div className="mx-auto h-screen w-screen overflow-hidden no-scrollbar">
      <div className="flex m-5 rounded-xl overflow-clip">
        <MapContainer style={{ height: "94vh", width: "75%" }} className="" center={position.start} zoom={13} >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            
          />
          <Routing setInfoMap={setInfoMap}  position={position} setPosition={setPosition}/>
        </MapContainer>
        <SideBarMaps infoMap={infoMap} />
      </div>
    </div>
  );
}

const SideBarMaps = ({infoMap})=>{
  
  console.log(infoMap)
  return(
    <>
    {infoMap!=null ? (<div className=" pl-3 gap-2 flex flex-col h-[94vh] w-[35%] text-slate-100 bg-slate-800 z-50">
    <div className="header mb-3 mt-3 flex flex-col gap-3 text-xl font-bold">
      <p className="">Asal : {infoMap[0].name.slice(0,infoMap[0].name.indexOf(","))} / FST</p>
      <p className="">Tujuan : {infoMap[0].name.slice(infoMap[0].name.indexOf(",")+1)}</p>
      <p className=" text-base font-medium">{Math.floor(infoMap[0].summary.totalTime/60)} menit ({Math.floor(infoMap[0].summary.totalDistance/1000)} km)</p>
    </div>
    {infoMap[0].instructions.map(e=>{
      return (
        <div className="">
          <p className=" text-lg font-semibold">{e.type=="Head" || e.type=="DestinationReached"? e.type:e.text }</p>
          <p className=" text-sm font-light">{e.distance} m</p>
        </div>
      )
    })}
  </div>):<div className=" pl-3 gap-2 flex flex-col h-[94vh] w-[35%] text-slate-100 bg-slate-800 z-50">masuka alamat anda</div>
}
        </>
  )
}
