import { useEffect, useState } from 'react'
import type { Product } from '../types/product'
import { Link } from 'react-router-dom'

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  // useSearchParams
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch products.')
        }
        return res.json()
      })
      .then((data: Product[]) => {
        setProducts(data.slice(0, 30))
      })
      .catch((error) => {
        console.log(error)
        setError('Error loading products.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p className='p-6 text-center'>Loading...</p>
  }

  if (error) {
    return <p className='p-6 text-center text-red-500'>{error}</p>
  }

  const filterProducts = [...products]
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sort === 'asc') {
        return a.price - b.price
      }

      if (sort === 'desc') {
        return b.price - a.price
      }

      return 0
    })

  return (
    <div className='mx-auto max-w-7xl p-6'>
      <h1 className='mb-6 text-4xl font-bold'>Product List</h1>

      {/* Search + Sort */}
      <div className='mb-8 flex flex-col gap-4 md:flex-row'>
        <input
          type='text'
          placeholder='Search product...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500'
        />

        <select
        title='ct'
          name='SortBy'
          id='SortBy'
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className='rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value=''>Default</option>
          <option value='asc'>Price: Low to High</option>
          <option value='desc'>Price: High to Low</option>
        </select>
      </div>

      {/* Products */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4'>
        {filterProducts.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl'
          >
            <div>
              <img
                src={product.images?.[0]}
                alt={product.title}
                className='h-60 w-full object-cover'
              />

              <div className='p-4'>
                <p className='mb-2 text-xl font-bold text-blue-500'>
                  ${product.price}
                </p>

                <h4 className='line-clamp-2 text-lg font-medium text-gray-800'>
                  {product.title}
                </h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
