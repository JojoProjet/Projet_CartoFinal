import React, {useState, useEffect} from 'react'

import Box from '@mui/material/Box';
import MapLeaflet from '../components/Map/Map'
import RightComposant from '../components/RightComposant';

import aeroport from '../data/aeroport.json'

import './Main.css'
import { height } from '@mui/system';
import DThree from '../components/Three/DThree';

const Main = () => {

    const [active, setActive] = useState(false)

    const [searchTerm,setSearchTerm] = useState('')
    const [dataAeroport, setDataAeroport] = useState(aeroport)
    const [cardItem, setCardItem] = useState(null)

    const [start, setStart] = useState([])
    const [arrival, setArrival] = useState([])

    const [paths, setPaths] = useState([])

    const handleCardClick = (item) => {
        setCardItem(item)
    }

    const state = {
        active: active,
        setActive: setActive,
        paths: paths,
        setPaths: setPaths,
        dataAeroport: dataAeroport,
        cardItem: cardItem,
        handleCardClick: handleCardClick,
        setSearchTerm: setSearchTerm,
        start: start, 
        setStart: setStart, 
        arrival: arrival, 
        setArrival: setArrival
    }

    useEffect( () => {
        if(start === arrival) {
            setStart(arrival)
            setArrival("")
        }
    }, [start])

    useEffect( () => {
        console.log(paths)
    }, [paths])

    useEffect( () => {
        if(arrival === start) {
            setArrival(start)
            setStart("")
        }
    }, [arrival])

    useEffect( () => {
        let val = aeroport.filter( (val) => {
            if(searchTerm === "")
                return val
            else if(val.country.toLowerCase().includes(searchTerm.toLowerCase()))
                return val
        })
        setDataAeroport(val)
    }, [searchTerm])

    return (
        <Box className={"Main"} component="div" sx={{ width: '97%', display: 'flex', justifyContent: 'center', margin: 'auto', marginTop: 5 }}>
            <Box component="div" sx={{ width: '29%' }}>
                <RightComposant state={state}/>
            </Box>
            <Box component="div" sx={{ maxWidth: '69%', width: '69%', margin: 'auto' }}>
                {
                    !active ?
                    <MapLeaflet 
                        state={state} 
                    /> :
                    <DThree />
                }
            </Box>
        </Box>
    )
}

export default Main