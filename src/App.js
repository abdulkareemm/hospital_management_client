import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AddClinic,
  AddDoctor,
  AdminDashboard,
  AdminLogin,
  ClinicDashboard,
  ClinicLogin,
  DoctorLogin,
  Home,
  PatientLogin,
  PatientRegister,
  UpdateClinic,
} from "./pages";
import { Admin, ClinicProtect } from "./components";
function App() {
  return (
    <div className="flex flex-col h-screen bg-[#e0f0fd]">
      <Toaster position="top-center" reverseOrder={true} />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          {/* Admin Routes */}
          <Route path="/admin/login" exact element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            exact
            element={
              <Admin>
                <AdminDashboard />
              </Admin>
            }
          />
          <Route
            path="/admin/add-clinic"
            exact
            element={
              <Admin>
                <AddClinic />
              </Admin>
            }
          />

          {/* Clinic Routes */}
          <Route path="/clinic/login" exact element={<ClinicLogin />} />
          <Route
            path="/clinic/dashboard"
            exact
            element={
              <ClinicProtect>
                <ClinicDashboard />
              </ClinicProtect>
            }
          />
          <Route
            path="/clinic/update-info"
            exact
            element={
              <ClinicProtect>
                <UpdateClinic />
              </ClinicProtect>
            }
          />
          <Route
            path="/clinic/add-doctor"
            exact
            element={
              <ClinicProtect>
                <AddDoctor />
              </ClinicProtect>
            }
          />

          {/* Doctor Routes */}
          <Route path="/doctor/login" exact element={<DoctorLogin />} />
          {/* Patient Routes */}
          <Route path="/login" exact element={<PatientLogin />} />
          <Route path="/register" exact element={<PatientRegister />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
