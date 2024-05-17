import react from "react";
import { Footer } from "../../Interfaces/components/Footer/Footer";
import { Nav } from "../../Interfaces/components/Navbar/Nav";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
