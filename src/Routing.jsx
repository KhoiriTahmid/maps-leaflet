import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import "./App.css";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

export default function Routing({ setInfoMap, position, setDestination, destination }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !destination || !position) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(...position), L.latLng(...destination)],
      routeWhileDragging: false,
      showAlternatives: true,
      show:false,
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        language: 'id'
      }),
      createMarker: function (i, wp) {
        return L.marker(wp.latLng, { draggable: false });
      },
      lineOptions: {
        styles: [
          { color: 'black', opacity: 0.15, weight: 9 },
          { color: 'white', opacity: 0.8, weight: 6 },
          { color: 'green', opacity: 1, weight: 2 }
        ]
      },
      altLineOptions: {
        styles: [
          { color: 'white', opacity: 0.8, weight: 6 },
          { color: 'blue', opacity: 0.3, weight: 2 },
          { color: 'red', opacity: 1, weight: 2 }
        ]
      }
    }).addTo(map);

    routingControl.on('routesfound', function (e) {
      const routes = e.routes;
      setInfoMap(routes);
    });

    return () => {
      if (map && routingControl) {
        map.removeControl(routingControl);
      }
    };
  }, [map, position?.[0], position?.[1], destination?.[0], destination?.[1], setInfoMap]);

  return null;
}
