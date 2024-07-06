import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Excercises from "./pages/Exercises.jsx";
import ExerciseDetail from "./pages/ExerciseDetail.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import WorkoutPage from "./pages/WorkoutPage.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
  Route,
  Router,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="Exercises" element={<Excercises />} />
      <Route path="Exercises/:id" element={<ExerciseDetail />} />
      <Route path="Login" element={<LoginPage />} />
      <Route path="SignUp" element={<SignUpPage />} />
      <Route path="User" element={<DashboardPage />}>
        <Route index element={<WorkoutPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
