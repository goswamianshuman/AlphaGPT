import SessionProvider from "../components/SessionProvider";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Login from "../components/Login";
import ClientProvider from "../components/ClientProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex relative">
              {/* sidebar */}
              <div className="h-screen bg-[#424343]/50 max-w-xs overflow-y-auto md:min-w-[20rem]">
                <Sidebar />
              </div>

              {/* clientProvider - notification */}

              <ClientProvider />

              <div className="bg-[#170113]  flex-1">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
