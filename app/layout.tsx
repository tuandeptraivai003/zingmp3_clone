import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import MainContainer from "@/components/MainContainer";
import SupabaseProvider from '../providers/SupabaseProvider';
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToastProvider from "@/providers/ToastProvider";


const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800", "900"], 
});

export const metadata: Metadata = {
  title: "Zing Mp3",
  description: "Zing Mp3 - Nghe nhạc mới, Hot nhất và tải nhạc miễn phí",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ToastProvider/>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider/>
            <MainContainer>{children}</MainContainer>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
