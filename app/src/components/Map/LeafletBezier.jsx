import { useEffect } from "react";
import Snap from "snapsvg-cjs";
import "leaflet.bezier";
import L from "leaflet";
import avion from "../../assets/avionblack.png";

export default function LeafletBezier({map, paths}) {

  useEffect(() => {
    const dash_straight = {
      color: "rgb(145, 146, 150)",
      fillColor: "rgb(145, 146, 150)",
      dashArray: 8,
      opacity: 0.8,
      weight: "1",
      iconTravelLength: 1,
      iconMaxWidth: 50,
      iconMaxHeight: 50,
      fullAnimatedTime: 10000,
      easeOutPiece: 5,
      easeOutTime: 5000
    };

    L.bezier(
      {
        path: paths,
        icon: {
          path: avion
        }
      },
      dash_straight
    ).addTo(map);
  }, [paths]);

  return null;
}
