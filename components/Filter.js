import React, {useState, useEffect} from 'react'
import filterSearch from '../utils/filterSearch'
import { useRouter } from 'next/router'

const Filter = ({state}) => {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')
  const [category, setCategory] = useState('')

  const { categories } = state
  const router = useRouter()

  useEffect(() => {
    filterSearch({router, search: search ? search.toLowerCase() : 'all'})
  }, [search])

  const handleCategory = (e) => {
    setCategory(e.target.value)
    filterSearch({router, category: e.target.value})
  }

  const handleSort = (e) => {
    setSort(e.target.value)
    filterSearch({router, sort: e.target.value})
  }

  return (
    <div className="input-group">
      <select className="form-select text-capitalize"
        value={category} onChange={handleCategory}
      >
        <option value="all">All Products</option>
        {categories.map(item => (
          <option key={item._id} value={item._id}>{item.name}</option>
        ))}
      </select>

      <input type="text" className="form-control" list="title_product" 
        value={search.toLowerCase()} onChange={e => setSearch(e.target.value)}
      />
      {/* <datalist id="title_product">
        <option value="name">Title Name</option>
      </datalist>

      <button className="position-absolute btn btn-info" type="submit"
        style={{ top: 0, right: 0, visibility: 'hidden'}}
      >
        Search
      </button> */}

      <select className="form-select text-capitalize"
        value={sort} onChange={handleSort}
      >
        <option value="-createAt">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="-sold">Best sales</option>
        <option value="-price">Price: High-Low</option>
        <option value="price">Price: Low-High</option>
      </select>
    </div>
  )
}

export default Filter