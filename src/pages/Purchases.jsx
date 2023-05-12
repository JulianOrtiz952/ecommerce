import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosEcommerce, getConfig } from '../utils/configAxios'
import PurchaseCart from '../components/purchases/PurchaseCart'

const Purchases = () => {
  const [purchases, setPurchases] = useState([])

  useEffect(() => {
   
    axiosEcommerce
      .get("purchases", getConfig())
      .then((res) => {
        const orderedPurchases = res.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setPurchases(orderedPurchases)})
      .catch((err) => console.log(err))
  }, []);


  return (
    <main className='px-2 max-w-[1000px] mx-auto'>
      <section className='flex gap-2 items-center my-2'>
        <Link to="/">Home</Link>
        <div className='aspect-square h-[5px] bg-[#f3739b] rounded-full'></div>
        <span className='font-bold'>Purchases</span>
      </section>

      <section className='grid gap-10 py-6 bg-white rounded-2xl'>
        {
          purchases.map(purchase => <PurchaseCart key={purchase.id} purchase={purchase} /> )
        }
      </section>
    </main>
  )
}

export default Purchases