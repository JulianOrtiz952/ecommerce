import { useEffect, useState } from 'react'
import { axiosEcommerce } from '../../utils/configAxios'
import ProductsCard from '../home/ProductsCard'

const SimilarProducts = ({categoryId, productId}) => {

    const [similarProducts, setSimilarProducts] = useState([])

    useEffect(() => {
       if (categoryId) {
        axiosEcommerce.get(`products?categoryId=${categoryId}`)
        .then(res => 
            {   
                const otherProducts = res.data.filter(product => product.id !== productId)
                setSimilarProducts(otherProducts)
            })
        .catch(err => console.log(err))
       }
    }, [categoryId, productId])

  return (
    <section className='px-2'>
        <h2 className='text-[#f3739b] font-bold text-lg mb-6'>Discover similar items</h2>

        <section className='grid gap-6 sm:grid-cols-2 sm:items-center max-w-[1000px] mx-auto'>
            {
                similarProducts.map(product => <ProductsCard key={product.id} product={product} />)
            }
        </section>

    </section>
  )
}

export default SimilarProducts