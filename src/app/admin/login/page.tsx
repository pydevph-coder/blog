import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

async function loginAction(formData: FormData) {
  "use server";
  const password = formData.get("password");
  const returnTo = (formData.get("returnTo") as string) || "/admin";
  const expected = process.env.ADMIN_PASSWORD || "admin123";

  if (typeof password === "string" && password === expected) {
    const cookieStore = await cookies();
    cookieStore.set("admin", "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    redirect(returnTo);
  }

  redirect(`/admin/login?error=1&returnTo=${encodeURIComponent(returnTo)}`);
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const error = params?.error;
  const returnTo = (params?.returnTo as string) || "/admin";

  return (
    <div className="mx-auto max-w-md py-12">
      <h1 className="text-2xl font-semibold mb-6">Admin Login</h1>
      {error ? (
        <div className="mb-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-red-700">
          Invalid password. Please try again.
        </div>
      ) : null}
      <form action={loginAction} className="space-y-4">
        <input type="hidden" name="returnTo" value={returnTo} />
        <label className="block">
          <span className="block text-sm font-medium mb-1">Password</span>
          <input
            type="password"
            name="password"
            required
            className="w-full rounded border px-3 py-2 bg-white text-black"
            placeholder="Enter admin password"
          />
        </label>
        <button
          type="submit"
          className="inline-flex items-center rounded bg-black px-4 py-2 text-white hover:bg-neutral-800"
        >
          Login
        </button>
      </form>
      <p className="mt-6 text-sm text-neutral-500">
        Lost? Go back to <Link href="/" className="underline">home</Link>.
      </p>
      <p className="mt-2 text-xs text-neutral-400">
        Default admin password (for local/dev): <code>admin123</code>. You can override this by setting <code>ADMIN_PASSWORD</code> in your environment.
      </p>
    </div>
  );
}




