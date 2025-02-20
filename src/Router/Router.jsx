import { Route, Routes } from "react-router";
import AuthProvaider from "../provaider/AuthProvaider";

import Home from "../components/Home";
import MainLayout from "../Layout/MainLayout";
import TaskGrid from "../components/TaskGrid";
import PrivetRoute from "../PrivetRoute/PrivetRoute";

const Router = () => {
  return (
    <>
      <AuthProvaider>
        <Routes>
          <Route path="/" element={<Home></Home>}>
            <Route path="/" element={<MainLayout></MainLayout>}></Route>
            <Route
              path="/task"
              element={
                <PrivetRoute>
                  <TaskGrid></TaskGrid>
                </PrivetRoute>
              }
            ></Route>
          </Route>
        </Routes>
      </AuthProvaider>
    </>
  );
};

export default Router;
