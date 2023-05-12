import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProductToCart } from '../../store/slices/cart.slice'

const ProductsCard = ({product}) => {

    const dispatch = useDispatch()

    const handleClickAddProduct = (e) => {
        e.preventDefault()
        dispatch(addProductToCart({productId: product.id, quantity: 1}))
    }

  return (
    <Link 
      to={`/products/${product.id}`} 
      className='border-[1px] border-gray-300 rounded-md'
      >
        <div className='p-4 border-b-[1px] border-gray-300 h-[200px] overflow-hidden bg-white'>
            <img className='h-full w-full object-contain' src={product.images[0].url} alt="" />
        </div>
        <section className='p-4 relative bg-purple-200'>
            <h4 className='text-gray-400 font-bold'>{product.brand}</h4>
              <h3 className='font-bold text-sm ml-2'>{product.title}</h3>

            <h4 className='text-gray-400 font-bold mt-4'>Price</h4>
              <span className='font-bold text-sm ml-2'>{product.price}</span>

              <button onClick={handleClickAddProduct} className='absolute righ-4 bottom-4 bg-red-500 p-2 text-white rounded-full text-xl w-[45px] aspect-square hover:bg-[#e95e8a] transition-colors' ><i className='bx bx-cart'></i></button>
        </section>
    </Link>
  )
}

export default ProductsCard