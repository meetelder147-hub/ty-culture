"use client";
import { useState } from "react";

export default function AdminPassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError("");

    const res = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus("success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setError(data.error || "Failed to update");
      setStatus("error");
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="font-serif text-3xl mb-8 text-[#3E2A20]">Change Password</h1>
      
      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-8 rounded-2xl border border-[#EFE6DD]">
        {status === "success" && (
          <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm">Password updated successfully!</div>
        )}
        {status === "error" && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm">{error}</div>
        )}

        <div>
          <label className="block text-sm mb-2 text-[#3E2A20]">Current Password</label>
          <input required type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full rounded-xl border border-[#EFE6DD] px-4 py-2 focus:outline-none focus:border-[#C9A875]" />
        </div>

        <div>
          <label className="block text-sm mb-2 text-[#3E2A20]">New Password</label>
          <input required type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full rounded-xl border border-[#EFE6DD] px-4 py-2 focus:outline-none focus:border-[#C9A875]" />
        </div>

        <div>
          <label className="block text-sm mb-2 text-[#3E2A20]">Confirm New Password</label>
          <input required type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full rounded-xl border border-[#EFE6DD] px-4 py-2 focus:outline-none focus:border-[#C9A875]" />
        </div>

        <button disabled={status === "loading"} className="w-full bg-[#3E2A20] text-white py-3 rounded-xl uppercase tracking-widest text-sm hover:bg-[#A67B5B] transition disabled:opacity-50">
          {status === "loading" ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}