import type { Metadata } from "next";
import { AdminApp } from "@/components/admin/admin-app";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Админка",
    description: "Управление мастер-классами",
    path: "/admin",
    noIndex: true,
  }),
};

export default function AdminPage() {
  return <AdminApp />;
}
