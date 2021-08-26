import { createContext, useState, useEffect } from 'react'
import { createCheckout, updateCheckout } from '../lib/shopify'

const CartContext = createContext()

export default function ShopProvider({ children }) {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutId, setCheckoutId] = useState('')
  const [checkoutUrl, setCheckoutUrl] = useState('')


  async function addToCart(newItem) {
    if(cart.length === 0) {
      setCart([newItem])

      console.log(newItem)

      const checkout = await createCheckout(newItem.id, newItem.variantQuantity)

      setCheckoutId(checkout.id)
      setCheckoutUrl(checkout.webUrl)

      localStorage.setItem("checkout_id", JSON.stringify([newItem, checkout]))
    } else {
      let newCart = [...cart]

      cart.map(item => {
        if (item.id === newItem.id) {
          item.variantQuantity++
          newCart = [...cart]
        } else {
          newCart = [...cart, newItem]
        }
      })

      setCart(newCart)
      const newCheckout = await updateCheckout(checkoutId, newCart)
      localStorage.setItem("checkout_id", JSON.stringify([newCart, newCheckout]))
    }
  }


  return (
    <CartContext.Provider value={{ 
      cart,
      cartOpen,
      setCartOpen,
      addToCart,
      checkoutUrl
    }}>
      {children}
    </CartContext.Provider>
  )
}

const ShopConsumer = CartContext.Consumer

export { ShopConsumer, CartContext }