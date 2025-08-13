import React, { useEffect, useRef, useState } from 'react';
import { Room, RoomEvent, Track, createLocalVideoTrack } from 'livekit-client';

export default function LiveKit({ sessionId = 1 }) {
  const [error, setError] = useState(null);
  const [started, setStarted] = useState(false);
  const videoContainer = useRef(null);

  // Use plain WS on port 7880 (no TLS) so signaling can connect
  const WS_URL = 'ws://livekit.moshaveritoo.ir:7880';

  // Fetch a token from your backend
  async function fetchToken() {
    const resp = await fetch(
      `https://api.moshaveritoo.ir/api/sessions/test/${sessionId}/create_room/`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' } },
    );
    if (!resp.ok) throw new Error(`Token fetch failed with ${resp.status}`);
    const { client_token } = await resp.json();
    return client_token;
  }

  useEffect(() => {
    if (!started) return;
    let room;
    (async () => {
      try {
        const token = await fetchToken();
        room = new Room();
        await room.connect(WS_URL, token, {
          autoSubscribe: true,
          // optional: explicit STUN server
          rtcConfig: {
            iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }],
          },
        });

        room.on(RoomEvent.SignalConnected, () => {
          console.log('ICE servers:', room.engine.rtcConfig.iceServers);
        });

        room.on(RoomEvent.TrackSubscribed, (track) => {
          if (track.kind === Track.Kind.Video) {
            const el = track.attach();
            el.style.maxWidth = '300px';
            videoContainer.current.appendChild(el);
          }
        });

        const localTrack = await createLocalVideoTrack();
        await room.localParticipant.publishTrack(localTrack);
        const myEl = localTrack.attach();
        myEl.style.maxWidth = '300px';
        videoContainer.current.appendChild(myEl);
      } catch (err) {
        console.error('Join error:', err);
        setError(err.message || String(err));
        room?.disconnect();
      }
    })();
    return () => { room?.disconnect(); };
  }, [sessionId, started]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">LiveKit Video Test</h1>
      {!started ? (
        <button
          onClick={() => setStarted(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Start Session
        </button>
      ) : (
        <>
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <div ref={videoContainer} className="flex flex-wrap gap-2" />
        </>
      )}
    </div>
  );
}
