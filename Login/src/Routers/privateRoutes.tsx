import Dashboard from "../Pages/Admins/Dashboard";
import Home from "../Pages/Clients/Home";

export const privateRoutes = [{
    path: '/admin',
    element: <Dashboard />
},
{
    path: '/user',
    element: <Home />
}]