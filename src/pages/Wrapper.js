import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const Wrapper = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Wrapper;
