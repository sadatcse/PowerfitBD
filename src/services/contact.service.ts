import "server-only";
import Contact, { type ContactDocument } from "@/models/Contact";
import { createCrudService } from "./crud.service";

export interface ContactPublic {
  _id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied" | "archived";
  createdAt: string;
  updatedAt: string;
}

export const contactService = createCrudService<ContactDocument, ContactPublic>({
  model: Contact,
  resourceName: "Contact submission",
  searchFields: ["fullName", "email", "subject"],
  sortFields: ["createdAt", "fullName", "email", "status"],
  defaultSortBy: "createdAt",
});
