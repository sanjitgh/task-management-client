import { Route, Routes } from "react-router";
import AuthProvaider from "../provaider/AuthProvaider";
import MainLayout from "../Layout/MainLayout";
import PrivetRoute from "../PrivetRoute/PrivetRoute";
import TaskManagment from "../components/TaskManagment";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

const Router = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </>
  );
};

export default Router;
