import { Layout } from "./components/Layout.jsx";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { NewsRead } from "./pages/NewsRead.jsx";
import { AddNews } from "./pages/AddNews.jsx";
import { Register } from "./pages/Register.jsx";
import { Login } from "./pages/Login.jsx";
import { MyNews } from "./pages/MyNews.jsx";
import { EditNews } from "./pages/EditNews.jsx";
import { Admin } from "./pages/Admin.jsx";
import { EditUser } from "./pages/EditUser.jsx";
import { Categorynav } from "./components/Categorynav.jsx";

import { NewsByCategories } from "./pages/NewsByCategories.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMe, checkIsAuth } from "./redux/features/auth/authSlice.js";
// import { checkIsAuth } from "./redux/features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  // const{user} = useSelector((state) => state.auth)
  // if(isAuth){
  // const allowedRole = user.role[0];
  // console.log("user role ", allowedRole[0])
  // }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="news/:id" element={<NewsRead />}></Route>
        <Route path="/news/user/my/:id" element={<NewsRead />}></Route>
        <Route path="/news/user/my" element={<MyNews />}></Route>
        <Route path="new" element={<AddNews />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="admin" element={<Admin />}></Route>
        <Route path="/admin/edituser/:id" element={<EditUser />}></Route>
        <Route path="/edit/:id" element={<EditNews />} />
        <Route path="/news/category/:id" element={<NewsByCategories />} />
        {/* <Route path='/news/user/my/edit/:id' element={<EditNews />} /> */}
        <Route path="register" element={<Register />}></Route>
        <Route path="login" element={<Login />}></Route>
      </Routes>
      <ToastContainer position="top-center" />
    </Layout>
  );
}

export default App;
