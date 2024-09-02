import Contacts from "@/components/Contacts";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Contacts />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
