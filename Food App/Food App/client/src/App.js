import './App.css';
import { HomeNSearch, Navbar, Pantry, LoginPage } from './components/common'; // Brackets, koska named export
import { Route } from 'react-router-dom';
// ReactRouteAppiin ei ikina href-tageja, koska ne aiheuttaa sivun uudelleen latautumisen
// ja kaikki tiedot mm. statet nollautuu, ELI KAYTETAAN LINKEJA
import { BrowserRouter } from 'react-router-dom';


const App = () => {


  return (

    <div>
      <BrowserRouter>
        <Navbar />
        <Route path='/' exact component={HomeNSearch} />
        <Route path='/kirjaudu' exact component={LoginPage} />
        <Route path='/reseptini' exact component={Pantry} />
      </BrowserRouter>

    </div>

  )
}

export default App;
