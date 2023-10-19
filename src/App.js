import logo from './logo.svg';
import './App.css';
import Chat from './component/Chat';
import KanbanBoard from './component/KanbanBoard';

function App() {
  return (
    <div className="App">
      <Chat/>
      <KanbanBoard/>
    </div>
  );
}

export default App;
