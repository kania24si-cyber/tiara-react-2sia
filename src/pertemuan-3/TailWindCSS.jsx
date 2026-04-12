import UserForm from "./UserForm";

export default function TailwindCSS() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-white to-purple-300 font-sans">

      {/* NAVBAR */}
      <Navbar />

      {/* HEADER */}
      <Header />

      {/* FORM */}
      <div className="flex justify-center mt-10 px-4">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-2xl hover:shadow-indigo-300/50 transition duration-300">
          
          <h2 className="text-lg font-semibold text-gray-700 mb-5 text-center flex items-center justify-center gap-2">
            📝 <span>Isi Data Anda</span>
          </h2>

          <UserForm />
        </div>
      </div>

      {/* INFO */}
      <div className="mt-12 px-6 max-w-4xl mx-auto flex flex-col gap-4">
        <Spacing 
          icon="✅"
          title="Validasi" 
          content="Setiap input memiliki minimal 3 validasi untuk memastikan data benar" 
        />
        <Spacing 
          icon="♻️"
          title="Reusable Component" 
          content="Menggunakan component terpisah agar dapat digunakan kembali" 
        />
        <Spacing 
          icon="⚡"
          title="Conditional Rendering" 
          content="Tombol submit hanya muncul jika semua data valid" 
        />
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

//////////////////////////////////////////////////////
// NAVBAR
function Navbar() {
  return (
    <nav className="bg-white/60 backdrop-blur-md shadow-md px-6 py-3 flex justify-between items-center">
      <h1 className="font-bold text-indigo-600 text-lg">MyApp</h1>
      <div className="flex gap-6 text-sm text-gray-600">
        <span className="hover:text-indigo-600 cursor-pointer">Home</span>
        <span className="hover:text-indigo-600 cursor-pointer">About</span>
        <span className="hover:text-indigo-600 cursor-pointer">Contact</span>
      </div>
    </nav>
  );
}

//////////////////////////////////////////////////////
// HEADER
function Header() {
  return (
    <div className="text-center pt-12 px-4">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
        Form Registrasi User
      </h1>

      <p className="text-gray-500 mt-3 text-sm">
        Silakan isi data dengan benar dan lengkap
      </p>

      <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
    </div>
  );
}

//////////////////////////////////////////////////////
// CARD INFO (UPGRADE)
function Spacing({ title, content, icon }) {
  return (
    <div className="flex items-start gap-4 bg-white/80 backdrop-blur-md border border-gray-200 shadow-md p-5 rounded-xl hover:shadow-xl transition duration-300">
      
      <div className="text-2xl">
        {icon}
      </div>

      <div>
        <h2 className="text-md font-semibold text-indigo-600">
          {title}
        </h2>
        <p className="mt-1 text-gray-600 text-sm leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
}

//////////////////////////////////////////////////////
// FOOTER
function Footer() {
  return (
    <footer className="text-center text-gray-400 mt-16 pb-6 text-sm">
      <div className="w-16 h-[2px] bg-gray-300 mx-auto mb-3"></div>
      © 2026 React Tailwind Project
    </footer>
  );
}