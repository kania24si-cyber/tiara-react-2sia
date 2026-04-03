import { useState } from "react";
import InputField from "./components/InputField";
import SelectField from "./components/SelectField";

export default function UserForm() {
  // STATE
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [umur, setUmur] = useState("");
  const [gender, setGender] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");

  const [error, setError] = useState({});
  const [hasil, setHasil] = useState(null);

  const validate = (data) => {
    let err = {};

    if (!data.nama) err.nama = "Nama wajib diisi";
    else if (!isNaN(data.nama)) err.nama = "Tidak boleh angka";
    else if (data.nama.length < 3) err.nama = "Minimal 3 karakter";

    if (!data.email) err.email = "Email wajib diisi";
    else if (!data.email.includes("@")) err.email = "Harus ada @";
    else if (!data.email.includes(".")) err.email = "Harus ada domain";

    if (!data.umur) err.umur = "Umur wajib diisi";
    else if (data.umur <= 0) err.umur = "Harus > 0";
    else if (data.umur < 17) err.umur = "Minimal 17 tahun";

    if (!data.gender) err.gender = "Pilih gender";
    if (!data.pekerjaan) err.pekerjaan = "Pilih pekerjaan";

    return err;
  };

  // HANDLE CHANGE (REAL-TIME)
  const handleChange = (field, value) => {
    const newData = {
      nama,
      email,
      umur,
      gender,
      pekerjaan,
      [field]: value,
    };

    // update state sesuai field
    if (field === "nama") setNama(value);
    if (field === "email") setEmail(value);
    if (field === "umur") setUmur(value);
    if (field === "gender") setGender(value);
    if (field === "pekerjaan") setPekerjaan(value);

    // validasi real-time
    setError(validate(newData));
  };

  // SUBMIT
  const handleSubmit = () => {
    const data = { nama, email, umur, gender, pekerjaan };
    const err = validate(data);
    setError(err);

    if (Object.keys(err).length === 0) {
      setHasil(data);
    }
  };

  // KONDISI VALID
  const isValid =
    nama &&
    email &&
    umur &&
    gender &&
    pekerjaan &&
    Object.keys(error).length === 0;

  return (
    <div className="space-y-3">

      <InputField
        label="Nama"
        type="text"
        value={nama}
        onChange={(e) => handleChange("nama", e.target.value)}
        error={error.nama}
      />

      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={error.email}
      />

      <InputField
        label="Umur"
        type="number"
        value={umur}
        onChange={(e) => handleChange("umur", e.target.value)}
        error={error.umur}
      />

      <SelectField
        label="Gender"
        value={gender}
        onChange={(e) => handleChange("gender", e.target.value)}
        options={["Laki-laki", "Perempuan"]}
        error={error.gender}
      />

      <SelectField
        label="Pekerjaan"
        value={pekerjaan}
        onChange={(e) => handleChange("pekerjaan", e.target.value)}
        options={["Mahasiswa", "Karyawan", "Freelancer"]}
        error={error.pekerjaan}
      />

      {/* BUTTON */}
      {isValid && (
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded transition"
        >
          Submit
        </button>
      )}

      {/* HASIL */}
      {hasil && (
        <div className="mt-4 bg-blue-100 border-l-4 border-blue-500 p-3 rounded">
          <p><b>Nama:</b> {hasil.nama}</p>
          <p><b>Email:</b> {hasil.email}</p>
          <p><b>Umur:</b> {hasil.umur}</p>
          <p><b>Gender:</b> {hasil.gender}</p>
          <p><b>Pekerjaan:</b> {hasil.pekerjaan}</p>
        </div>
      )}
    </div>
  );
}