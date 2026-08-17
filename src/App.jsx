import { Analytics } from '@vercel/analytics/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Background from './components/Background'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import DemoSections from './components/DemoSections'
import Capabilities from './components/Capabilities'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import QRRedirect from './components/QRRedirect'
import './App.css'

function MainContent() {
  return (
    <div className="app">
      <Background />
      <Header />
      <main>
        <Hero />
        <About />
        <DemoSections />
        <Capabilities />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/qr" element={<QRRedirect />} />
        <Route path="/" element={<MainContent />} />
      </Routes>
      <Analytics />
    </Router>
  )
}

export default App

