/*

import './App.css';
import axios from 'axios';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import mapStyles from './mapStyles';
import { useEffect, useState, useRef } from 'react';

const libraries = ["places"];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
};
const center = {
  lat: 41.499321,
  lng: -81.694359
};
const options = {
  styles: mapStyles
};

export default function App() {

  const [bars, setBars] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [selectedBar, setSelectedBar] = useState(false);
  const mapRef = useRef()


  const { isLoaded, loadError } = useLoadScript({ 
    googleMapsApiKey: "AIzaSyCUvsQOXzUuvFwYXNE3TRz5f8-BWyRxqoA",
    libraries,
  });


  useEffect(() => {
    let isCancelled = false;
    axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/bar.json?limit=10&proximity=ip&types=poi&access_token=pk.eyJ1Ijoic3RvdnNreSIsImEiOiJjbDcwcDltcHIwZ2ZrM29wYjV4d2c3cGZyIn0.OVp4mCmKqRWaI1kJJVPv1Q')
    .then(res => {
        if (!isCancelled) {
            setBars(res.data);
            setLoading(false);

        }
    })

    return () => {
        isCancelled = true;
    };
}, [])

  if (loadError) return "Error loading maps."
  if (!isLoaded) return "Loading..."


  return (!isLoading ? <div>
    <GoogleMap
    mapContainerStyle={mapContainerStyle}
    zoom={8}
    center={center}
    ref={mapRef}
    >
      { bars.features.map(bar => {
          return <Marker   
          position={{lng: bar.geometry.coordinates[0], lat: bar.geometry.coordinates[1]}}
          onClick={e => setSelectedBar(bar)}
          >

          </Marker>
        })
      }

      {selectedBar ? (
          <InfoWindow position={{lng: selectedBar.geometry.coordinates[0], lat: selectedBar.geometry.coordinates[1]}}>

          </InfoWindow>
      ) : null
      }
    </GoogleMap>
  </div> : null);
}

*/