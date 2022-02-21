import React, {useState} from 'react'
import { Marker, Popup } from 'react-leaflet'

import CardMarker from './CardMarker';


const CustomMarker = ( { index, elm, icon, iconUrl, state } ) => {
  const [nurse, setNurse] = useState(null);

  const position = [elm.lat, elm.lon]


  return (
    <Marker 
      key={index} 
      icon={icon}
      position={position} 
      onmouseover={() => setNurse(elm)}
    >
        <Popup
          position={position}  
        >
          <CardMarker elm={elm} state={state} icon={iconUrl} />
        </Popup>
    </Marker>
  )
}

export default CustomMarker