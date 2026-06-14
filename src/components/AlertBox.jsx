import { MdCheckCircle, MdError } from "react-icons/md";

export default function AlertBox({
  type = "success",
  children,
}) {
  const styles = {
    success:
      "bg-green-100 border border-green-300 text-green-700",
    error:
      "bg-red-100 border border-red-300 text-red-700",
  };

  return (
    <div
      className={`p-4 rounded-xl mb-4 flex items-center gap-2 ${styles[type]}`}
    >
      {type === "success" ? (
        <MdCheckCircle size={20} />
      ) : (
        <MdError size={20} />
      )}

      <span>{children}</span>
    </div>
  );
}