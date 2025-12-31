import { Outlet } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import useTheme from './context/ThemeContext';

function App() {
  const { isDarkTheme } = useTheme();

  return (
    <>
      <Header />
      <div className={`wrapper d-flex flex-column ${isDarkTheme ? "" : "gradient"}`}>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default App