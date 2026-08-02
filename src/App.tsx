import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import DisclosurePage from '@/pages/DisclosurePage'
import GuestbookPage from '@/pages/GuestbookPage'
import CategoryPage from '@/pages/CategoryPage'
import ReviewDetailPage from '@/pages/ReviewDetailPage'
import EditorialTeamPage from '@/pages/EditorialTeamPage'
import PrivacyPage from '@/pages/PrivacyPage'
import NotFoundPage from '@/pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/reviews/:slug" element={<ReviewDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/disclosure" element={<DisclosurePage />} />
          <Route path="/guestbook" element={<GuestbookPage />} />
          <Route path="/editorial-team" element={<EditorialTeamPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
