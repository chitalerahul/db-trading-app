import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./components/About.tsx";
import Trade from "./components/Trade.tsx";
import Trades from "./components/Trades.tsx";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Trades />} />
          <Route path="/trades" element={<Trades />} />
          <Route path="/trade/:id" element={<Trade />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
