import React, { useEffect, useState, useRef } from 'react';
import {
  Room,
  createLocalVideoTrack,
  Participant,
  RemoteParticipant,
  RemoteTrackPublication,
} from 'livekit-client';

export default function LiveKitRoom({ token, roomName }) {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const chatChannelRef = useRef(null);

  useEffect(() => {
    if (!token || !roomName) return;

    const connectRoom = async () => {
      const room = new Room({
        adaptiveStream: true,
        dynacast: true,
      });

      room.on('participantConnected', participant => {
        setParticipants(curr => [...curr, participant]);
        setupDataChannel(participant);
      });

      room.on('participantDisconnected', participant => {
        setParticipants(curr => curr.filter(p => p.sid !== participant.sid));
      });

      room.on('roomDisconnected', () => {
        setParticipants([]);
        setRoom(null);
      });

      room.on('trackPublished', publication => {
        const participant = publication.participant;
        setupDataChannel(participant);
      });

      await room.connect('ws://localhost:7880', token, {
        autoSubscribe: true,
        videoCaptureDefaults: { resolution: 720 },
      });

      // Add local participant to state
      setParticipants([room.localParticipant, ...room.participants.values()]);

      // Publish local video track
      const videoTrack = await createLocalVideoTrack();
      await room.localParticipant.publishTrack(videoTrack);

      // Setup chat data channel for local participant
      setupDataChannel(room.localParticipant);

      setRoom(room);
    };

    const setupDataChannel = participant => {
      // Create or listen for reliable data channels for chat
      let chatChannel = participant.dataChannels.get('chat');
      if (!chatChannel) {
        chatChannel = participant.createDataChannel('chat', { ordered: true, reliable: true });
      }

      chatChannel.onmessage = event => {
        setMessages(prev => [...prev, { from: participant.identity, text: event.data }]);
      };

      if (participant === room?.localParticipant) {
        chatChannelRef.current = chatChannel;
      }
    };

    connectRoom();

    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, [token, roomName]);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    chatChannelRef.current?.send(chatInput.trim());
    setMessages(prev => [...prev, { from: 'You', text: chatInput.trim() }]);
    setChatInput('');
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <div className="flex space-x-4 overflow-x-auto">
        {participants.map(participant => (
          <div key={participant.sid} className="flex flex-col items-center bg-gray-900 rounded p-2">
            <video
              ref={el => {
                if (el && participant.videoTracks?.size) {
                  const track = Array.from(participant.videoTracks.values())[0].track;
                  if (track) {
                    track.attach(el);
                  }
                }
              }}
              autoPlay
              muted={participant.isLocal}
              playsInline
              className="w-48 h-36 rounded"
            />
            <span className="text-white mt-2">{participant.identity}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col flex-grow bg-gray-800 rounded p-4 overflow-y-auto">
        <div className="flex-grow overflow-y-auto mb-2">
          {messages.map((msg, i) => (
            <div key={i} className="text-white mb-1">
              <b>{msg.from}:</b> {msg.text}
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            className="flex-grow rounded px-3 py-2 text-black"
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') sendMessage();
            }}
            placeholder="Type a message"
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
