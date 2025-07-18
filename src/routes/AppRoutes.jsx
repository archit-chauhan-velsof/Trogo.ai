import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import DashBoard from "../main/Index";
import AiGroupRules from "../pages/ai-rule-group/Index";
import AiRule from "../pages/ai-rule/Index";


const Catalog = lazy(()=>import('../pages/catalog/Index'));
const Products = lazy(()=>import('../pages/products/Index'));
const Users = lazy(()=>import('../pages/users/Index'));
const Activities = lazy(()=>import('../pages/activities/Index'));
const Notifications = lazy(()=> import('../pages/notifications/Index'))


const AppRoutes = () => {
  return (
    <Suspense fallback={<h3>Loading......</h3>}>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/catalogs" element={<Catalog />} />
        <Route path="/products" element={<Products />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path='/notifications' element={<Notifications/>}/>
        <Route path='/aigrouprules' element={<AiGroupRules/>}/>
        <Route path="/airule" element={<AiRule/>}/>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
