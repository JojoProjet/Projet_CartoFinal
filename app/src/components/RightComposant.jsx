import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CustomListItem from './CustomListItem';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Autocomplete from '@mui/material/Autocomplete';
import train from '../assets/train.png'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CustomAutoComplete from './CustomAutoComplete';

import { Button } from '@mui/material';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import ModalContent from './ModalContent';

const RightComposant = ({state}) => {

    const [dataName, setDataName] = useState([])
    const [dataCountry, setDataCountry] = useState([])
    const [dataCity, setDataCity] = useState([])

    const [modalShow, setModalShow] = React.useState(false);

    const [dataStart, setDataStart] = useState([])
    const [dataArrival, setDataArrival] = useState([])

    useEffect( () => {
        let objName = []
        let objCountry = []
        let objCity = []

        state.dataAeroport.map(elm => {
            objName.push(elm.name)
            objCountry.push(elm.country)
            objCity.push(elm.city)
        })

        setDataName(objName)
        setDataCountry(objCountry.filter( (v, i) => objCountry.indexOf(v) === i))
        setDataCity(objCity.filter( (v, i) => objCity.indexOf(v) === i))
    }, [])

    const handleClickModalDestination = () => {
        if(state.start && state.arrival) {
            setModalShow(true)
            state.dataAeroport.filter( (val) => {
                if(val.name.toLowerCase().includes(state.start.toLowerCase()))
                  setDataStart(val)
                else if(val.name.toLowerCase().includes(state.arrival.toLowerCase())) {
                  setDataArrival(val)
                }
            })
        }
    }

    const onHideClose = () => {
        setModalShow(false)
        state.handleCardClick(dataStart)
        let newPath = [
            {lat: parseFloat(dataStart.lat), lng: parseFloat(dataStart.lon), slide: "RIGHT_ROUND"},
            {lat: parseFloat(dataArrival.lat), lng: parseFloat(dataArrival.lon)},
        ]
        state.setPaths([...state.paths, newPath])
    }

    return (
        <Box component="div" sx={{ width: '100%', height: '99vh', display: 'block' }}>

            <Box mb={2}>
                <FormControlLabel
                value="3D"
                control={<Switch onChange={() => state.setActive(!state.active)} color="primary" />}
                label="3D"
                labelPlacement="top"
                />

                <CustomAutoComplete data={{aeroport: dataName}} state={{value: state.start, setValue: state.setStart}} label={"Start destination"} />
                <CustomAutoComplete data={{aeroport: dataName}} state={{value: state.arrival, setValue: state.setArrival}} label={"Arrival destination"} />
                
                <Button style={{padding: 10, marginTop: 10, width: '80%'}} color="success" variant="contained" onClick={handleClickModalDestination}>Voyager</Button>
            {
                <ModalContent  
                    state={state}
                    dataStart={dataStart}
                    dataArrival={dataArrival}
                    show={modalShow}
                    onHide={onHideClose}
                />
            }

            </Box>

            <Divider variant="fullWidth" /> 
           
            <Box component="div" sx={{height: '70vh'}}>


                <Autocomplete
                    onChange={(event, value) => state.setSearchTerm(value) } 
                    disablePortal
                    id="combo-box-demo"
                    options={dataCountry}
                    sx={{ width: '80%', marginLeft: 'auto', marginRight: 1, marginTop: 2, marginBottom: 2 }}
                    renderInput={(params) => <TextField  onChange={(event) => state.setSearchTerm(event.target.value)} {...params} label="Search Country" />}
                    />

                <CustomListItem state={state} />
            </Box>
        </Box>
  )
}

export default RightComposant