import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx"; 
import Dashboard from "./pages/Dashboard.jsx";
import Projects from "./pages/Projects.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Footer from "./components/Footer.jsx";
import Contact from "./pages/Contact.jsx";
import { useParams } from "react-router-dom";
import GetUpdated from "./pages/GetUpdated.jsx";

function App() {
  const { username } = useParams();
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Adjusted Routes */}
        <Route path="/projects/:username" element={<Projects />} />
        <Route path="/dashboard/:username" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/profile/:username" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/contact/:username" element={<Contact />} />
        <Route path="/get-updated/:username" element={<GetUpdated />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
