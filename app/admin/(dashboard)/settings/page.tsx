"use client";
import { useState, useEffect } from "react";

const FIELDS = [
  { key: "brandName", label: "Store Name (e.g. TY Culture)" },
  { key: "logoUrl", label: "Logo Image URL (Upload via /api/upload first)" },
  { key: "tagline", label: "Store Tagline (e.g. Everyday elegance for everyone)" },
  { key: "announcement", label: "Announcement Bar (Top of site)" },
  { key: "heroTitle", label: "Hero Title (Use \n for line break)" },
  { key: "heroSubtitle", label: "Hero Subtitle" },
  { key: "whatsapp", label: "WhatsApp Number (e.g. 2348012345678)" },
  { key: "phone", label: "Phone Number" },
  { key: "email", label: "Email Address" },
  { key: "address", label: "Store Address (Shows in Footer & Contact)" },
  { key: "bankName", label: "Bank Name" },
  { key: "accountName", label: "Account Name" },
  { key: "accountNumber", label: "Account Number" },
  { key: "instagram", label: "Instagram URL" },
  { key: "tiktok", label: "TikTok URL" },
  { key: "facebook", label: "Facebook URL" },
];

export default function AdminSettings() {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings").then((r) => r.json()).then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    alert("Settings saved!");
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const json = await res.json();
    if (json.url) {
      setData({ ...data, logoUrl: json.url });
    }
    setUploading(false);
  }

  if (loading) return <div className="p-10 text-center text-[#8A7F76]">Loading settings...</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-3xl mb-8 text-[#3E2A20]">Site Settings</h1>
      
      <div className="space-y-5 bg-white p-8 rounded-2xl border border-[#EFE6DD]">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label className="block text-sm font-medium text-[#3E2A20] mb-2">{f.label}</label>
            <input
              type="text"
              value={data[f.key] || ""}
              onChange={(e) => setData({ ...data, [f.key]: e.target.value })}
              className="w-full rounded-xl border border-[#EFE6DD] px-4 py-3 text-sm focus:border-[#C9A875] focus:outline-none"
            />
            {f.key === "logoUrl" && (
              <div className="mt-2 text-sm text-[#8A7F76]">
                Or upload directly: <input type="file" onChange={handleLogoUpload} className="mt-1" />
                {uploading && <span className="ml-2">Uploading...</span>}
              </div>
            )}
          </div>
        ))}

        <button onClick={save} disabled={saving} className="mt-6 w-full bg-[#3E2A20] text-white py-3 rounded-xl uppercase tracking-widest text-sm disabled:opacity-50">
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}