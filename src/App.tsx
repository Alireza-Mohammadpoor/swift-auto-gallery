import { Routes, Route } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { AdminLayout } from "@/components/layout/AdminLayout";

import { Home } from "@/pages/Home/Home";
import { Vehicles } from "@/pages/Vehicles/Vehicles";
import { VehicleDetails } from "@/pages/VehicleDetails/VehicleDetails";
import { VehicleNotFound } from "@/pages/VehicleDetails/VehicleNotFound";
import { Services } from "@/pages/Services/Services";
import { About } from "@/pages/About/About";
import { Contact } from "@/pages/Contact/Contact";
import { NotFound } from "@/pages/NotFound";

import { Login } from "@/pages/Admin/Login";
import { Dashboard } from "@/pages/Admin/Dashboard";
import { VehicleList } from "@/pages/Admin/VehicleList";
import { VehicleForm } from "@/pages/Admin/VehicleForm";

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicles/not-found" element={<VehicleNotFound />} />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin auth */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/vehicles" element={<VehicleList />} />
          <Route path="/admin/vehicles/new" element={<VehicleForm />} />
          <Route path="/admin/vehicles/:id/edit" element={<VehicleForm />} />
        </Route>
      </Route>
    </Routes>
  );
}
