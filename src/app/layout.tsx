import Provider from "@/components/layout/Provider";
import { GlobalStyle } from "@/styles/GlobalStyle";
import FooterPlayer from "@/components/audio/FooterPlayer";
import { Noto_Sans_KR } from "next/font/google";

export const metadata = {
  title: "VoiceHub",
  description: "VoiceHub",
};

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      
      <body className={notoSansKr.className}>
        <Provider>
          <GlobalStyle />
          {/* <RecoilRoot> */}
          {children}
          <FooterPlayer />
          {/* </RecoilRoot> */}
        </Provider>
      </body>
    </html>
  );
}
