import { type Metadata } from "next";
import { ContactListView } from "@/components/dashboard/contact/ContactListView";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact Enquiries",
  path: "/dashboard/contact",
  noIndex: true,
});

export default function DashboardContactPage() {
  return <ContactListView />;
}
