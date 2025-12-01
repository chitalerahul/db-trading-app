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
import { BASE } from "./mocks/tradesConst.ts";
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
            <Route path={BASE + "trades"} index element={<Trades />} />
            <Route
              path={BASE + "edittrade/:id"}
              element={
                <Suspense>
                  <Trade key="editTrade" />
                </Suspense>
              }
            />
            <Route
              path={BASE + "createtrade"}
              element={
                <Suspense>
                  <Trade key="createTrade" />
                </Suspense>
              }
            />
            <Route
              path={BASE + "about"}
              element={
                <Suspense>
                  <About />
                </Suspense>
              }
            />
            <Route path={BASE} element={<Navigate to={BASE + "trades"} />} />
          </Routes>
        </Layout>
      </Router>
    </CustomThemeProvider>
  );
}

export default App;
