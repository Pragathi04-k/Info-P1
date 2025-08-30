import React, { useState, useRef } from "react";

function CollabRoom() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [image, setImage] = useState(null);
  const [roomLink, setRoomLink] = useState("");
  const [joinLink, setJoinLink] = useState("");
  const [inCall, setInCall] = useState(false);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);

  // ✅ Start Video + Audio
  const startCall = async () => {
    try {
      peerConnection.current = new RTCPeerConnection();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      stream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, stream);
      });

      peerConnection.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      setInCall(true);
    } catch (err) {
      alert("Camera/Microphone access denied.");
      console.error(err);
    }
  };

  // ✅ Handle Chat Send
  const sendMessage = () => {
    if (!newMsg.trim()) return;
    setMessages((prev) => [...prev, { text: newMsg, type: "sent" }]);
    setNewMsg("");
  };

  // ✅ Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  // ✅ Create Room Link
  const handleCreateLink = () => {
    const link = `${window.location.origin}/collabroom/${Math.random()
      .toString(36)
      .substring(2, 8)}`;
    setRoomLink(link);
    startCall();
    alert(`Room created! Share this link: ${link}`);
  };

  // ✅ Join Room
  const handleJoinLink = () => {
    if (!joinLink.trim()) {
      alert("Please enter a valid room link");
      return;
    }
    startCall();
    alert(`Joining room: ${joinLink}`);
    // 👉 Future: Connect to signaling server here
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        height: "100vh",
        width: "100vw",
        gap: "20px",
        background: "#f4f6f9",
        margin: 0,
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* ✅ Video Call Section */}
      <div
        style={{
          background: "#000", // dark background like Meet
          padding: "0",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <h3 style={{ margin: "10px", color: "#fff" }}>Video Call</h3>

        {inCall ? (
          <div style={{ flex: 1, position: "relative" }}>
            {/* Remote video fills the section */}
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />

            {/* Local preview like Meet (small, bottom-right) */}
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              style={{
                position: "absolute",
                bottom: "15px",
                right: "15px",
                width: "180px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "10px",
                border: "2px solid #fff",
                background: "#000",
              }}
            />
          </div>
        ) : (
          <p style={{ color: "#aaa", margin: "auto" }}>
            🎥 Start or join a room to enable camera & mic
          </p>
        )}

        {/* Room Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "15px",
            background: "#111",
          }}
        >
          <button className="btn btn-success" onClick={handleCreateLink}>
            <i className="bi bi-link-45deg me-1"></i> Create Link
          </button>

          <input
            type="text"
            placeholder="Enter room link..."
            className="form-control"
            value={joinLink}
            onChange={(e) => setJoinLink(e.target.value)}
            style={{ maxWidth: "300px", flex: "1" }}
          />
          <button className="btn btn-primary" onClick={handleJoinLink}>
            Join
          </button>
        </div>

        {roomLink && (
          <p
            style={{
              marginTop: "10px",
              fontSize: "14px",
              color: "#ccc",
              wordBreak: "break-all",
              padding: "0 15px 15px",
            }}
          >
            🔗 Your Room Link: <strong>{roomLink}</strong>
          </p>
        )}
      </div>

      {/* ✅ Chat + Image Sharing (unchanged) */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>Team Chat</h3>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            border: "1px solid #ddd",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "12px",
            background: "#f9f9f9",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                textAlign: msg.type === "sent" ? "right" : "left",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: "14px",
                  background: msg.type === "sent" ? "#007bff" : "#e9ecef",
                  color: msg.type === "sent" ? "#fff" : "#000",
                  margin: "4px 0",
                  maxWidth: "75%",
                  wordWrap: "break-word",
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}
          {image && (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <img
                src={image}
                alt="shared"
                width="150"
                style={{ borderRadius: "8px" }}
              />
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="d-flex gap-2">
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            className="form-control"
            placeholder="Type a message..."
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
          <label className="btn btn-outline-secondary mb-0">
            <i className="bi bi-image"></i>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
          </label>
        </div>
      </div>

      {/* ✅ Responsive Fix for Mobile */}
      <style>
        {`
          @media (max-width: 992px) {
            div[style*="grid-template-columns"] {
              grid-template-columns: 1fr;
              height: auto;
            }
          }
        `}
      </style>
    </div>
  );
}

export default CollabRoom;
