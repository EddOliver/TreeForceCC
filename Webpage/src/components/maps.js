import React, { useState } from 'react';
import '../App.css';
import Map from "./Maps/Map";
import { Layers, TileLayer, VectorLayer } from "./Maps/Layers";
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { osm, vector } from "./Maps/Source";
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { Controls, FullScreenControl } from "./Maps/Controls";

function treeMarker(lon, lat, size) {
    const geojsonObject = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "kind": "county",
                    "name": "Wyandotte",
                    "state": "KS"
                },
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            [
                                [
                                    lon - 1.2 * size,
                                    lat + 0.8 * size
                                ],
                                [
                                    lon - 0.4 * size,
                                    lat + 0.4 * size
                                ],
                                [
                                    lon - 0.8 * size,
                                    lat + 1.2 * size
                                ],
                                [
                                    lon + 0 * size,
                                    lat + 2.4 * size
                                ],
                                [
                                    lon + 0.8 * size,
                                    lat + 1.2 * size
                                ],
                                [
                                    lon + 0.4 * size,
                                    lat + 0.4 * size
                                ],
                                [
                                    lon + 1.2 * size,
                                    lat + 0.8 * size
                                ],
                                [
                                    lon + 2.4 * size,
                                    lat + 0 * size
                                ],
                                [
                                    lon + 1.2 * size,
                                    lat - 0.8 * size
                                ],
                                [
                                    lon + 0.4 * size,
                                    lat - 0.4 * size
                                ],
                                [
                                    lon + 0.8 * size,
                                    lat - 1.2 * size
                                ],
                                [
                                    lon + 0 * size,
                                    lat - 2.4 * size
                                ],
                                [
                                    lon - 0.8 * size,
                                    lat - 1.2 * size
                                ],
                                [
                                    lon - 0.4 * size,
                                    lat - 0.4 * size
                                ],
                                [
                                    lon - 1.2 * size,
                                    lat - 0.8 * size
                                ],
                                [
                                    lon - 2.4 * size,
                                    lat + 0 * size
                                ]
                            ]
                        ]
                    ]
                }
            }
        ]
    };
    return geojsonObject
}

class Maps extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(){
        
    }

    render() {
        let i = 0;
        return (
            <Map center={fromLonLat(this.props.coord)} zoom={this.props.zoom}>
                <Layers>
                    <TileLayer
                        source={osm()}
                        zIndex={0}
                    />
                    {
                        this.props.coords.map((number) =>
                            <div key={i}>
                                <VectorLayer
                                    source={vector({ features: new GeoJSON().readFeatures(treeMarker(number[0], number[1], 0.0005), { featureProjection: get('EPSG:3857') }) })}
                                    style={this.props.colors[i++]}
                                />
                            </div>
                        )
                    }
                </Layers>
                <Controls>
                    <FullScreenControl />
                </Controls>
            </Map>
        );
    }
}

export default Maps;