import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth";
import _404 from "./pages/404";
import Notification from "./components/Notification";
import { useState } from "react";
import { UserDetailsContext, CurrentActionContext } from "./Contexts";

function App() {
  const [isUDOpen, setIUDOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("home");

  return (
    <>
      <Notification>
        <UserDetailsContext.Provider value={{ isUDOpen, setIUDOpen }}>
          <CurrentActionContext.Provider
            value={{ currentAction, setCurrentAction }}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/chat" element={<Chat />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={<Welcome />} />
                <Route path="*" element={<_404 />} />
              </Routes>
            </BrowserRouter>
          </CurrentActionContext.Provider>
        </UserDetailsContext.Provider>
      </Notification>
    </>
  );
}

export default App;
