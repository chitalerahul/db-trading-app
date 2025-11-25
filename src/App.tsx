import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./pages/About.tsx";
import Trade from "./pages/Trade.tsx";
import Trades from "./pages/Trades.tsx";
import CustomThemeProvider from "./contexts/ThemeContext.tsx";

function App() {
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
