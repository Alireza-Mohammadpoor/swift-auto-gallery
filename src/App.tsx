// import { Routes, Route } from "react-router-dom";
// import { PublicLayout } from "@/components/layout/PublicLayout";
// import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
// import { AdminLayout } from "@/components/layout/AdminLayout";

// import { Home } from "@/pages/Home/Home";
// import { Vehicles } from "@/pages/Vehicles/Vehicles";
// import { VehicleDetails } from "@/pages/VehicleDetails/VehicleDetails";
// import { VehicleNotFound } from "@/pages/VehicleDetails/VehicleNotFound";
// import { Services } from "@/pages/Services/Services";
// import { About } from "@/pages/About/About";
// import { Contact } from "@/pages/Contact/Contact";
// import { NotFound } from "@/pages/NotFound";

// import { Login } from "@/pages/Admin/Login";
// import { Dashboard } from "@/pages/Admin/Dashboard";
// import { VehicleList } from "@/pages/Admin/VehicleList";
// import { VehicleForm } from "@/pages/Admin/VehicleForm";

// export default function App() {
//   return (
//     <Routes>
//       {/* Public site */}
//       <Route element={<PublicLayout />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/vehicles" element={<Vehicles />} />
//         <Route path="/vehicles/not-found" element={<VehicleNotFound />} />
//         <Route path="/vehicles/:id" element={<VehicleDetails />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="*" element={<NotFound />} />
//       </Route>

//       {/* Admin auth */}
//       <Route path="/admin/login" element={<Login />} />

//       {/* Admin protected */}
//       <Route element={<ProtectedRoute />}>
//         <Route element={<AdminLayout />}>
//           <Route path="/admin" element={<Dashboard />} />
//           <Route path="/admin/vehicles" element={<VehicleList />} />
//           <Route path="/admin/vehicles/new" element={<VehicleForm />} />
//           <Route path="/admin/vehicles/:id/edit" element={<VehicleForm />} />
//         </Route>
//       </Route>
//     </Routes>
//   );
// }




// import { Routes, Route } from "react-router-dom";
// import { PublicLayout } from "@/components/layout/PublicLayout";
// import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
// import { AdminLayout } from "@/components/layout/AdminLayout";

// import { Home } from "@/pages/Home/Home";
// import { Vehicles } from "@/pages/Vehicles/Vehicles";
// import { VehicleDetails } from "@/pages/VehicleDetails/VehicleDetails";
// import { VehicleNotFound } from "@/pages/VehicleDetails/VehicleNotFound";
// import { Services } from "@/pages/Services/Services";
// import { About } from "@/pages/About/About";
// import { Contact } from "@/pages/Contact/Contact";
// import { NotFound } from "@/pages/NotFound";

// import { Login } from "@/pages/Admin/Login";
// import { Dashboard } from "@/pages/Admin/Dashboard";
// import { VehicleList } from "@/pages/Admin/VehicleList";
// import { VehicleForm } from "@/pages/Admin/VehicleForm";

// import LocalBusinessSchema from "@/components/SEO/LocalBusinessSchema";

// export default function App() {
//   return (
//     <>
//       {/* SEO: Swift Auto Gallery structured data */}
//       <LocalBusinessSchema />

//       <Routes>
//         {/* Public site */}
//         <Route element={<PublicLayout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/vehicles" element={<Vehicles />} />
//           <Route
//             path="/vehicles/not-found"
//             element={<VehicleNotFound />}
//           />
//           <Route path="/vehicles/:id" element={<VehicleDetails />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="*" element={<NotFound />} />
//         </Route>

//         {/* Admin auth */}
//         <Route path="/admin/login" element={<Login />} />

//         {/* Admin protected */}
//         <Route element={<ProtectedRoute />}>
//           <Route element={<AdminLayout />}>
//             <Route path="/admin" element={<Dashboard />} />
//             <Route path="/admin/vehicles" element={<VehicleList />} />
//             <Route
//               path="/admin/vehicles/new"
//               element={<VehicleForm />}
//             />
//             <Route
//               path="/admin/vehicles/:id/edit"
//               element={<VehicleForm />}
//             />
//           </Route>
//         </Route>
//       </Routes>
//     </>
//   );
// }









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

import { Blog } from "@/pages/Blog/Blog";
import { BlogArticle } from "@/pages/Blog/BlogArticle";

import { Login } from "@/pages/Admin/Login";
import { Dashboard } from "@/pages/Admin/Dashboard";
import { VehicleList } from "@/pages/Admin/VehicleList";
import { VehicleForm } from "@/pages/Admin/VehicleForm";
import { ArticleList } from "@/pages/Admin/ArticleList";
import { ArticleForm } from "@/pages/Admin/ArticleForm";
import { CategoryManager } from "@/pages/Admin/CategoryManager";

import LocalBusinessSchema from "@/components/SEO/LocalBusinessSchema";

export default function App() {
  return (
    <>
      {/* SEO: Swift Auto Gallery structured data */}
      <LocalBusinessSchema />

      <Routes>
        {/* Public site */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />

          {/* Vehicles */}
          <Route path="/vehicles" element={<Vehicles />} />
          <Route
            path="/vehicles/not-found"
            element={<VehicleNotFound />}
          />
          <Route path="/vehicles/:id" element={<VehicleDetails />} />

          {/* Services */}
          <Route path="/services" element={<Services />} />

          {/* Blog */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/category/:slug" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />

          {/* Company information */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin authentication */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected admin routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            {/* Dashboard */}
            <Route path="/admin" element={<Dashboard />} />

            {/* Vehicle management */}
            <Route path="/admin/vehicles" element={<VehicleList />} />
            <Route
              path="/admin/vehicles/new"
              element={<VehicleForm />}
            />
            <Route
              path="/admin/vehicles/:id/edit"
              element={<VehicleForm />}
            />

            {/* Article management */}
            <Route path="/admin/articles" element={<ArticleList />} />
            <Route
              path="/admin/articles/new"
              element={<ArticleForm />}
            />
            <Route
              path="/admin/articles/:id/edit"
              element={<ArticleForm />}
            />

            {/* Blog category management */}
            <Route
              path="/admin/categories"
              element={<CategoryManager />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
