import ReactDOM from "react-dom/client";
import "./style.css";
import { Home } from "./components/home";

const UI = () => {
  return <Home />;
};

const root = ReactDOM.createRoot(document.getElementById("react-page"));

root.render(<UI />);
