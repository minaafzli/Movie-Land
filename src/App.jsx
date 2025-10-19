import './App.css';
import AppRouter from './router/AppRouter'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return <div>
    <AppRouter />
     <ToastContainer position="top-center" autoClose={2000} theme="dark" />
    </div>
}

export default App;