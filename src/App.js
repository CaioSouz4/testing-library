import logo from './logo.svg';
import './App.css';
import DataList from './DataList';
import DataListFromApi from './DataListFromApi';

function App() {
  return (
    <div className="App">
      <DataList/>
      <DataListFromApi/>
    </div>
  );
}

export default App;
