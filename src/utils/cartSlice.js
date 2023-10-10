import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  // reducers: {
  //   addItem: (state, action) => {
  //     state.items.push(action.payload);
  //   },
  //   removeItem: (state, action) => {
  //     if (items.length > 0) state.items.pop();
  //   },
  //   clearCart: (state) => {
  //     state.items = [];
  //   },
  // },
  reducers: {
    // addItem: (state, action) => {
    //   const itemIndex = state.items.findIndex(
    //     (item) => item.id === action.payload.id
    //   );
    //   if (itemIndex !== -1) {
    //     state.items[itemIndex].count += 1;
    //   } else {
    //     state.items.push({ id: action.payload.id, count: 1 });
    //   }
    // },
    addItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.items[itemIndex].count += 1;
      } else {
        // Add the entire item info and initialize count to 1
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        if (state.items[itemIndex].count > 1) {
          state.items[itemIndex].count -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
