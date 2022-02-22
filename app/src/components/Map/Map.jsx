import React, { useState, useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from "leaflet";

import avion from '../../assets/avion.png'
import station from '../../data/station.json'
import CustomMarker from './CustomMarker'
import LeafletBezier from './LeafletBezier';

const position = [51.505, -0.09]

const CreateMarker = ( { state, icon, iconUrl } ) => {
    return (
        state.dataAeroport.slice(0, 200).map((elm, index) =>     
            <CustomMarker key={index} index={index} elm={elm} icon={icon} iconUrl={iconUrl} state={state} />
        )
    )
}

const customMarkerAvion = new L.icon({
    iconUrl: avion,
    iconSize: [25, 25],
    iconAnchor: [13, 0]
});

const Map = ( { state } ) => {

    const [map, setMap] = useState(null)

    const ZOOM = 13

    useEffect(() => {
        if (!state.cardItem || !map) return;
        const { lat, lon } = state.cardItem;
        map.flyTo( [lat, lon]);
    }, [state.cardItem]);

    return (
        <MapContainer style={{ height: "95vh" }}  center={position} zoom={13} whenCreated={setMap}>
            
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <CreateMarker state={state} icon={customMarkerAvion} iconUrl={avion} />
            {
                map !== null ? <LeafletBezier map={map} paths={state.paths} /> : <></>
            }

        </MapContainer>
    )

}

export default Map