import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'

const ProductItem = ({ product, handleCheck }) => {
  const { state, dispatch } = useContext(DataContext)
  const { auth, cart } = state

  const userLink = () => {
    return (
      <>
        <Link href={`/product/${product._id}`}>
          <a className="btn btn-info" style={{ marginRight: '5px', flex: 1 }}>View</a>
        </Link>
        <button
          className="btn btn-success"
          style={{ marginLeft: '5px', flex: 1 }}
          onClick={() => dispatch(addToCart(product, cart))}
          disabled={product.inStock === 0 ? true : false}
        >
          Buy
        </button>
      </>
    )
  }

  const adminLink = () => {
    return (
      <>
        <Link href={`/create/${product._id}`}>
          <a className="btn btn-info" style={{ marginRight: '5px', flex: 1 }}>Edit</a>
        </Link>
        <button
          className="btn btn-danger"
          style={{ marginLeft: '5px', flex: 1 }}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => dispatch({
            type: 'ADD_MODAL',
            payload: [{
              data: '',
              id: product._id,
              title: product.title,
              type: 'DELETE_PRODUCT'
            }]
          })}
        >
          Delete
        </button>
      </>
    )
  }

  if (!auth.user) {
    return null
  }

  return (
    <div className="card" style={{ width: "18rem" }}>
      {auth.user && auth.user.role === 'admin' && (
        <input type="checkbox" checked={product.checked} className="position-asolute"
          style={{ height: '20px', width: '20px'}} onChange={() => handleCheck(product._id)}
        />
      )}
      <img src={product.images[0].url} className="card-img-top" alt={product.images[0].url} />
      <div className="card-body">
        <h5 className="card-title text-capitalize" title={product.title}>{product.title}</h5>
        <div className="d-flex justify-content-between mx-0">
          <h6 className="text-danger">${product.price}</h6>
          {
            (product.inStock > 0)
              ? <h6 className="text-danger">In Stock: {product.inStock}</h6>
              : <h6 className="text-danger">Out Stock</h6>
          }
        </div>
        <p className="card-text" title={product.description}>{product.description}</p>
        <div className="d-flex justify-content-between mx-0">
          {(!auth.user || auth.user.role !== 'admin') ? userLink() : adminLink()}
        </div>
      </div>
    </div>
  )
}

export default ProductItem