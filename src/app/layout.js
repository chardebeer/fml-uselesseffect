import "./globals.css";

export const metadata = {
  title: "useEffect Adventure: Cursed Pastel Quest",
  description: "Interactive demo showcasing common useEffect pitfalls and anti-patterns",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
