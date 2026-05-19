import GenericPage from "@/components/GenericPage";
import { getSiteSettings } from "@/lib/getSettings";

export default async function ShippingPage() {
  const settings = await getSiteSettings();
  
  return (
    <GenericPage title="Shipping Policy">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 border border-brand-dark/10 shadow-sm whitespace-pre-wrap leading-relaxed">
        {settings.shippingPolicy}
      </div>
    </GenericPage>
  );
}
