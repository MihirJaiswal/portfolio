import Service from './Service'
import Review from './Review'
import ContactForm from '../contact/Contact'
import Intro from './Intro'
import AnimatedSection from './AnimatedSection'

export default function Cards() {
  return (
    <>
      <AnimatedSection>
        <div className="absolute inset-0 w-full h-screen flex items-start justify-center bg-black z-10">
          <div className="py-24 px-6 w-full">
            <Review />
          </div>
        </div>

        <div className="absolute inset-0 w-full h-[630px] flex items-start border-none justify-center bg-transparent z-20">
          <div className="pt-24 bg-gradient-to-b from-transparent to-neutral-950 px-6 w-full">
            <Service />
          </div>
        </div>

        <div className="absolute inset-0 w-full h-screen flex items-start justify-center bg-gradient-to-b from-transparent to-neutral-950 z-30">
          <div className="pt-24 px-6 w-full">
            <Intro />
          </div>
        </div>
        
        <ContactForm />
      </AnimatedSection>

      <section className="lg:hidden bg-black md:pb-12">
        <div className="mb-12">
          <Review />
        </div>
        <div className="md:mb-12">
          <Service />
        </div>
        <Intro />
      </section>
    </>
  )
}
