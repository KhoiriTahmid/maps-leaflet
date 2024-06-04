import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Routing from "./Routing";
import FindLocation from "./FindLocation";
import { useState, useEffect } from "react";

export default function Map({setRoutePopup="dummy", loc = null, verifInput = null, h, w, type, data=[-6.3059358475001135, 106.75275203904764] }) {
  const [position, setPosition] = useState(data.alamat? data.alamat.koor:data);
  const [destination, setDestination] = useState(null);
  const [infoMap, setInfoMap] = useState(null);

  useEffect(() => {
    loc != null && setPosition(loc);
  }, [loc]);

  const handleMapClick = (e) => {
    setDestination([e.latlng.lat, e.latlng.lng]);
  };

  // const handleClicked = () => {
  //   if(setRoutePopup!="dummy"){
  //     setRoutePopup(true)
  //     console.log("ditekan")
  //     return
  //   }
  // };

  return (
    <div  className={` mx-auto ${type != 'tambah' ? (type!="updateAdmin" ? 'basis-2/3 ' : '') : ''} z-10  h-[${h}] overflow-hidden no-scrollbar`}>
      <div className="flex overflow-clip">
        <MapContainer style={{ height: h, width: "100%" }} className="" center={[position[0], position[1] + 0.05]} zoom={13} onClick={handleMapClick}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FindLocation setInfoMap={setInfoMap} verifInput={verifInput} position={position} setPosition={setPosition} />
          <Marker position={position} />
        </MapContainer>
      </div>
    </div>
  );
}
