import Background from './components/Background'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import DemoSections from './components/DemoSections'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Background />
      <Header />
      <main>
        <Hero />
        <About />
        <DemoSections />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}

export default App

