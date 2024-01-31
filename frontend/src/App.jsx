import React, { useContext } from "react";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import IndexPage from "./Pages/Index Page/IndexPage";
import Register from "./Pages/Login/Register";
import CreateBlog from "./Pages/Create blog/CreateBlog";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";
import Profile from "./Pages/Profile/Profile";
import ProfileEdit from "./components/Edit profile/ProfileEdit";
import Bookmarks from "./Pages/Bookmarks/Bookmarks";
import Privacy from "./Pages/Privacy policy/Privacy";
import Logout from "./Pages/LogOut/Logout";
import Privateroute from "./Privateroute/Privateroute";
import Editpost from "./Pages/Create blog/Editpost";
import Error from "./Pages/Error page/Error";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<Privateroute />}>
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/editpost/:id" element={<Editpost />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/editprofile/:id" element={<ProfileEdit />} />
            <Route path="/save" element={<Bookmarks />} />
          </Route>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/details/:id" element={<BlogDetails />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
