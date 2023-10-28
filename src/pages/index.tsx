import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api'
import { NextSeo } from 'next-seo'
import { useState } from 'react'

import { APP_DESCRIPTION, APP_NAME } from '@/lib/constants'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  const mapOptions = {
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'landscape',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'transit',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }],
      },
    ]
  }

  const containerStyle = {
    width: "80vh",
    height: "80vh",
  };

  const center = {
    lat: 35.69575,
    lng: 139.77521,
  };

  const [clickPosition, setClickPosition] = useState(null);
  const [memos, setMemos] = useState([]);
  const [currentMemo, setCurrentMemo] = useState('');

  const handleMapClick = (e) => {
    setClickPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const handleMemoChange = (e) => {
    setCurrentMemo(e.target.value);
  };

  const saveMemo = () => {
    if (clickPosition && currentMemo) {
      const newMemo = { position: clickPosition, memo: currentMemo };
      setMemos([...memos, newMemo]);
      setCurrentMemo('');
      console.log('保存されたメモ:', newMemo);
    }
  };

  const closeInfoWindow = () => {
    setClickPosition(null);
  };

  return (
    <>
      <NextSeo title={APP_NAME} description={APP_DESCRIPTION} />
      <>
        <LoadScript googleMapsApiKey="AIzaSyBvo0itSweVIrs_PFYE8iqtdUK7qv9JfUs">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={16}
            onClick={handleMapClick}
            options={{
              styles: mapOptions.styles,
            }}
          >
            {memos.map((memo, index) => (
              <Marker
                key={index}
                position={memo.position}
                onClick={() => setClickPosition(memo.position)}
              />
            ))}

            {clickPosition && (
              <InfoWindow
                position={clickPosition}
                onCloseClick={closeInfoWindow}
              >
                <div>
                  <h2>メモを残す</h2>
                  <textarea value={currentMemo} onChange={handleMemoChange} />
                  <button onClick={saveMemo}>メモを保存</button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </>
    </>
  )
}

export default Home
