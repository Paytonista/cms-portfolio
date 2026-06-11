export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-[#07233c] via-[#061d32] to-[#041423]">
      
      <section className="flex flex-col items-center justify-center flex-1 text-center">
        <h1 className="text-5xl font-raleway font-bold text-[#DBE2EF]">
          Hi, I'm Kenneth C. Rabina
        </h1>

        <p className="text-lg mt-4 font-raleway  text-[#DBE2EF]">
          A Computer Science Graduate 
        </p>

        <div className="mt-6 flex gap-4 font-raleway ">
          <a href="/about" className="px-4 py-2 border text-white rounded animate-bounce">
            More About Me
          </a>
          <a href="/login" className="px-4 py-2 border rounded">
            Admin
          </a>
        </div>
        <div className="mt-6 flex gap-1 ">
          <a href="https://www.facebook.com/kenneth.rabina.3" className="px-1 py-1 " target="_blank">
            <img src="https://img.icons8.com/?size=100&id=118467&format=png&color=FFFFFF" className="w-10 h-10"></img>
          </a>
          <a href="https://github.com/Paytonista" className="px-1 py-1  " target="_blank">
            <img src="https://img.icons8.com/?size=100&id=12599&format=png&color=FFFFFF" className="w-10 h-10"></img>
          </a>
          <a href="https://www.linkedin.com/in/kenneth-rabina-856b4a244/" className="px-1 py-1  " target="_blank">
            <img src="https://img.icons8.com/?size=100&id=8808&format=png&color=FFFFFF" className="w-10 h-10"></img>
          </a> 
        </div>
      </section>

    </main>
  );
}