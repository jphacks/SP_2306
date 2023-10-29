import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api'
import { NextSeo } from 'next-seo'
import { useState } from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import { FiArrowLeft } from 'react-icons/fi'
import routes from '@/lib/routes'

import { APP_DESCRIPTION, APP_NAME } from '@/lib/constants'

import type { NextPage } from 'next'

//SpotifyのAPI設定
import SpotifyWebApi from 'spotify-web-api-node';
import { log } from 'console'

const Home: NextPage = () => {

  // Spotify APIのクライアントを初期化
  const spotifyApi = new SpotifyWebApi({
    clientId: 'ee6c5cd93db0433695f1546029f10c15',
    // 以下に必要な認証情報を設定してください
    clientSecret: '5f17778233de4969a2e8c6cd2593db96',
    redirectUri: 'http://localhost:3000/',
  });

  // アクセストークンを取得
spotifyApi.clientCredentialsGrant()
.then(data => {
  spotifyApi.setAccessToken(data.body.access_token);

  // 曲を検索
  const searchKeyword = 'Your Search Query';

  spotifyApi.searchTracks(searchKeyword)
    .then(data => {
      if (data.body && data.body.tracks && data.body.tracks.items) {
        const tracks = data.body.tracks.items;

        if (tracks.length > 0) {
          console.log('検索結果:');
          tracks.forEach((track, index) => {
            console.log(`${index + 1}. ${track.name} by ${track.artists[0].name}`);
          });
        } else {
          console.log('検索結果がありません。');
        }
      } else {
        console.log('検索結果がありません。');
      }
    })
    .catch(error => {
      console.error('曲の検索エラー:', error);
    });
})
.catch(error => {
  console.error('アクセストークンの取得エラー:', error);
});

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
      console.log('保存メモ:', newMemo);
    }
  };

  const closeInfoWindow = () => {
    setClickedPosition(null);
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
      </>
    </>
  )
}

export default Home
