
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {AdminLogin, Home} from "./pages"
function App() {
  return (
    <div className="flex flex-col h-screen bg-[#e0f0fd]">
      <Toaster position="top-center" reverseOrder={true} />
      <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home/>}/>
        {/* Admin routes */}
        <Route path="/admin/login" exact element={<AdminLogin/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
