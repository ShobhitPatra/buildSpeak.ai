import { Routes, Route } from "react-router-dom";
import SmoothFollower from "./components/ui/Cursor";
import { Landing } from "./screens/Landing";
import { Chat } from "./screens/Chat";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <SmoothFollower />
    </>
  );
}

export default App;
