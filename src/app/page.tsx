import Header from '@/components/Header'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <div className='bg-shape-500 h-screen text-primary-500 snap-y snap-mandatory overflow-scroll z-0'>
      <Header />
      <section id='hero' className='snap-center'>
        <Hero />
      </section>
    </div>
  )
}
