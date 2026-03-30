import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Columns from './components/Columns'; 

function App() {
  return (
    <div className="container">
      <Header title="Task Manager" />      
      <Columns />
    </div>
  );
}

export default App;
