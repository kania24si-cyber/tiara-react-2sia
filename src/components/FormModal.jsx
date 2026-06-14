export default function FormModal({
  title,
  children,
  onClose,
}) {
  return (
    <div className="filter-box">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-2xl text-pink-600 font-semibold">
          {title}
        </h2>

        <button
          onClick={onClose}
          className="btn-primary"
        >
          Close
        </button>

      </div>

      {children}

    </div>
  );
}