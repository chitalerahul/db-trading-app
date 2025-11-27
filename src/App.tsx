import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Trades from "./pages/Trades.tsx";
import CustomThemeProvider from "./contexts/ThemeContext.tsx";
import { useTradesStore } from "./store/useTradesStore.ts";
const About = lazy(() => import("./pages/About.tsx"));
const Trade = lazy(() => import("./pages/Trade.tsx"));

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
            <Route
              path="/edittrade/:id"
              element={
                <Suspense>
                  <Trade key="editTrade" />
                </Suspense>
              }
            />
            <Route
              path="/createtrade"
              element={
                <Suspense>
                  <Trade key="createTrade" />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense>
                  <About />
                </Suspense>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </CustomThemeProvider>
  );
}

export default App;
