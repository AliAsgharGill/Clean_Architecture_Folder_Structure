import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// Layout Page
import Layout from "./ui_frameworks/Router/Layout";
// Component and Pages
import Home from "./Interfaces/Pages/Home/Home";
import Campaigns from "./Interfaces/Pages/Campaigns/Campaigns";
import Result from "./Interfaces/Pages/Result/Result";
import NoMatch from "./Interfaces/components/NoMatch/NoMatch";
import Signup from "./Interfaces/components/Signup/Signup";
import Login from "./Interfaces/components/Login/Login";
import CampaignManagement from "./Interfaces/Pages/Admin/campaignManagement/campaignManagement";
import User from "./Interfaces/components/User/User";
import Dashboard from "./Interfaces/Pages/Admin/Dashboard/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index path="/" element={<Home />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/campaignsManagement" element={<CampaignManagement />} />
      <Route path="/result" element={<Result />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route index path="/user" element={<User />} />
      <Route path="*" element={<NoMatch />} />

      {/*Dynamic Routes for user */}
      <Route path="/signup/user" element={<Signup type="user" />} />
      <Route path="/login/user" element={<Login type="user" />} />

      {/*Dynamic Routes for admin */}
      <Route path="/signup/admin" element={<Signup type="admin" />} />
      <Route path="/login/admin" element={<Login type="admin" />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
