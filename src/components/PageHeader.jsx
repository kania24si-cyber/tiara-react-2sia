import { FiChevronRight } from "react-icons/fi";

export default function PageHeader({ title, breadcrumb, children }) {
  const breadcrumbItems =
    typeof breadcrumb === "string" ? [breadcrumb] : breadcrumb || [];

  return (
    <div
      id="pageheader-container"
      className="card-dashboard flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 transition-all"
    >
      {/* SISI KIRI: JUDUL & BREADCRUMB */}
      <div id="pageheader-left" className="flex flex-col">
        {/* Menggunakan font-poppins bawaan heading dashboard */}
        <h1
          id="page-title"
          className="text-2xl sm:text-3xl font-black text-gray-800 tracking-tight font-poppins"
        >
          {title}
        </h1>

        {breadcrumbItems.length > 0 && (
          <nav
            id="breadcrumb-links"
            className="flex items-center flex-wrap gap-1.5 mt-2 text-xs font-medium text-gray-500 font-barlow"
          >
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;
              return (
                <div key={index} className="flex items-center gap-1.5">
                  <span
                    className={`transition-colors duration-200 ${
                      isLast
                        ? "text-gray-800 font-bold"
                        : "hover:text-[#ED346C] cursor-pointer"
                    }`}
                  >
                    {item}
                  </span>
                  {!isLast && (
                    <FiChevronRight className="text-gray-400" size={13} />
                  )}
                </div>
              );
            })}
          </nav>
        )}
      </div>

      {/* SISI KANAN: TOMBOL AKSI (CHILDREN) */}
      {/* Tombol aksi otomatis rapi jika diisi komponen dengan kelas .btn-pink atau .btn-blue */}
      <div
        id="action-button"
        className="flex items-center gap-3 sm:self-center self-start"
      >
        {children}
      </div>
    </div>
  );
}