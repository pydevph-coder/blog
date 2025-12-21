import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/tracking";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function markAsRead(id: string) {
  "use server";
  const cookieStore = await cookies();
  if (cookieStore.get("admin")?.value !== "1") {
    redirect("/admin/login");
  }

  await prisma.contactSubmission.update({
    where: { id },
    data: { read: true },
  });

  await createAuditLog("update", "contact", id, "Marked contact submission as read");
  redirect("/admin/contacts");
}

async function deleteContact(id: string) {
  "use server";
  const cookieStore = await cookies();
  if (cookieStore.get("admin")?.value !== "1") {
    redirect("/admin/login");
  }

  await prisma.contactSubmission.delete({ where: { id } });
  await createAuditLog("delete", "contact", id, "Deleted contact submission");
  redirect("/admin/contacts");
}

export default async function ContactsPage() {
  const contacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Contact Messages</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border ${
                contact.read
                  ? "border-gray-200 dark:border-gray-700"
                  : "border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20"
              } p-6`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {contact.name}
                    </h3>
                    {!contact.read && (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{contact.email}</p>
                  {contact.subject && (
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">
                      Subject: {contact.subject}
                    </p>
                  )}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(contact.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{contact.message}</p>
              </div>

              <div className="flex gap-2">
                {!contact.read && (
                  <form action={markAsRead.bind(null, contact.id)}>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Mark as Read
                    </button>
                  </form>
                )}
                <a
                  href={`mailto:${contact.email}${contact.subject ? `?subject=Re: ${encodeURIComponent(contact.subject)}` : ""}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Reply
                </a>
                <form action={deleteContact.bind(null, contact.id)}>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}

          {contacts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">No messages yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Contact form submissions will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

