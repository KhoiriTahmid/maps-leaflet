import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { useState } from "react";
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

export default function FinfLocation({setInfoMap, verifInput, position, setPosition}) {
  const map = useMap();
  const searchControlRef = useRef(null);
  const [currentLoc, setCurrentLoc] = useState(false) //kalo mau pake lokasi
  const [alamat, setAlamat] = useState('') 

  const reverseGeocode = async (lat, lng) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    const data = await response.json();
    return data.display_name;
  };


  useEffect(() => {
    const handleClick = async (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
      verifInput("alamat", {nama:(await reverseGeocode(e.latlng.lat, e.latlng.lng)), koor:[e.latlng.lat, e.latlng.lng]});
    };

    map.on('click', handleClick);

    // Cleanup function to remove the event listener
    return () => {
      map.off('click', handleClick);
    };
  }, [map]);


  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [[position[0], position[1]+ 0.05], map]);
  
  
  (position==[] || currentLoc) && navigator.geolocation.getCurrentPosition(({coords})=>setPosition([coords.latitude, coords.longitude]))

  useEffect(() => {
    if (!map) return; 
  
    const provider = new OpenStreetMapProvider();
  
    if (!searchControlRef.current) {
      searchControlRef.current = new GeoSearchControl({
        provider: provider,
        style: 'bar',
        showMarker: false,
        showPopup: false,
        marker: {
          icon: new L.Icon.Default(),
          draggable: true,
        },
        maxMarkers: 1,
        retainZoomLevel: false,
        animateZoom: true,
        autoClose: true,
        searchLabel: 'Enter address',
        keepResult: true,
      });
      
      map.addControl(searchControlRef.current);

     
    }
  
    return () => {
      if (searchControlRef.current) {
        map.removeControl(searchControlRef.current);
        searchControlRef.current = null;
      }
    };
  }, [map, position]);
  

  return null;
}


//search position, current loc, change popup, bhs






// import { useEffect, useRef } from "react";
// import L from "leaflet";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import "leaflet-routing-machine";
// import { useMap } from "react-leaflet";
// import { useState } from "react";
// import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
// import 'leaflet-geosearch/dist/geosearch.css';
// import "./App.css"

// L.Marker.prototype.options.icon = L.icon({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
// });

// export default function FinfLocation({setInfoMap, position, setPosition}) {
//   const map = useMap();
//   const searchControlRef = useRef(null);
//   const [currentLoc, setCurrentLoc] = useState(false)
//   //const [loc, setLoc] = useState([])

//   map.on('click', function(e) {
//     setPosition([e.latlng.lat, e.latlng.lng])
//   });
  
  
//   (position==[] || currentLoc) && navigator.geolocation.getCurrentPosition(({coords})=>setPosition([coords.latitude, coords.longitude]))

//   useEffect(() => {
//     if (!map) return; 
  
//     const provider = new OpenStreetMapProvider();
  
//     if (!searchControlRef.current) {
//       searchControlRef.current = new GeoSearchControl({
//         provider: provider,
//         style: 'bar',
//         showMarker: false,
//         showPopup: false,
//         marker: {
//           icon: new L.Icon.Default(),
//           draggable: true,
//         },
//         maxMarkers: 1,
//         retainZoomLevel: false,
//         animateZoom: true,
//         autoClose: true,
//         searchLabel: 'Enter address',
//         keepResult: true,
//       });
      
//       map.addControl(searchControlRef.current);

//       // const handleSearchResult = (e) => {
//       //   const result = e.result;
//       //   console.log(result);
//       // };
  
//       // if (searchControlRef.current && searchControlRef.current.on) {
//       //   // Attach event listener for the result event
//       //   searchControlRef.current.on('result', handleSearchResult);
//       // } else {
//       //   console.error('searchControlRef.current does not have an on method');
//       // }
//     }
  
//     return () => {
//       if (searchControlRef.current) {
//         map.removeControl(searchControlRef.current);
//         searchControlRef.current = null;
//       }
//     };
//   }, [map, position]);
  

//   return null;
// }


// //search position, current loc, change popup, bhs
