import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Product from './components/Products/Product';


function App() {
  return (
    <div className="body">
      <Header></Header>
      <Shop></Shop>
    </div>
  );
}

export default App;
