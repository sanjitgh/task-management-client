import Header from "../components/Header";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default MainLayout;
