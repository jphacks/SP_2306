import { Button } from '@chakra-ui/react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api'
import { NextSeo } from 'next-seo'
import React, { useState, useEffect } from 'react'

import { APP_DESCRIPTION, APP_NAME } from '@/lib/constants'
import Circle from 'src/pages/Circle';

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

  type Position = {
    lat: number;
    lng: number;
  }

  type Memo = {
    position: Position;
    content: string;
  }

  const containerStyle = {
    width: "80vh",
    height: "80vh",
  };

  const center = {
    lat: 35.69575,
    lng: 139.77521,
  };

  const [clickedPosition, setClickedPosition] = useState<Position | null>(null);
  const [memos, setMemos] = useState<Memo[]>([]);
  const [currentMemo, setCurrentMemo] = useState('');
  const [clickedMarker, setClickedMarker] = useState<Position | null>(null);

  const handleMapClick = (e: any) => {
    const newPosition: Position = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setClickedPosition(newPosition);
  };

  const handleMemoChange = (e: any) => {
    setCurrentMemo(e.target.value);
  };

  const saveMemo = () => {
    if (clickedPosition && currentMemo) {
      const newMemo: Memo = {
        position: clickedPosition,
        content: currentMemo,
      }
      setMemos([...memos, newMemo]);
      setCurrentMemo('')
      closeInfoWindow()
      console.log('保存されたメモ:', newMemo);
    }
  };

  const closeInfoWindow = () => {
    setClickedPosition(null);
  };

  const [deg, setDeg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDeg(prev => prev + 30);
    }, 100);
    
return () => clearInterval(interval);
  }, []);

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
                onClick={() => {
                  setClickedMarker(memo.position)
                  setCurrentMemo(memo.content)
                }}
              />
            ))}

            {clickedPosition && (
              <InfoWindow
                position={clickedPosition}
                onCloseClick={closeInfoWindow}
              >
                <div>
                  <h2>メモを残す</h2>
                  <textarea value={currentMemo} onChange={handleMemoChange} />
                  <button onClick={saveMemo}>メモを保存</button>
                </div>
              </InfoWindow>
            )}

            {clickedMarker && (
              <InfoWindow
                position={clickedMarker}
                onCloseClick={() => setClickedMarker(null)}
              >
                <div>
                  <h2>メモ</h2>
                  <p>
                    {currentMemo}
                  </p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
          <div style={{ position: 'relative' }}>

            <Circle deg={deg} />

            <Button
              zIndex="overlay"
              position="relative"
              top="-70px"
              left="30px"
              borderRadius="50%"
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url('botton_plas.svg')`,
                backgroundSize: 'cover',
                border: 'none',
                boxShadow: 'none'
              }}
            >
            </Button>
          </div>


        </div >
      </>

    </>

  )
}

export default Home
