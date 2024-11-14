import { Routes, Route } from "react-router-dom";
import "./App.css";
import Purchase from "./purchase/Purchase";
import Sale from "./sale/Sale";
import Stock from "./stock/Stock";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Purchase productId={1} />} />
        <Route path="/sale" element={<Sale productId={1} />} />
        <Route path="/stock" element={<Stock />} />
      </Routes>
    </div>
  );
}

export default App;
