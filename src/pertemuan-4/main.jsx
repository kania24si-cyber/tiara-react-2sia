import { createRoot } from "react-dom/client";
import "./tailwind.css";
import ServiceCard from "./ServiceCard";
import ServiceTable from "./ServiceTable";
import ServiceSearchFilter from "./ServiceSearchFilter";

function App() {
  return (
    <div>
      <ServiceSearchFilter />
      <ServiceCard />
      <ServiceTable />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <App />
);