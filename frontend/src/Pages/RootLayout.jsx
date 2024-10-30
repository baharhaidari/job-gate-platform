import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { ToastContainer } from "react-toastify";

function RootLayout() {
  return (
    <>
      <Navbar />
      <main>
        <ToastContainer />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
