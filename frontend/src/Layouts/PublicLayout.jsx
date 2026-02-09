import { Outlet } from "react-router-dom";
import Navbar from "../components/common/navbar";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default PublicLayout;