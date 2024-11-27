import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/app/home/Home"
import DayPhotos from "./pages/app/day_photos/DayPhotos"
import Days from "./pages/app/days/Days"
import { PrivateRoutes, PublicRoutes } from "./routes/routes"
import Login from "./pages/auth/login/Login"
import Register from "./pages/auth/register/Register"

export const APP_NAME = "Carnet de Voyage"

export default function App() {

  return (
    <div className="bg-gray-100">
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoutes />}>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            {/* Protected Routes */}
            <Route element={<PrivateRoutes />}>
              <Route path="/carnet-voyage" element={<Home />} />
              <Route path="/carnet-voyage/:voyageID" element={<Days/>} />
              <Route path="/carnet-voyage/:voyageID/:dayID" element={<DayPhotos/>} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}