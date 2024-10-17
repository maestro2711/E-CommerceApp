import Footer from "./Pages/Footer.tsx";
import HeroSection from "./Pages/HeroSection.tsx";
import Header from "./Pages/Header.tsx";



function App() {


  return (
      <>
        <div className="min-h-screen flex flex-col bg-gray-100">
          <Header/>
          <main className="flex-grow">
            <HeroSection/>

          </main>
          <Footer/>
        </div>


      </>
  )
}

export default App
