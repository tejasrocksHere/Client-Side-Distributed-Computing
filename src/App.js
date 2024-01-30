import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import Book from "./pages/Books";
import Update from "./pages/Update";
import Navbar from "./Navbar";
import book from './pages/Add';
import Login from "./Login";


function App() {
  return (
   
    <div className="app">
       
      <BrowserRouter>
        <Routes>

                    <Route path="/" element={
                    
                    <>
                    
                    <Navbar books={book} />

                    <Book />
                    
                    </>
                    
                    
                    
                    } />

                    <Route path="/login" element={
                    
                    <>
                    
                    <Login/>

                    
                    </>
                    
                    
                    
                    } />


          <Route path="/add" element={
            <>
             
              <Add />
            </>
          } />
          <Route path="/update/:id" element={
            <>
            
              <Update />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
