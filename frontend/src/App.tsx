import "./App.css";
// import QuestionSearch from "./components/QuestionSearch";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
    // <QuestionSearch />
  );
}

export default App;
