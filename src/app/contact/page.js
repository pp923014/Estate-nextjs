"use client";
import { useState } from "react";
export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [status, setStatus] = useState("");
    async function submit(e) {
        e.preventDefault();
        setStatus("Sending...");
        try {
            const r = await fetch("/api/inquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const d = await r.json();
            if (!r.ok) throw new Error(d.message);
            setStatus("Thank you. Your message has been received.");
            setForm({ name: "", email: "", phone: "", message: "" });
        } catch (e) {
            setStatus(e.message);
        }
    }
    return (
        <div className="container-shell grid gap-12 py-20 md:grid-cols-2">
            <div>
                <p className="eyebrow">WE&apos;RE HERE TO HELP</p>
                <h1 className="section-title mt-3">Let&apos;s start a conversation.</h1>
                <p className="mt-5 max-w-md text-sm leading-8 text-muted">
                    Tell us what you&apos;re looking for, ask a question or talk to us about
                    your property.
                </p>
                <div className="mt-10 space-y-3 text-sm text-muted">
                    +91 98765 43210
                    <br />
                    hello@example.com
                    <br />
                    India
                </div>
            </div>
            <form
                onSubmit={submit}
                className="grid gap-4 rounded-xl border border-line p-6"
            >
                <input
                    className="field"
                    placeholder="Your name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    className="field"
                    type="email"
                    placeholder="Email address"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    className="field"
                    placeholder="Phone number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <textarea
                    className="field"
                    rows="5"
                    placeholder="How can we help?"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                {status && <p className="text-sm text-accent">{status}</p>}
                <button className="btn-dark">Send message</button>
            </form>
        </div>
    );
}
