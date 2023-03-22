  import { BrowserRouter, Route, Routes } from "react-router-dom";
  import CustomerRegister from "../Pages/CustomerRegister";
  import CustomerUpdate from "../Pages/CustomerUpdate";
  import Home from "../Pages/Home";
  import Login from "../Pages/Login";
  import Register from "../Pages/Register";

  const RoutesApp = () => {
    return (
      <BrowserRouter>
          <Routes>
            <Route exact path="/home" element={<Home/>} />
            <Route path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
            <Route path="/create" element={<CustomerRegister />} />
            <Route path="/customer/update/:id" element={<CustomerUpdate />} />
          </Routes>
      </BrowserRouter>
    );
  };

  export default RoutesApp;