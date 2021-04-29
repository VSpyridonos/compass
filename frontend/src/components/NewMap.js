import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
    width: '100%',
    height: '600px'
};

const markerIcons = [
    'http://maps.google.com/mapfiles/ms/icons/yellow.png',
    'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    'http://maps.google.com/mapfiles/ms/icons/blue.png',
    'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    'http://maps.google.com/mapfiles/ms/icons/green.png',
    'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    'http://maps.google.com/mapfiles/ms/icons/orange.png',
    'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
    'http://maps.google.com/mapfiles/ms/icons/pink.png',
    'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
    'http://maps.google.com/mapfiles/ms/icons/purple.png',
    'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
    'http://maps.google.com/mapfiles/ms/icons/red.png',
    'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
]

function NewMap({ users, markers, originalMarkers, olderTours, olderMarkers, allMarkers, allOriginalMarkers }) {
    let randomNumber1 = Math.floor(Math.random() * 14) + 1;
    let randomNumber2 = Math.floor(Math.random() * 14) + 1;
    let randomNumber3 = Math.floor(Math.random() * 14) + 1;
    let randomNumber4 = Math.floor(Math.random() * 14) + 1;

    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: 39.67310608025676, lng: 20.855661058932768 }}
                zoom={18}
                loadingElement={< div style={{ height: `100%` }} />}
                containerElement={< div style={{ height: `600px` }} />}
                mapElement={< div style={{ height: `100%` }} />}
            >
                { /* Child components, such as markers, info windows, etc. */}

                {markers ? markers.map((marker, index) => <Marker
                    key={index}
                    position={marker.props.position}
                    title={marker.props.defaultTitle}
                    animation={'DROP'}
                    icon={markerIcons[randomNumber1]}
                />) : ''}

                {originalMarkers ? originalMarkers.map((originalMarker, index) => <Marker
                    key={index}
                    position={originalMarker.props.position}
                    title={originalMarker.props.defaultTitle}
                    animation={'DROP'}
                    icon={markerIcons[randomNumber2]}
                />) : ''}

                {olderTours ? olderMarkers.map((olderMarker, index) => olderMarker.map((marker, index) => <Marker
                    key={index}
                    position={marker.props.position}
                    title={marker.props.defaultTitle}
                    animation={'DROP'}
                    icon={markerIcons[randomNumber3]}
                />)) : ''}


                {allMarkers.length ?
                    allMarkers.map((markers, index) => markers.map((marker, index) => <Marker
                        key={index}
                        position={marker.props.position}
                        title={marker.props.defaultTitle}
                        animation={'DROP'}
                        icon={markerIcons[randomNumber4]}
                    />)) : ''}

                {allOriginalMarkers.length ? allOriginalMarkers.map((originalMarkers, index) => originalMarkers.map((originalMarker, index) => <Marker
                    key={index}
                    position={originalMarker.props.position}
                    title={originalMarker.props.defaultTitle}
                    animation={'DROP'}
                    icon={markerIcons[randomNumber1]}
                />)) : ''}


                <></>
            </GoogleMap>
        </LoadScript >
    )
}

export default React.memo(NewMap)