import { useEffect, useState } from 'react'
import type { Product } from '../types/product'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch products.')
        }
        return res.json()
      })
      .then((data: Product) => {
        setProduct(data)
      })
      .catch((error) => {
        console.log(error)
        setError('Error loading products.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <p className='p-6 text-center'>Loading...</p>
  }

  if (error) {
    return <p className='p-6 text-center text-red-500'>{error}</p>
  }

  if (!product) {
    return <p className='p-6 text-center'>Product not found.</p>
  }

  return (
    <div className='mx-auto max-w-6xl p-6'>
      {/* Breadcrumb */}
      <div className='mb-6 flex items-center gap-2 text-sm text-gray-500'>
        <Link to='/' className='hover:text-blue-500'>
          Products
        </Link>

        <span>/</span>

        <span className='text-gray-800'>{product.title}</span>
      </div>

      {/* Title */}
      <h1 className='mb-8 text-3xl font-bold'>Product Detail</h1>

      {/* Product */}
      <div className='grid grid-cols-1 gap-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md md:grid-cols-2'>
        {/* Image */}
        <div>
          <img
            src={product.images[0]}
            alt={product.title}
            className='h-[450px] w-full rounded-lg object-cover'
          />
        </div>

        {/* Info */}
        <div className='flex flex-col'>
          <h2 className='mb-4 text-3xl font-bold text-gray-800'>
            {product.title}
          </h2>

          <p className='mb-4 text-2xl font-bold text-red-500'>
            ${product.price}
          </p>

          <p className='mb-4'>
            <span className='font-semibold text-gray-700'>Category:</span>{' '}
            <span className='text-gray-600'>{product.category.name}</span>
          </p>

          <div>
            <span className='font-semibold text-gray-700'>Description:</span>

            <p className='mt-2 leading-7 text-gray-600'>
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button
        type='button'
        onClick={() => navigate(-1)}
        className='mt-8 rounded-lg bg-blue-500 px-5 py-3 font-medium text-white transition hover:bg-blue-600'
      >
        Back
      </button>
    </div>
  )
}
