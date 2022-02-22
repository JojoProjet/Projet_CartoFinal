import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import haversine from 'haversine-distance'

function ModalContent(props) {

    let state = props.state
    let dataStart = props.dataStart
    let dataArrival = props.dataArrival

    let km = Math.floor(haversine( {lat: dataStart.lat, lng: dataStart.lon}, {lat: dataArrival.lat, lng: dataArrival.lon}) / 1000)

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
             Your voyageee !
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Resume</h4>
          <p>
          Depart : {dataStart.name}, {dataStart.country}<br/>
          Arrived : {dataArrival.name}, {dataArrival.country}<br/>
          Distance : {km} Km<br/>
          Durée du voyage : {parseInt(km/600) === 0 ? "< 1" : parseInt(km/600)} heures
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Voyage !</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default ModalContent