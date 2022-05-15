import './App.css';
import { Routes, Route } from "react-router-dom";
import Body from './Body';
import Watchlist from './Watchlist';
import Youtube from './Youtube';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={ <Body/> } />
        <Route path='watchlist' element={ <Watchlist/> } />
        <Route path='youtube' element={ <Youtube/> } />
      </Routes>
    </div>
  );
}

export default App;
