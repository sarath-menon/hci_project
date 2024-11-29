import { contacts, type Contact } from "@/lib/data";
import PageLayout from "@/components/page-layout";
import { Header } from "@/components/Header";
import Link from "next/link";

function ContactList({
  title,
  contacts,
}: {
  title: string;
  contacts: Contact[];
}) {
  return (
    <div className="bg-white rounded-lg">
      <div className="px-4 py-2 bg-gray-50/80">
        <h2 className="text-sm font-semibold text-gray-500">{title}</h2>
      </div>
      <div>
        {contacts.map((contact) => (
          <Link
            href={`/call?name=${encodeURIComponent(contact.name)}`}
            key={contact.id}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 active:bg-gray-50 hover:bg-gray-50">
              <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {contact.initial}
                </span>
              </div>
              <span className="text-base font-medium text-gray-900">
                {contact.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const familyContacts = contacts.filter(function (contact) {
    return contact.category === "family";
  });
  const friendContacts = contacts.filter(function (contact) {
    return contact.category === "friends";
  });

  return (
    <div className="flex flex-col h-full">
      <Header heading="Contacts" />

      <PageLayout>
        <div className="flex-1 overflow-hidden">
          <div className="h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="space-y-6 py-4">
              <ContactList title="Family" contacts={familyContacts} />
              <ContactList title="Friends" contacts={friendContacts} />
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}
