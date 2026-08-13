import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/Layout'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import DisclosurePage from '@/pages/DisclosurePage'
import CategoryPage from '@/pages/CategoryPage'
import ReviewDetailPage from '@/pages/ReviewDetailPage'
import GuidesPage from '@/pages/GuidesPage'
import GuideDetailPage from '@/pages/GuideDetailPage'
import ComparisonsPage from '@/pages/ComparisonsPage'
import EditorialTeamPage from '@/pages/EditorialTeamPage'
import MethodologyPage from '@/pages/MethodologyPage'
import PrivacyPage from '@/pages/PrivacyPage'
import NotFoundPage from '@/pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          {/* Bare hubs redirect to their main category (content lives there today) */}
          <Route path="/reviews" element={<Navigate to="/reviews/software" replace />} />
          <Route path="/comparisons" element={<Navigate to="/comparisons/software" replace />} />
          {/* /reviews/:slug = category listing page (e.g. /reviews/software) */}
          <Route path="/reviews/:slug" element={<CategoryPage />} />
          {/* /reviews/:category/:slug = individual review article */}
          <Route path="/reviews/:category/:slug" element={<ReviewDetailPage />} />
          {/* /comparisons/:slug = per-category comparison table page */}
          <Route path="/comparisons/:slug" element={<ComparisonsPage />} />
          {/* /comparisons/:category/:slug = comparison article detail */}
          <Route path="/comparisons/:category/:slug" element={<ReviewDetailPage comparison />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/guides/:slug" element={<GuideDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/disclosure" element={<DisclosurePage />} />
          <Route path="/editorial-team" element={<EditorialTeamPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
