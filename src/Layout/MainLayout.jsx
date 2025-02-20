import { Toaster } from "react-hot-toast";
import Login from "../components/Header";
import { Outlet } from "react-router";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <>
      <Header></Header>
      <Toaster position="top-center" />
    </>
  );
};

export default MainLayout;
