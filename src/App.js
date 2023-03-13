import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Landing, Dog} from './components';
function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Landing />}/>
    <Route path='/:breed' element={<Dog />} />
   </Routes>
   </BrowserRouter>

   </>
  );
}

export default App;
