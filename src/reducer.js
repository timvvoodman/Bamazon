export const initialState = {
  basket: [],
}

//Selector for Basket Total
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0)

const reducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        basket: [...state.basket, action.item],
      }
    case 'REMOVE_FROM_CART':
      //find the index of the cart item clicked
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      )
      let newBasket = [...state.basket]
      if (index >= 0) {
        newBasket.splice(index, 1)
      } else {
        console.warn(`Cannot remove cart Item (id:${action.id}).
        Does not exist in cart.`)
      }
      return {
        ...state,
        basket: newBasket,
      }

    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      }

    default:
      return state
  }
}

export default reducer
