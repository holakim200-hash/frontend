import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CafeTest from "./pages/CafeTest";
import PostTest from "./pages/PostTest";
import FavoriteTest from "./pages/FavoriteTest";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} /> {/* 메인 화면 추가 */}
        <Route path="/cafetest" element={<CafeTest />} />
        <Route path="/posttest" element={<PostTest />} />
        <Route path="/favoritetest" element={<FavoriteTest />} />
      </Routes>
    </Router>
  );
}

export default App;
