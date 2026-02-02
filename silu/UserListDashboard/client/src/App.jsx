import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header';
import Navbar from './Components/navbar';
import Hero from './Components/Hero';
function App() {
  const [search, setSearch] = useState("");
  const [user, setAddUser] = useState(null);
  return (
    <div>
      <Header />
      <Navbar setSearch={setSearch} setAddUser={setAddUser} />
      <Hero search={search} user={user}  />
    </div>
  );
}

export default App
