import { Outlet } from "react-router-dom";
import CustomerDashBoard from "./CustomerDashBoard";

function CustomerLayout() {
  return (
    <CustomerDashBoard>
      <Outlet />
    </CustomerDashBoard>
  );
}

export default CustomerLayout;
