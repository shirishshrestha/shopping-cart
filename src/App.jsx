import { CustomToastContainer, Footer, Header } from "./components/Components";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <div className="main-container">
        <Header />
        <main>
          <CustomToastContainer />
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default App;
