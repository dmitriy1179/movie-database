import { Outlet } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      {/* <div className='h-100' data-bs-theme="dark"> */}
      <Header />
      <div className='wrapper d-flex flex-column gradient'>
        <Outlet />
      </div>
      <Footer />
      {/* </div> */}
    </>
  )
}

export default App