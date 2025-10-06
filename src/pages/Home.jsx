import Header from "../components/Header";
import FAQ from "../components/FAQ";
import Movie_list from "../components/Movie_list";
import F_and_Q from "../components/F_and_Q";
import CTA_section from "../components/CTA_section";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
    <div id="header">
      <Header />
    </div>

      <Movie_list/>
      <FAQ />

      <div id="faq">
      <F_and_Q />
      </div>
      <CTA_section />
      <Footer />
    </>
  );
}

export default Home;
