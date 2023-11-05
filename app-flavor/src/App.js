import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import AppLogIn from './components/AppLogIn';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';
import AppProduct from './components/AppProduct';


function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppHeader/>}>
          <Route index element={<AppContent />}></Route>
          <Route path='login' element={<AppLogIn />}></Route>
          <Route path='product' element={<AppProduct />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  <AppFooter/>
  </>
  );
}

export default App;
