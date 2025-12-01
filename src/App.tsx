import { useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
            <Route path="/trades" index element={<Trades />} />
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
            <Route path="*" element={<Navigate to="/trades" />} />
          </Routes>
        </Layout>
      </Router>
    </CustomThemeProvider>
  );
}

export default App;
