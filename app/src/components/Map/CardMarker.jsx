import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';


const CustomTypo = ( {text} ) => {
  return  (
    <Typography variant="body2" color="text.secondary">
      {text}
    </Typography>
  )
}

const CardMarker = ( { elm, state, icon, width } ) => {

  const showTextElm = (elm) => elm === "" ? "blank" : elm

  const handleClickAddStart = () => {
    state.setStart(elm.name)
  }

  const handleClickAddArrival = () => {
    state.setArrival(elm.name)
  }

  return (
    <Card style={{display: 'block'}} sx={{ width: width || 300, margin: 'auto' }} >
        {!width ? <CardMedia
            component="img"
            height="250"
            image={icon}
            alt={elm.name}
          /> : <></>
        }
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {elm.name}
          </Typography>
          <CustomTypo text={`City : ${showTextElm(elm.city)}`} />
          <CustomTypo text={`State : ${showTextElm(elm.state)}`} />
          <CustomTypo text={`Country : ${showTextElm(elm.country)}`} />
          <CustomTypo text={`Phone Number : ${showTextElm(elm.phone)}`} />
        </CardContent>
      <CardActions style={{margin: 'auto', justifyContent: 'center'}}>
        <Button style={{padding: 10}} onClick={handleClickAddStart} variant="contained" size="small" color="primary">
          Add to start
        </Button>
        <Button style={{padding: 10}} onClick={handleClickAddArrival} size="small" variant="contained" color="secondary">
          Add to arrival
        </Button>
        {width ? <Button style={{padding: 10}} onClick={() => state.handleCardClick(elm)} size="small" variant="contained" color="info">
          Show in map
        </Button> : <></>
        }
      </CardActions>
    </Card>
  )
}

export default CardMarker