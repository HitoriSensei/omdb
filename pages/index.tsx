import { VendorGetStaticProps } from 'vendor/utils/VendorGetStaticProps'
import SearchPage from 'pages/search/[query]'

const PagesIndex = SearchPage

export const getStaticProps = VendorGetStaticProps(async () => ({
  props: {},
}))

export default PagesIndex
