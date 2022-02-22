import React from "react";
import ReactGlobe from "react-globe.gl";
import { renderToStaticMarkup } from "react-dom/server";
import aeroport from '../../data/aeroport.json'

const _renderPopup = (index) => {
  return (
    <div className="Popup">
      <div className="Popup__title">Popup</div>
      <div className="Popup__content">Item: {index}</div>
    </div>
  );
};

const N = 20;
const arcsData = [...Array(N).keys()].map((_, index) => ({
  startLat: (Math.random() - 0.5) * 180,
  startLng: (Math.random() - 0.5) * 360,
  endLat: (Math.random() - 0.5) * 180,
  endLng: (Math.random() - 0.5) * 360,
  name: renderToStaticMarkup(_renderPopup(index)),
  color: [["red", "white", "blue", "green"][Math.round(Math.random() * 3)], ["red", "white", "blue", "green"][Math.round(Math.random() * 3)]],
  endpoint: `https://google.com?q=${index}`
}));


function getTooltipContent(marker) {
    return `Aeroport : ${marker.name}`;
  }

let data = []
let index = 1
aeroport.slice(0, 500).map(elm => {
    data.push({id: index, name: elm.name, coordinates:[elm.lat, elm.lon]})
})

function DThree() {
  return (
    <div className="Globe">
      <ReactGlobe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        arcsData={arcsData}
        arcColor={"color"}
        arcStroke={1.2}
        arcDashLength={() => Math.random()}
        arcDashGap={() => Math.random()}
        arcDashAnimateTime={() => 4000}
        onArcClick={(arcProps) => {
          window.open(arcProps.endpoint);
        }}
      />
    </div>
  );
}

export default DThree;
