"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { SplitText } from "@/components/Reveal";

const fields = [
  ["name", "Full name", "text"],
  ["email", "Email", "email"],
  ["phone", "Phone number", "tel"],
];

export default function CodPage() {
  const router = useRouter();
  const { items, totalPrice } = useCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (Object.values(form).some((v) => !v.trim())) return toast.error("Please fill all fields");
    toast.success("Order confirmed! Thank you for your purchase.");
    router.push("/success");
  };

  return (
    <section className="section page-top narrow">
      <SplitText as="h1" text="Cash on delivery" className="display lg" italicWords={["delivery"]} immediate />
      <p className="lead">
        Pay when it arrives. {items.length > 0 && <>Order total: <strong>{formatPrice(totalPrice)}</strong></>}
      </p>
      <form className="form" onSubmit={submit}>
        {fields.map(([name, label, type], i) => (
          <motion.label
            key={name}
            className="field"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.7 }}
          >
            <input name={name} type={type} value={form[name]} onChange={set} placeholder=" " />
            <span>{label}</span>
          </motion.label>
        ))}
        <motion.label className="field" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }}>
          <textarea name="address" rows={3} value={form.address} onChange={set} placeholder=" " />
          <span>Delivery address</span>
        </motion.label>
        <button type="submit" className="btn block">
          <span>Confirm order</span>
        </button>
      </form>
    </section>
  );
}
