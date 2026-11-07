import Cta from './Cta'
import Faq from './Faq'
import Features from './Features'
import Footer from './Footer'
import Hero from './Hero'
import HowItWorks from './HowItWorks'
import Navbar from './Navbar'

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Faq />
      <Cta />
      <Footer />
    </div>
  )
}