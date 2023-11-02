import { Button } from '@chakra-ui/react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api'
import { NextSeo } from 'next-seo'
import { Zen_Maru_Gothic } from 'next/font/google'
import React, { useState, useEffect } from 'react'

import { APP_DESCRIPTION, APP_NAME } from '@/lib/constants'
import Circle from 'src/pages/Circle';

import type { NextPage } from 'next'

const Zenmaru = Zen_Maru_Gothic({
  weight: '400',
  display: 'swap',
  preload: false
})

const Home: NextPage = () => {
  const mapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
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


  const infoWindowStyle = {
    width: '140px',
    height: '140px',
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
    width: "100vw",
    height: "100vh",
  };

  // eslint-disable-next-line no-unused-vars
  const [center, setCenter] = useState({ lat: 43.068564, lng: 141.3507138 })
  const [clickedPosition, setClickedPosition] = useState<Position | null>(null);
  const [memos, setMemos] = useState<Memo[]>([]);
  const [currentMemo, setCurrentMemo] = useState('');
  const [clickedMarker, setClickedMarker] = useState<Position | null>(null);
  const [canClick, setCanClick] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectAudio, setSelectAudio] = useState(false)
  const [leaveMemo, setLeaveMemo] = useState(false)

  const handleMapClick = (e: any) => {
    const newPosition: Position = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    // ピン指したとこを真ん中にするときはこれ
    // setCenter(newPosition)
    setClickedPosition(newPosition);
    setSelectAudio(true);
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
      setLeaveMemo(false)
      setCanClick(false)
      setCurrentMemo('')
      closeInfoWindow()
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
        <LoadScript googleMapsApiKey="API_KEY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={16}
            onClick={handleMapClick}
            options={{
              styles: mapOptions.styles,
            }}
          >
            <img src="logo.png" alt="" style={{ position: 'absolute', top: 20, right: -60, width: '300px', backgroundColor: '#FFF5DC', transform: 'translateX(-50%)', }} />

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
              canClick && (
                <InfoWindow
                  position={clickedPosition}
                  onCloseClick={closeInfoWindow}
                >
                  <ul>
                    <li style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => { setCanClick(false), setLeaveMemo(true), setCurrentMemo('') }} >
                      <img src="kita.jpg" alt="" style={{ width: '100px', marginRight: '10px' }} />
                      <p>北の国から/さだまさし</p>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <img src="kiseki.jpg" alt="" style={{ width: '100px', marginRight: '10px' }} />
                      <p>キセキ/Greeeen</p>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <img src="beatles.jpg" alt="" style={{ width: '100px', marginRight: '10px' }} />
                      <p>all you need is love/Beatles</p>
                    </li>
                  </ul>
                </InfoWindow>
              )
            )}

            {leaveMemo && (
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
                <div style={infoWindowStyle}>
                  <p>北の国から/さだまさし</p>
                  <img
                    src="kita.jpg"
                    width="100px"
                    height="100px"
                  />
                  <h2>{currentMemo}</h2>
                </div>
              </InfoWindow>
            )}

            {canClick && (
              <div style={{ position: 'absolute', top: 40, left: '50%', width: '400px', height: '60px', backgroundColor: '#FFF5DC', transform: 'translateX(-50%)', textAlign: 'center', lineHeight: '54px', borderRadius: '5%', border: '2px solid #582E0B' }} className={Zenmaru.className} >
                曲を追加する場所をクリックしてください
              </div>
            )}
          </GoogleMap>
        </LoadScript>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
          <div style={{ position: 'absolute', bottom: 40, right: 100 }}>

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
              onClick={() => {
                setCanClick(true)
                setClickedPosition(null)
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
