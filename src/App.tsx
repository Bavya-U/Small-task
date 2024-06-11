import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyApp from "./interface";
import MyClassComponent  from "./class"

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/inter' element={<MyApp  />} />
      <Route path='/class' element={<MyClassComponent />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App



