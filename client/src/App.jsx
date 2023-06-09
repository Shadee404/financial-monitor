import { ThemeProvider } from '@emotion/react';
import LogIn from './pages/LogIn';
import theme from './styles';
import SignUp from './pages/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
// import CreditCard from './pages/CreditCard';
// import TestComponent from './pages/TestComponent';
import Transactions from './pages/Transactions';
import Zvit from './pages/Zvit';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/main' element={<Main />} />
          {/* <Route path='/credit-card' element={<CreditCard />} /> */}
          <Route path='/transactions' element={<Transactions />} />
          <Route path='/zvit' element={<Zvit />} />
          {/* <Route path='/testing' element={<TestComponent />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
