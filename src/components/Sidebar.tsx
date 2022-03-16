import { Layout, Typography, Select, Menu } from "antd"
import { useState } from "react"
import { selectOffer, useAppDispatch, useAppSelector } from "../store"
import cities from '../cities.json'
import offers from '../offers.json'

export const Sidebar = () => {
  const selectedOfferId = useAppSelector((state) => state.selectedOfferId)
  const dispatch = useAppDispatch()
  const [originCityName, setOriginCityName] = useState<string>('')
  const [destinationCityName, setDestinationCityName] = useState<string>('')
  const getCity = (id: number) => cities.find(city => city.id === id)
  const filterOffersByCityName = offers.filter(offer => 
    (getCity(offer.originId)?.name.includes(originCityName) && getCity(offer.destinationId)?.name.includes(destinationCityName)))

  return (
    <Layout.Sider>
      <div>
        <label>
          <Typography.Text style={{ marginBottom: '.5rem' }}>Точка погрузки</Typography.Text>
          <Select value={originCityName} onChange={(value) => setOriginCityName(value)}>
            <Select.Option value="" selected>Любой город</Select.Option>
            {cities.map(city => <Select.Option key={city.id} value={city.name}>{city.name}</Select.Option>)}
          </Select>
        </label>
        <label>
          <Typography.Text style={{ marginBottom: '.5rem' }}>Точка разгрузки</Typography.Text>
          <Select value={destinationCityName} onChange={(value) => setDestinationCityName(value)}>
            <Select.Option value="" selected>Любой город</Select.Option>
            {cities.map(city => <Select.Option key={city.id} value={city.name}>{city.name}</Select.Option>)}
          </Select>
        </label>
      </div>
      <Menu>
        {filterOffersByCityName.length > 0 ? filterOffersByCityName.map(offer => (
          <Menu.Item key={offer.id} onClick={() => dispatch(selectOffer(offer))} className={(offer.id === selectedOfferId) ? 'ant-menu-item-selected' : ''}>
            <Typography.Text>{offer.text}</Typography.Text>
            <Typography.Text type="secondary">{getCity(offer.originId)?.name} &#8594; {getCity(offer.destinationId)?.name}</Typography.Text>
          </Menu.Item>)) : <Typography.Text style={{ margin: '1rem' }}>Грузы {originCityName} &#8594; {destinationCityName} не найдены</Typography.Text>}
      </Menu>
    </Layout.Sider>
  )
}
