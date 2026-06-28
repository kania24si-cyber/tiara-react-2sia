# BeautyBloom CRM — Rancangan Database Konseptual (V1 / Siap Integrasi Supabase V3)

> Catatan: dokumen ini hanya rancangan konseptual untuk menyiapkan struktur data V2 → V3. Implementasi Supabase Auth, RLS, dan CRUD penuh belum dilakukan pada fase ini.

## Entitas & Kolom (Konseptual)

### 1) `users`
**Tujuan:** Menyimpan kredensial dan role pengguna.

- `id` (uuid) — kunci utama
- `role` (enum/string) — `guest/member/admin` (atau gunakan mapping Supabase role)
- `email` — (umumnya Supabase Auth handle)
- `avatar_url` (optional)
- `created_at`, `updated_at`

**Relasi:**
- 1 user dapat memiliki 0/1 customer profile (tergantung model V3).

> Di roadmap: kredensial “bisa dimandiri atau Supabase Auth”. Pada konsep ini role di-handle di aplikasi / profile.

---

### 2) `products`
**Tujuan:** Katalog produk, harga, gambar, stok.

- `id` (uuid/int)
- `nama_produk` (text)
- `category` (text)
- `brand` (text)
- `shade` (text/nullable)
- `price` (numeric)
- `stock` (int)
- `rating` (numeric/float nullable) — agregat atau nilai manual (V3)
- `image` (text/URL)
- `status` (enum/string) — `Available/OutOfStock/...`
- `created_at`, `updated_at`

**Relasi:**
- `products` direferensikan oleh `transactions` dan `reviews`.

---

### 3) `customers`
**Tujuan:** Profil pelanggan dan kebutuhan CRM.

- `id` (uuid/int)
- `users_id` (FK → users.id, optional bila ingin 1:1)
- `nama_lengkap` (text)
- `phone` (text/nullable)
- `alamat` (text/nullable) — bisa dijadikan tabel terpisah di V3 bila perlu
- `created_at`, `updated_at`

**Relasi:**
- `customers` terkait dengan `memberships`, `transactions`, `reviews`.

---

### 4) `memberships`
**Tujuan:** Status tier dan benefit pelanggan.

- `id` (uuid/int)
- `customer_id` (FK → customers.id)
- `tier` (enum/string) — minimal `Silver`, `Gold` (V2)
- `discount_pct` (numeric)
- `points` (int/nullable) — konsep loyalty point
- `points_updated_at` (timestamp/nullable)
- `started_at` (timestamp)
- `upgraded_at` (timestamp/nullable)
- `created_at`, `updated_at`

**Relasi:**
- 1 customer memiliki 1 membership aktif (atau history membership di V3).

---

### 5) `transactions`
**Tujuan:** Riwayat pembelian.

- `id` (uuid/int)
- `customer_id` (FK → customers.id)
- `total_amount` (numeric)
- `payment_status` (enum/string) — pada V3 (di V2: out of scope)
- `created_at`, `updated_at`

> Pada V2: out of scope (tidak implement CRUD/order management penuh).

**Relasi Konseptual:**
- `transactions` dapat memiliki detail per produk (opsional tabel `transaction_items`).

---

### 6) `reviews`
**Tujuan:** Rating dan komentar pelanggan.

- `id` (uuid/int)
- `customer_id` (FK → customers.id)
- `product_id` (FK → products.id)
- `rating` (int) — 1..5
- `komentar` (text/nullable)
- `created_at`, `updated_at`

**Relasi:**
- Terhubung ke produk dan customer.

---

### 7) `promos`
**Tujuan:** Voucher, diskon, dan masa berlaku.

- `id` (uuid/int)
- `kode_promo` (text unique)
- `persentase_diskon` (numeric)
- `minimal_transaksi` (numeric/nullable)
- `tanggal_kedaluwarsa` (date/timestamp)
- `is_active` (boolean)
- `description` (text/nullable)
- `created_at`, `updated_at`

**Relasi:**
- Bisa dihubungkan dengan eligibility tier (opsional tabel `promo_tiers` di V3).

---

## Relasi Inti (Ringkas)
- `users` → (opsional) `customers`
- `customers` → `memberships`
- `customers` → `transactions`
- `transactions` → `products` (via transaction_items jika dibuat)
- `customers` & `products` → `reviews`
- `promos` (kemungkinan rules eligibility berdasarkan membership tier di V3)

---

## Catatan Integrasi Supabase V3 (Non-Production di V2)
1. **Auth:** bisa memakai Supabase Auth; `users` dapat dipetakan ke `customers` setelah login.
2. **RLS:** V3 perlu RLS untuk membatasi akses:
   - member hanya melihat data miliknya
   - admin mengelola master data
3. **Schema Evolution:** V2 hanya menargetkan “struktur siap”, bukan CRUD penuh.
4. **Loading/Empty state:** sudah disiapkan secara konsep di UI (untuk data dinamis V3).

---

## Status V2 vs V3
- **V2:** data statis / dummy, tidak ada integrasi backend penuh.
- **V3:** implementasi Supabase (schema, auth mapping, RLS, dan API).

