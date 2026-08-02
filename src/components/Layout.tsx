import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import CookieBanner from './CookieBanner'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}
