import './App.css';
import "leaflet/dist/leaflet.css";
import Main from './page/Main';
import Header from './components/header/Header';

import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import FooterPage from './components/footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <FooterPage />
    </div>
  );
}

export default App;
