import React from "react";
import { MdLocalParking, MdDirectionsBike } from "react-icons/md";
import {
  FaPizzaSlice,
  FaToilet,
  FaCarSide
} from "react-icons/fa";

const CardFeatures = ({ festival, features }) => {
  return (
    <>
      {features.map((f, i) => {
        if (festival.features && festival.features.hasOwnProperty(f)) {
          let featureIcon;
          switch (f) {
            case "Bike Racks":
              featureIcon = (
                <span
                  className="ml-2 bg-dark text-white rounded-circle d-flex justify-content-center align-items-center align-content-center p-2"
                  data-tip="Bike Racks Available"
                  key={i}
                >
                  <MdDirectionsBike />
                </span>
              );
              break;
            case "Free Parking":
              featureIcon = (
                <span
                  className="ml-2 text-white bg-dark rounded-circle d-flex justify-content-center align-items-center align-content-center p-2"
                  data-tip="Free Parking Available"
                  key={i}
                >
                  <FaCarSide />
                </span>
              );
              break;
            case "Public Washrooms":
              featureIcon = (
                <span
                  className="ml-2 text-white bg-dark rounded-circle d-flex justify-content-center align-items-center align-content-center p-2"
                  data-tip="Public Washrooms Available"
                  key={i}
                >
                  <FaToilet />
                </span>
              );
              break;
            case "Onsite Food and Beverages":
              featureIcon = (
                <span
                  className="ml-2 text-white bg-dark rounded-circle d-flex justify-content-center align-items-center align-content-center p-2"
                  data-tip="Onsite Food and Beverages Available"
                  key={i}
                >
                  <FaPizzaSlice />
                </span>
              );
              break;
            case "Paid Parking":
              featureIcon = (
                <span
                  className="ml-2 text-white bg-dark rounded-circle d-flex justify-content-center align-items-center align-content-center p-2"
                  data-tip="Paid Parking Available"
                  key={i}
                >
                  <MdLocalParking />
                </span>
              );
              break;
            default:
              break;
          }
          return featureIcon;
        }
        return null;
      })}
    </>
  );
};

export default CardFeatures;
