export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="px-3 py-1 rounded-full border border-primary/20 btn-gradient my-2">
        <a href="#explore">Find your GPT</a>
      </div>
      <h1 className="head-text">Learn Better with <span className="orange-gradient">EduGPTs</span></h1>
      <h1 className="desc">Largest Collection of GPTs for educational purposes</h1>
    </section>
  )
}