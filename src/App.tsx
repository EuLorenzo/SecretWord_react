import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
