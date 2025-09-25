export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-black text-white font-bold">Movie Aggregator</header>
      <main className="p-6">{children}</main>
    </div>
  )
}
