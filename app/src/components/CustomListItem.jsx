import React from 'react'
import avion from '../assets/avion.png'

import { Scrollbars } from "react-custom-scrollbars";
import {
  CardContainer,
  Li
} from "./resultPageStyle";
import CardMarker from './Map/CardMarker';

const CustomListItem = ( { state } ) => {
    return (
        <Scrollbars style={{ width: '95%', maxHeight: '50vh', margin: 'auto' }}>
            <CardContainer>
            {state.dataAeroport.slice(0, 200).map((item, index) => (
                <Li style={{marginBottom: 10, marginTop: 10}} key={index}>
                    <CardMarker elm={item} state={state} icon={avion} width='95%' />
                </Li>
            ))}
            </CardContainer>
        </Scrollbars>
    )
}

export default CustomListItem