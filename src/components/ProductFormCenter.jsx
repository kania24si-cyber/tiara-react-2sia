import InputField from "./InputField";
import SelectField from "./SelectField";
import Button from "./Button";

export default function ProductFormCenter() {
  return (
    <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-gray-900 text-sm border-b border-gray-50 pb-2 mb-4">Pusat Input Katalog</h3>
        <div className="space-y-3.5">
          <InputField placeholder="Nama Item Kosmetik" />
          <InputField placeholder="Nominal Rupiah (Rp)" />
          <SelectField options={["Makeup Line", "Skincare Laboratory", "Premium Fragrance"]} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-6">
        <Button type="primary" className="w-full text-xs py-2.5">Tambahkan</Button>
        <Button type="success" className="w-full text-xs py-2.5">Simpan Data</Button>
        <Button type="secondary" className="w-full text-xs py-2.5">Bulk Impor</Button>
        <Button type="warning" className="w-full text-xs py-2.5">Set Diskon</Button>
      </div>
    </div>
  );
}