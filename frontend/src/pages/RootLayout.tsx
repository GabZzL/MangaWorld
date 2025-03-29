import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/RootLayout.module.css";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
