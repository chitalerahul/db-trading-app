import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./pages/About.tsx";
import Trade from "./pages/Trade.tsx";
import Trades from "./pages/Trades.tsx";
import CustomThemeProvider from "./contexts/ThemeContext.tsx";
import { useTradesStore } from "./store/useTradesStore.ts";
import { useEffect } from "react";

function App() {
  const { fetchTrades } = useTradesStore();

  useEffect(() => {
    fetchTrades();
  }, [fetchTrades]);

  return (
    <CustomThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Trades />} />
            <Route path="/trades" element={<Trades />} />
            <Route path="/trade/:id" element={<Trade />} />
            <Route path="/trade/create" element={<Trade />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </Router>
    </CustomThemeProvider>
  );
}

export default App;
