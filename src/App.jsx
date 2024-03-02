import { Footer, Header } from "./components/Components";
import "./styles/App.css";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <div className="main-container">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default App;
