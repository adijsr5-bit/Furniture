import ClientNavbar from "./ClientNavbar";
import { getSiteSettings } from "@/lib/getSettings";

export default async function Navbar() {
  const settings = await getSiteSettings();
  return <ClientNavbar brandName={settings.brandName} />;
}
