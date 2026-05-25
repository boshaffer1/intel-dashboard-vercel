export const metadata = {
  title: 'Intel Dashboard - Secure',
  description: 'Campaign Intelligence Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
        {children}
      </body>
    </html>
  )
}