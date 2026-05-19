"use client";

export default function ContactForm() {
  return (
    <form className="space-y-4" onSubmit={async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        city: formData.get("city") || "Not Provided",
        customRequirement: formData.get("message"),
        status: "New"
      };
      
      try {
        const res = await fetch("/api/inquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        if(res.ok) {
          alert("Message sent successfully. Our concierge will contact you shortly.");
          (e.target as HTMLFormElement).reset();
        } else {
          alert("Something went wrong. Please try again.");
        }
      } catch(err) {
        alert("Something went wrong.");
      }
    }}>
      <div>
        <label className="block text-xs uppercase tracking-widest text-brand-dark/70 mb-2">Full Name</label>
        <input name="name" required className="w-full border-b border-brand-dark/20 py-2 bg-transparent focus:outline-none focus:border-brand-gold" />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-brand-dark/70 mb-2">Email</label>
        <input name="email" type="email" required className="w-full border-b border-brand-dark/20 py-2 bg-transparent focus:outline-none focus:border-brand-gold" />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-brand-dark/70 mb-2">Phone</label>
        <input name="phone" required className="w-full border-b border-brand-dark/20 py-2 bg-transparent focus:outline-none focus:border-brand-gold" />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-brand-dark/70 mb-2">City</label>
        <input name="city" required className="w-full border-b border-brand-dark/20 py-2 bg-transparent focus:outline-none focus:border-brand-gold" />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-brand-dark/70 mb-2">Message</label>
        <textarea name="message" required rows={4} className="w-full border-b border-brand-dark/20 py-2 bg-transparent focus:outline-none focus:border-brand-gold" />
      </div>
      <button type="submit" className="w-full bg-brand-dark text-white py-4 uppercase tracking-widest text-sm hover:bg-brand-gold transition-colors mt-6">
        Send Message
      </button>
    </form>
  );
}
