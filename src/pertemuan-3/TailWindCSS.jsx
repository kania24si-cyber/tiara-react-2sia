import UserForm from "./UserForm";

export default function TailwindCSS() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 font-sans">
      {/* HEADER */}
      <Header />

      {/* FORM */}
      <div className="flex justify-center mt-8">
        <div className="bg-white p-6 rounded-xl shadow-2xl w-96 hover:shadow-3xl transition">
          <UserForm />
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

//////////////////////////////////////////////////////
// HEADER
function Header() {
  return (
    <div className="text-center mt-8">
      <h1 className="text-3xl font-extrabold text-blue-600">
        Form Registrasi User
      </h1>
      <p className="text-gray-500 mt-2">
        Silakan isi data dengan benar
      </p>
    </div>
  );
}

//////////////////////////////////////////////////////
// SPACING (CARD)
function Spacing({ title, content }) {
  return (
    <div className="bg-white shadow-lg p-5 rounded-xl hover:shadow-xl transition">
      <h2 className="text-lg font-semibold text-blue-600">{title}</h2>
      <p className="mt-2 text-gray-600 text-sm">{content}</p>
    </div>
  );
}

//////////////////////////////////////////////////////
// FOOTER
function Footer() {
  return (
    <footer className="text-center text-gray-400 mt-12 pb-6 text-sm">
      © 2026 React Tailwind Project
    </footer>
  );
}