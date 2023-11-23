import { Provider } from 'react-redux';
import './App.css';
import Sidebar from './components/layout/Sidebar';
import store from './store';
import Notes from './components/Notes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Archive from './components/Archive';
import Tag from './components/Tag';
import Trash from './components/Trash';

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Sidebar />

          <Routes>
            <Route path="/" element={<Notes />} />
            <Route path="/tag" element={<Tag />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/trash" element={<Trash />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
