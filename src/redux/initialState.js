export const initialState = {
  products: {
    data: [],
    oneProduct: {},
    loading: {
      active: false,
      error: false,
    },
  },
  cart: [],
  modal: false,
  user: {
    data: {
      logged: false,
      email: '',
      id: '',
      name: ''
    },
    loading: {
      active: false,
      error: false,
    },
  }
}