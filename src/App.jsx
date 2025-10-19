import './App.css';
import AppRouter from './router/AppRouter'
import { Toaster } from 'react-hot-toast';

function App() {
  return <div>
    <AppRouter />
     <Toaster position="top-center"/>
    </div>
}

export default App;