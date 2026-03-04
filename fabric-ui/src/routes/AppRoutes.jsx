import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Pipelines from "../pages/Pipelines";
import NewPipeline from "../pages/NewPipeline";
import AzureMigration from "../pages/AzureMigration";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* DEFAULT REDIRECT */}
      <Route path="/" element={<Navigate to="/azure-migration" />} />

      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/azure-migration" element={<AzureMigration />} />

      {/* PROTECTED ROUTES */}
      {user && (
        <Route path="/app" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pipelines" element={<Pipelines />} />
          <Route path="pipelines/new" element={<NewPipeline />} />
        </Route>
      )}

      {/* FALLBACK */}
      <Route
        path="*"
        element={
          user ? <Navigate to="/app" /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
};

export default AppRoutes;



// import { Routes, Route, Navigate } from "react-router-dom";
// import MainLayout from "../layout/MainLayout";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import ForgotPassword from "../pages/ForgotPassword";
// import About from "../pages/About";
// import Dashboard from "../pages/Dashboard";
// import Pipelines from "../pages/Pipelines";
// import NewPipeline from "../pages/NewPipeline";
// import ProtectedRoute from "./ProtectedRoute";

// const AppRoutes = () => {
//   return (
//     <Routes>
      
//       {/* ===== PUBLIC ROUTES ===== */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/about" element={<About />} />

//       {/* ===== PROTECTED ROUTES ===== */}
//       <Route element={<ProtectedRoute />}>
//         <Route path="/" element={<MainLayout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="pipelines" element={<Pipelines />} />
//           <Route path="pipelines/new" element={<NewPipeline />} />
//         </Route>
//       </Route>

//       {/* Default Redirect */}
//       <Route path="*" element={<Navigate to="/login" />} />
      
//     </Routes>
//   );
// };

// export default AppRoutes;