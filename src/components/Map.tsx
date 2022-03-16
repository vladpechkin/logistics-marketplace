import { Layout } from "antd"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { useAppSelector } from "../store"
import Leaflet, { LatLngExpression } from 'leaflet'
import Icon from '../res/icon.png'
import { createControlComponent } from "@react-leaflet/core"
import "leaflet-routing-machine"

export const Map = () => {
  const originLat = useAppSelector((state) => state.originLat)
  const originLong = useAppSelector((state) => state.originLong)
  const destinationLat = useAppSelector((state) => state.destinationLat)
  const destinationLong = useAppSelector((state) => state.destinationLong)

  const mapBounds = Leaflet.latLngBounds([[originLat, originLong], [destinationLat, destinationLong]])
  const mapCenter: LatLngExpression = [(originLat + destinationLat) / 2, (originLong + destinationLong) / 2]
  const markerIcon = Leaflet.icon({ iconUrl: Icon, iconSize: [30, 30] })

  const RouterBuilderMachine = () =>
    Leaflet.Routing.control({
      waypoints: [
        Leaflet.latLng(originLat, originLong),
        Leaflet.latLng(destinationLat, destinationLong)
      ],
      lineOptions: {
        styles: [{ color: "#DC2626", weight: 5 }],
        extendToWaypoints: true,
        missingRouteTolerance: 0
      },
      show: false,
      addWaypoints: false,
      routeWhileDragging: true,
      fitSelectedRoutes: true,
      showAlternatives: false
    })

  const RouteBuilder = createControlComponent(RouterBuilderMachine)

  return (
      <MapContainer fitBounds={mapBounds} center={mapCenter} zoom={4}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[originLat, originLong]} icon={markerIcon}>
          <Popup>
            Точка погрузки
          </Popup>
        </Marker>
        <Marker position={[destinationLat, destinationLong]} icon={markerIcon}>
          <Popup>
            Точка разгрузки
          </Popup>
        </Marker>
        <RouteBuilder />
      </MapContainer>
    )
}