import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Login from "./components/login/login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./Actions/User";
import Home from "./components/home/home";
import Account from "./components/Account/Account";
import NewPost from "./components/newPost/newPost";
import Register from "./components/register/register";
import UpdateProfile from "./components/updateProfile/updateProfile";
import UpdatePassword from "./components/updatePassword/updatePassword";
import ForgotPassword from "./components/forgotPassword/forgotPassword";
import ResetPassword from "./components/resetPassword/resetPassword";
import UserProfile from "./components/userProfile/userProfile";
import Search from "./components/search/search";
import NotFound from "./components/notFound/notFound";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Router>
      {isAuthenticated && <Header />}

      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Login />}
        />

        {/* <Route
          path="/register"
          element={isAuthenticated ? <Account /> : <Register />}
        />

        <Route
          path="/newpost"
          element={isAuthenticated ? <NewPost /> : <Login />}
        />

        <Route
          path="/update/profile"
          element={isAuthenticated ? <UpdateProfile /> : <Login />}
        />
        <Route
          path="/update/password"
          element={isAuthenticated ? <UpdatePassword /> : <Login />}
        />

        <Route
          path="/forgot/password"
          element={isAuthenticated ? <UpdatePassword /> : <ForgotPassword />}
        />

        <Route
          path="/password/reset/:token"
          element={isAuthenticated ? <UpdatePassword /> : <ResetPassword />}
        />

        <Route
          path="/user/:id"
          element={isAuthenticated ? <UserProfile /> : <Login />}
        /> */}

        <Route path="search" element={<Search />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;