import "./App.css";
import { useRoutes } from "hookrouter";
import { HomePage } from "./pages/HomePage";
import { Calc } from "./pages/Calc";

const routes = {
  "/": () => <HomePage />,
  "/old-calc": () => <Calc />,
  // "/calc": () => <NewCalc />,
};

function App() {
  const routeResult = useRoutes(routes);

  return routeResult || <h1>404 not found</h1>;
}

export default App;
