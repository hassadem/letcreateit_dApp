import React from "react";
import Navbar from "./components/Navbar";
import TokenForm from "./components/TokenForm";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>LetCreateIt</h1>
        <p>Create Your Meme Token Instantly on Base Blockchain!</p>
        <TokenForm />
      </header>
      <Footer />
    </div>
  );
}

export default App;
