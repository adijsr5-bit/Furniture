import GenericPage from "@/components/GenericPage";
import { MapPin, Phone, Mail } from "lucide-react";
import { getSiteSettings } from "@/lib/getSettings";
import ContactForm from "@/components/contact/ContactForm";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <GenericPage title="Contact Us">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="mb-8">Our dedicated concierge team is available to assist you with any inquiries regarding our collections, bespoke services, or interior design consultations.</p>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-brand-gold mt-1" />
              <div>
                <h4 className="font-serif text-xl mb-1">Showroom</h4>
                <p className="whitespace-pre-wrap">{settings.storeAddress}</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-brand-gold mt-1" />
              <div>
                <h4 className="font-serif text-xl mb-1">Phone</h4>
                <p>{settings.whatsappNumber}<br/>Mon-Fri, 9am - 6pm EST</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-brand-gold mt-1" />
              <div>
                <h4 className="font-serif text-xl mb-1">Email</h4>
                <p>{settings.contactEmail}</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-8 border border-brand-dark/10 shadow-sm">
          <h3 className="font-serif text-2xl text-brand-dark mb-6">Send a Message</h3>
          <ContactForm />
        </div>
      </div>
    </GenericPage>
  );
}
