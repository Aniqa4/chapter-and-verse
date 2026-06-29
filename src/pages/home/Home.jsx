
import Banner from './Banner'
import FeaturedBooks from './FeaturedBooks'
import CategoriesOfBooks from './CategoriesOfBooks'
import NewArrivals from './NewArrivals'
import BestSellingBooks from './BestSellingBooks'

function Home() {
  return (
    <div>
      <Banner/>
      <FeaturedBooks/>
      <CategoriesOfBooks/>
      <BestSellingBooks/>
      <NewArrivals/>
    </div>
  )
}

export default Home