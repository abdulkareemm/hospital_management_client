
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import {Nav} from "./components"
function App() {
  return (
    <div className="flex flex-col h-screen bg-[#e0f0fd]">
      <Toaster position="top-center" reverseOrder={true} />
      <BrowserRouter>
      <Nav/>
      Test
      </BrowserRouter>
    </div>
  );
}

export default App;
