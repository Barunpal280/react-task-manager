import './App.css';
import Header from './components/Header';
import Columns from './components/Columns';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <div className="container">
        <Header title="Task Manager" />      
        <Columns />
      </div>
    </TaskProvider>
  );
}

export default App;
