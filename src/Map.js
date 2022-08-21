import { useState, useEffect, useRef } from 'react';
import { Map, Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './Map.css'
import { useNavigate, useParams } from 'react-router-dom';


const mapboxAccessToken = 'pk.eyJ1Ijoic3RvdnNreSIsImEiOiJjbDcwcG9zNDMwZ251M29tdm1sYWx1aWI4In0.IDTGS31CW9NhaA15PWRhUQ';
const style = {
    'width': '80vw',
    'height': '100vh',

};
const initialViewState = {
    longitude: -81.694359,
    latitude: 41.499321,
    zoom: 8
};
const mapStyle = 'mapbox://styles/mapbox/streets-v9';


export default function MapPage() {


    const navigate = useNavigate();
    const { user_id } = useParams();

    const [bars, setBars] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [color, setColor] = useState(null);
    const mapRef = useRef()

    const onLoad = async () => {
        let isCancelled = false;
        await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/high%20school.json?limit=10&proximity=ip&types=poi&access_token=pk.eyJ1Ijoic3RvdnNreSIsImEiOiJjbDcwcDltcHIwZ2ZrM29wYjV4d2c3cGZyIn0.OVp4mCmKqRWaI1kJJVPv1Q')
        .then(res => {
            if (!isCancelled) {
                setBars(res.data);
                setLoading(false);
            }
        });
        return () => {
            isCancelled = true;
        };
    }

    useEffect(() => {
        
        onLoad();
        
    }, [])

    useEffect(() => {

    if (bars) {
        let isCancelled = false;
        let colors = [];
        bars.features.map(bar => {
        axios.get('http://localhost:3001/bars/poi/' + bar.id)
        .then(res => {
            if (!isCancelled) {
                                
                if (res.data.length !== 0 && res.data[0].length !== 0) {
                    if (res.data[0].hotness === 1) {colors.push("#0000FF");}
                    if (res.data[0].hotness === 2) {colors.push("#ADD8E6");}
                    if (res.data[0].hotness === 3) {colors.push("#ff9d5c");}
                    if (res.data[0].hotness === 4) {colors.push("#ff6600");}
                    if (res.data[0].hotness === 5) {colors.push("#d1001f");}
                    } else {
                        colors.push("#dcdcdc")
                    }
                }
            });
        })
        //console.log(colors)
        if (!color) setColor(colors);
        setLoading(false);
        return () => {
            isCancelled = true;
        };
     }
    }, [bars])


  return (!isLoading ? <div>
      <Map
      mapboxAccessToken={mapboxAccessToken}
      style={style}
      initialViewState={initialViewState}
      mapStyle={mapStyle}
      ref={mapRef}
      >
          {console.log(color)}

          {   
            

              bars.features.map((bar, i) => { 
                return <Marker 
                  key={bar.id} 
                  longitude={bar.geometry.coordinates[0]} 
                  latitude={bar.geometry.coordinates[1]}
                  onClick={() => navigate(`/rate/${bar.id}/${bar.geometry.coordinates[0]}/${bar.geometry.coordinates[1]}/${user_id}`)}
                  color={console.log(color)}>
                </Marker>
              })
              
            }



      </Map>
  </div> : null);
}
