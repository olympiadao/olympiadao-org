import { ClientProfilePage } from "@/components/sections/ClientProfilePage";
import { clientMetadata } from "@/lib/clients";

export const metadata = clientMetadata("fukuii");

export default function FukuiiPage() {
  return <ClientProfilePage slug="fukuii" />;
}
