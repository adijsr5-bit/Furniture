import GenericPage from "@/components/GenericPage";
import { MapPin, Phone, Mail } from "lucide-react";
import { getSiteSettings } from "@/lib/getSettings";
import ContactTabs from "@/components/contact/ContactTabs";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <GenericPage title="Contact Us">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <p className="text-brand-dark/70 font-light leading-relaxed">
            Our dedicated concierge team is available to assist you with any inquiries regarding our collections, bespoke services, or interior design consultations.
          </p>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-brand-gold mt-1 shrink-0" />
              <div>
                <h4 className="font-serif text-xl mb-1 text-brand-dark">Showroom</h4>
                <p className="whitespace-pre-wrap text-brand-dark/80 font-light text-sm leading-relaxed">{settings.storeAddress}</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-brand-gold mt-1 shrink-0" />
              <div>
                <h4 className="font-serif text-xl mb-1 text-brand-dark">Phone</h4>
                <p className="text-brand-dark/80 font-light text-sm leading-relaxed">{settings.whatsappNumber}<br/>Mon-Fri, 9am - 6pm EST</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-brand-gold mt-1 shrink-0" />
              <div>
                <h4 className="font-serif text-xl mb-1 text-brand-dark">Email</h4>
                <p className="text-brand-dark/80 font-light text-sm">{settings.contactEmail}</p>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Tabs Form Column */}
        <div className="lg:col-span-7">
          <ContactTabs />
        </div>
      </div>
    </GenericPage>
  );
}
