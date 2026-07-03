# TODO - FK customers -> users + auto username/user_id

## Step 1
- Update `src/components/CustomerForm.jsx`:
  - Tambah dropdown/field `username` (read-only untuk member; dropdown untuk admin via props)
  - Tambah input hidden/readonly untuk `user_id`.

## Step 2
- Update `src/pages/Customers.jsx` (Admin):
  - Ambil daftar `users` dari `usersAPI`.
  - Tambahkan dropdown memilih user berdasarkan `users.username`.
  - Saat submit/create/update `customers`, sertakan `user_id` dan `username`.

## Step 3
- Update `src/pages/member/MemberAddress.jsx`:
  - Pastikan payload update ke `customers` sertakan `user_id` (dan `username` jika tersedia).

## Step 4
- Update `src/services/customersAPI.js` jika perlu:
  - Pastikan payload `user_id` dan `username` ikut terkirim saat create/update.

## Step 5 (DB)
- Sediakan SQL migration Supabase:
  - pastikan kolom `customers.user_id` ada
  - buat FK `customers.user_id -> users.id`
  - (opsional) unique constraint untuk 1 customer per user.

