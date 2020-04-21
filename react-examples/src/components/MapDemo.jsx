import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'
import React from 'react'
import PropTypes from 'prop-types'

const mapStyles = [{
  'featureType': 'administrative',
  'elementType': 'all',
  'stylers': [{'saturation': '-100'}]
}, {
  'featureType': 'administrative.province',
  'elementType': 'all',
  'stylers': [{'visibility': 'off'}]
}, {
  'featureType': 'landscape',
  'elementType': 'all',
  'stylers': [{'saturation': -100}, {'lightness': 65}, {'visibility': 'on'}]
}, {
  'featureType': 'poi',
  'elementType': 'all',
  'stylers': [{'saturation': -100}, {'lightness': '50'}, {'visibility': 'simplified'}]
}, {'featureType': 'road', 'elementType': 'all', 'stylers': [{'saturation': '-100'}]}, {
  'featureType': 'road.highway',
  'elementType': 'all',
  'stylers': [{'visibility': 'simplified'}]
}, {
  'featureType': 'road.arterial',
  'elementType': 'all',
  'stylers': [{'lightness': '30'}]
}, {'featureType': 'road.local', 'elementType': 'all', 'stylers': [{'lightness': '40'}]}, {
  'featureType': 'transit',
  'elementType': 'all',
  'stylers': [{'saturation': -100}, {'visibility': 'simplified'}]
}, {
  'featureType': 'water',
  'elementType': 'geometry',
  'stylers': [{'hue': '#ffff00'}, {'lightness': -25}, {'saturation': -97}]
}, {'featureType': 'water', 'elementType': 'labels', 'stylers': [{'lightness': -25}, {'saturation': -100}]}]

const markerIcon = {
  path: 'M11 2c-3.9 0-7 3.1-7 7 0 5.3 7 13 7 13 0 0 7-7.7 7-13 0-3.9-3.1-7-7-7Zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5 0-1.4 1.1-2.5 2.5-2.5 1.4 0 2.5 1.1 2.5 2.5 0 1.4-1.1 2.5-2.5 2.5Z',
  scale: 1.6363636363636363636363636364,
  fillOpacity: 1,
  fillColor: '#232121',
  strokeOpacity: 0
}

const ValidLocationMapDemo = withScriptjs(withGoogleMap(({pointOfInterest}) => {
  return <GoogleMap
    defaultZoom={12}
    center={{lat: pointOfInterest.latitude, lng: pointOfInterest.longitude}}
    defaultOptions={{styles: mapStyles}}
  >
    {<Marker position={{lat: pointOfInterest.latitude, lng: pointOfInterest.longitude}} icon={markerIcon} />}
  </GoogleMap>
}))

ValidLocationMapDemo.propTypes = {
  pointOfInterest: PropTypes.object.isRequired
}

const MapDemo = (props) => {
  const {pointOfInterest} = props
  if (pointOfInterest.latitude && pointOfInterest.latitude !== 0 && pointOfInterest.longitude && pointOfInterest.longitude !== 0) {
    return <ValidLocationMapDemo {... props} />
  }
  return null
}

MapDemo.propTypes = {
  pointOfInterest: PropTypes.object.isRequired,
  googleMapURL: PropTypes.string.isRequired,
  loadingElement: PropTypes.object.isRequired,
  containerElement: PropTypes.object.isRequired,
  mapElement: PropTypes.object.isRequired
}

export default MapDemo
