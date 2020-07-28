import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    PermissionsAndroid,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    TextInput,
    StyleSheet
} from 'react-native';

import { Svg, Path, Polygon } from 'react-native-svg';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { getDoctor, getNearby } from '../api.js';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.09;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MAP_STYLE = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
];

const NearbyOption = ({ info, onGoTo, onPress }) => {
    return (
        <View
            style={{
                height: 70,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 5,
                paddingRight: 10,
                marginHorizontal: 10,
            }}
            onPress={() => {
            }}
        >
            <TouchableOpacity
                style={{
                    alignItems: 'center',
                    flexDirection: 'row'
                }}
                onPress={() => onPress(info)}
            >
                <Svg viewBox='0 0 24 24' style={{ height: 60, width: 60, marginRight: 5 }}>
                    <Path fill='#08d9d6' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z' />
                </Svg>
                <View>
                    <Text style={{ color: '#252a34', fontSize: 17, fontWeight: 'bold' }}>
                        { info.name }
                    </Text>
                    <Text style={{ color: '#252a34', fontSize: 13 }}>{ info.practice }</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => onGoTo && onGoTo() }>
                <Svg viewBox='0 0 24 24' style={{ height: 30, width: 30 }}>
                    <Path fill='#08d9d6' d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
                </Svg>
            </TouchableOpacity>
        </View>
    );
};

const Map = ({ route }) => {
    const [ region, setRegion ] = useState(null);
    const [ doctors, setDoctors ] = useState([]);

    useEffect(() => {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Geolocation Permission",
                message: "Fortem needs this to find nearby health professionals",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "Ok"
            }
        ).then((granted) => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(async (info) => {
                    setRegion(new AnimatedRegion({
                        latitude: info.coords.latitude,
                        longitude: info.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }));

                    const fetch = async () => {
                        let nearby = await getNearby(info.coords.latitude, info.coords.longitude);
                        setDoctors(await Promise.all(nearby.map(async (id) => {
                            return await getDoctor(id);
                        })));
                    }
                    fetch();
                }, (err) => {
                    console.warn(err);
                });
            }
        }).catch((err) => {
            console.warn(err);
        });
    }, []);

    return (
        <View contentContainerStyle={{ height: '100%' }}>
            <MapView.Animated
                ref={ (ref) => { this.map = ref } }
                style={{ height: '100%'}}
                region={ region }
                onRegionChange={(newRegion) => region.setValue(newRegion)}
                customMapStyle={ MAP_STYLE }
            >
                { doctors.map((info) =>
                    <Marker
                        key={ info.id }
                        coordinate={{ latitude: info.latitude, longitude: info.longitude }}
                    >
                        <View style={{ alignItems: 'center', elevation: 8 }}>
                            <View style={{ backgroundColor: '#08d9d6', borderRadius: 8 }}>
                                <Text style={{ color: '#ffffff', marginVertical: 4, marginHorizontal: 6 }}>{ info.name }</Text>
                            </View>
                            <Svg viewBox='0 0 24 12' style={{ height: 6, width: 12 }}>
                                <Polygon fill='#08d9d6' points='0,-1 24,-1, 12,12' />
                            </Svg>
                        </View>
                    </Marker>
                ) }
            </MapView.Animated>
            <View
                style={{
                    width: '100%',
                    height: 75,
                    position: 'absolute',
                    top: 0,
                    padding: 14
                }}
            >
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 20,
                        backgroundColor: '#ffffff',
                        elevation: 6,
                        padding: 10,
                        justifyContent: 'center'
                    }}
                >
                    <View style={ styles.formTextContainer }>
                        <TextInput
                            style={ styles.formText }
                            placeholder='Search'
                        />
                        <Svg viewBox='0 0 24 24' style={{ height: 26, width: 26 }}>
                            <Path fill='#08d9d6' d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
                        </Svg>
                    </View>
                </View>
            </View>
            <View
                style={{
                    width: '100%',
                    height: '30%',
                    position: 'absolute',
                    bottom: 20,
                    padding: 14
                }}
            >
                <ScrollView
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 20,
                        backgroundColor: '#ffffff',
                        elevation: 6
                    }}
                >
                    { doctors.map((info) =>
                        <NearbyOption
                            key={ info.id }
                            info={ info }
                            onGoTo={() => {
                                this.map.animateToRegion({
                                    latitude: info.latitude,
                                    longitude: info.longitude,
                                    latitudeDelta: LATITUDE_DELTA * 0.2,
                                    longitudeDelta: LONGITUDE_DELTA * 0.2,
                                }, 500);
                            }}
                            onPress={(info) => route.params.open(info)}
                        />
                    ) }
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formTitle: {
        color: '#252a34',
        marginLeft: 5,
        fontSize: 13,
        fontWeight: 'bold'
    },
    formTextContainer: {
        borderColor: '#252a3440',
        marginHorizontal: 5,
        alignItems: 'center',
        flexDirection: 'row'
    },
    formText: {
        flexGrow: 1,
        paddingVertical: 0,
        fontSize: 16
    }
});

export default Map;
