import { Route, Routes } from "react-router";
import AuthProvaider from "../provaider/AuthProvaider";
import MainLayout from "../Layout/MainLayout";
import PrivetRoute from "../PrivetRoute/PrivetRoute";
import TaskManagment from "../components/TaskManagment";

const Router = () => {
  return (
    <>
      <AuthProvaider>
        <Routes>
          <Route path="/" element={<MainLayout></MainLayout>}>
            <Route
              path="/task"
              element={
                <PrivetRoute>
                  <TaskManagment></TaskManagment>
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
