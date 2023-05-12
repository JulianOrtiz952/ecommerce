import React, { useEffect, useMemo, useState } from 'react'
import ProductsCard from '../components/home/ProductsCard'
import { axiosEcommerce } from '../utils/configAxios'

const Home = () => {

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [productName, setProductName] = useState("")
  const [currentCategory, setCurrentCategory] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    const newProductName = e.target.productName.value
    setProductName(newProductName)
  }

  const productsByName = useMemo(() => {
    return products.filter((product) => product.title.toLowerCase().includes(productName.toLocaleLowerCase()))
  }, [productName, products])

  const handleClickCategory = (e) => {
    setCurrentCategory(Number(e.target.dataset.category)) 
  }

  useEffect(() => {
    axiosEcommerce
      .get("categories")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if(currentCategory === 0){
      
      axiosEcommerce
        .get('products')
        .then(res => setProducts(res.data))
        .catch(err => console.log(err))
    }
  },[currentCategory])

  useEffect(() => {
    
    if(currentCategory !== 0 ) {
      axiosEcommerce
      .get(`products?categoryId=${currentCategory}`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err))
    }
  },[currentCategory])

  return (
    <main className='px-2'>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-center p-2 gap-2 text-xl'>
          <input className='px-2' id='productName' type="text" placeholder='What are you looking for?' />
          <button><i className='bx bx-search-alt-2' ></i></button>
        </div>

        <ul className='grid gap-3  grid-cols-2 sm:grid-cols-5'>
          <li className='cursor-pointer bg-purple-200 p-3 rounded-2xl' onClick={handleClickCategory} data-category={0}>All</li>
          {
            categories.map(category => 
            <li className='cursor-pointer bg-purple-200 p-3 rounded-2xl ' onClick={handleClickCategory} data-category={category.id} key={category.id}>{category.name}</li>)
          }
        </ul>

      </form>

      <section className=' py-6 grid gap-6 sm:grid-cols-2 sm:items-center max-w-[1000px] mx-auto'>
        {
          productsByName.map(product => <ProductsCard key={product.id} product={product} /> )
        }
      </section>


    </main>
  )
}

export default Home