import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AddClinic,
  AddDoctor,
  AdminDashboard,
  AdminLogin,
  ClinicAppointments,
  ClinicDashboard,
  ClinicLogin,
  Daignosis,
  DoctorDashboard,
  DoctorLogin,
  Home,
  MakeAppointment,
  PatientLogin,
  PatientRegister,
  UpdateClinic,
  UpdateDoctor,
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
          <Route
            path="/clinic/today-appointments"
            exact
            element={
              <ClinicProtect>
                <ClinicAppointments />
              </ClinicProtect>
            }
          />

          {/* Doctor Routes */}
          <Route path="/doctor/login" exact element={<DoctorLogin />} />
          <Route path="/doctor/dashboard" exact element={<DoctorDashboard />} />
          <Route path="/doctor/update-info" exact element={<UpdateDoctor />} />
          <Route
            path="/doctor/patient-daignosis/:patientId"
            exact
            element={<Daignosis />}
          />

          {/* Patient Routes */}
          <Route path="/login" exact element={<PatientLogin />} />
          <Route path="/register" exact element={<PatientRegister />} />
          <Route
            path="/patient/make-appointment/:clinicId"
            exact
            element={<MakeAppointment />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
