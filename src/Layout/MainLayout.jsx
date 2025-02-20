import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <Header></Header>
      <main>
        <Outlet></Outlet>
        <Toaster position="top-center" />
      </main>
    </>
  );
};

export default MainLayout;
