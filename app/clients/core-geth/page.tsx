import { ClientProfilePage } from "@/components/sections/ClientProfilePage";
import { clientMetadata } from "@/lib/clients";

export const metadata = clientMetadata("core-geth");

export default function CoreGethPage() {
  return <ClientProfilePage slug="core-geth" />;
}
