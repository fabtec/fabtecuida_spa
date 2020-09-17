import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "./MapLayout.css";

function MapLayout(props) {
    return (
        <Map center={props.center} zoom={props.zoom}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {props.entitiesList.map(entity => (
            <Marker
                key={entity.id}
                position={[
                entity.location.coordinates[1], 
                entity.location.coordinates[0]]
                }
                >
                <Popup>{entity.name}</Popup>
                </Marker>
            ))}
        </Map>
    )
}

export default MapLayout;