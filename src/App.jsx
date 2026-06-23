import Process from "./components/Process";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ArtisanPage from "./components/ArtisanPage";
import Footer from "./components/Footer";
import Costumize from "./components/Costumize";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Process />
        <ArtisanPage />
        <Costumize />
        <Footer />
      </main>
    </>
  );
}

export default App;
