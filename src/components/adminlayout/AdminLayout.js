import React from 'react';
import SideBar from "../sidebar/SideBar";
import './AdminLayout.css';
import { Grid } from 'semantic-ui-react';


const AdminLayout = ({ children }) => {

  const menu = [
    {
      icon: "",
      name: "Dashboard",
      path: "/admin/dashboard",
      exact: true
    },
    {
      icon: "",
      name: "Orders",
      path: "/admin/orders",
      exact: true
    },
    {
      icon: "",
      name: "Products",
      path: "/admin/products",
      exact: true
    },
  ]

  return (
    <div className="dashboard-wrapper">
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={5}>
          <SideBar menuItems={menu} />
        </Grid.Column>
         <Grid.Column mobile={16} tablet={8} computer={11}>
           { children }
        </Grid.Column>
      </Grid>
       
     </div>
  );
}

export default AdminLayout;