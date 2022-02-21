import { useEffect } from "react";
import Snap from "snapsvg-cjs";
import "leaflet.bezier";
import L from "leaflet";
import avion from "../../assets/avion.png";

export default function LeafletBezier({map}) {

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
      fullAnimatedTime: 7000,
      easeOutPiece: 4,
      easeOutTime: 2500
    };

    L.bezier(
      {
        path: [
          [
            { lat: 7.8731, lng: 80.7718, slide: "RIGHT_ROUND" }, //Sri Lanka
            { lat: -25.2744, lng: 133.7751, slide: "LEFT_ROUND" }, //Australia
            { lat: 36.2048, lng: 138.2529 } //Japan
          ],
          [
            { lat: 7.8731, lng: 80.7718, slide: "RIGHT_ROUND" }, //Sri Lanka
            { lat: 3.139, lng: 101.6869 }
          ],
          [
            { lat: 7.8731, lng: 80.7718, slide: "RIGHT_ROUND", deep: "8" }, //Sri Lanka
            { lat: 41.8719, lng: 12.5674 }
          ],
          [
            { lat: -25.2744, lng: 133.7751 }, //Australia
            { lat: -40.9006, lng: 174.886 } //Japan
          ],
          [
            { lat: 7.8731, lng: 80.7718, slide: "RIGHT_ROUND" },
            { lat: -18.7669, lng: 46.8691 }
          ]
        ],
        icon: {
          path: avion
        }
      },
      dash_straight
    ).addTo(map);
  }, []);

  return null;
}
