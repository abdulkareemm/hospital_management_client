
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {AdminLogin, ClinicLogin, DoctorLogin, Home, PatientLogin} from "./pages"
function App() {
  return (
    <div className="flex flex-col h-screen bg-[#e0f0fd]">
      <Toaster position="top-center" reverseOrder={true} />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          {/* Admin Routes */}
          <Route path="/admin/login" exact element={<AdminLogin />} />
          {/* Clinic Routes */}
          <Route path="/clinic/login" exact element={<ClinicLogin />} />
          {/* Doctor Routes */}
          <Route path="/doctor/login" exact element={<DoctorLogin />} />
          {/* Patient Routes */}
          <Route path="/login" exact element={<PatientLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
