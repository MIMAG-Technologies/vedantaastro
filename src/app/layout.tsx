import { AuthProvider } from '@/context/AuthContext'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}