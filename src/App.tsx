import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import SolutionsIndex from '@/pages/solutions/SolutionsIndex'
import CarbonOffsets from '@/pages/solutions/CarbonOffsets'
import CommunitySolar from '@/pages/solutions/CommunitySolar'
import ReverseAuction from '@/pages/solutions/ReverseAuction'
import EnergyStar from '@/pages/solutions/EnergyStar'
import EfficientCars from '@/pages/solutions/EfficientCars'
import EnerFusion from '@/pages/solutions/EnerFusion'
import XLHybrids from '@/pages/solutions/XLHybrids'
import QCoefficient from '@/pages/solutions/QCoefficient'
import CommunitiesIndex from '@/pages/communities/CommunitiesIndex'
import CreateCommunity from '@/pages/communities/CreateCommunity'
import TrackerApp from '@/pages/communities/TrackerApp'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import Newsletters from '@/pages/Newsletters'
import ProductsCorner from '@/pages/ProductsCorner'
import TechnologyCorner from '@/pages/TechnologyCorner'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

        <Route path="solutions">
          <Route index element={<SolutionsIndex />} />
          <Route path="carbon-offsets" element={<CarbonOffsets />} />
          <Route path="community-solar" element={<CommunitySolar />} />
          <Route path="reverse-auction" element={<ReverseAuction />} />
          <Route path="energy-star" element={<EnergyStar />} />
          <Route path="efficient-cars" element={<EfficientCars />} />
          <Route path="enerfusion" element={<EnerFusion />} />
          <Route path="xl-hybrids" element={<XLHybrids />} />
          <Route path="qcoefficient" element={<QCoefficient />} />
        </Route>

        <Route path="communities">
          <Route index element={<CommunitiesIndex />} />
          <Route path="create" element={<CreateCommunity />} />
          <Route path="app" element={<TrackerApp />} />
        </Route>

        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="newsletters" element={<Newsletters />} />
        <Route path="products-corner" element={<ProductsCorner />} />
        <Route path="technology-corner" element={<TechnologyCorner />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
