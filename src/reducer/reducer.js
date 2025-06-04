import { v4 as uuid } from "uuid";

export const initialState = {
  foodHome: [],
  isSlide: false,
  foodList: [],
  initialPrice: "500",
  showVeg: false,
  showNonVeg: false,
  selectedRating: null,
  sortBy: null,
  inputValue: "",
  isSearchOpen: false,
  category: [],
  showPassword: false,
  showConfirmPassword: false,
  cart: [],
  wishList: [],
  isAdded: false,
  editAddressId: null,
  selectedAddressId: null,
  selectedCategory: [],

  addresses: [
    {
      id: uuid(),
      name: "Narendra Chordiya",
      phone: "800771732",
      city: "Pune",
      pin: "411048",
      profileState: "Maharashtra",
      addressText: " Majestique Navkaar,Kondhwa Bk",
    },
  ],
  demoAddress: [
    {
      id: uuid(),
      name: "John",
      phone: "7898343210",
      city: "Banglore",
      pin: "9844657651",
      addressText: "123 Main St",
      profileState: "Karnataka",
    },
    {
      id: uuid(),
      name: "Alice",
      phone: "987654132",
      city: "Amritsar",
      pin: "54321",
      addressText: "456 Park Ave",
      profileState: "Punjab",
    },
    {
      id: uuid(),
      name: "Michael",
      phone: "7788956470",
      city: "Albany",
      pin: "78910",
      addressText: "789 Rue de la Paix",
      profileState: "New York",
    },
    {
      id: uuid(),
      name: "Sarah",
      phone: "7800843233",
      city: "Glebe ",
      pin: "54321",
      addressText: "321 Beach Rd",
      profileState: "Sydney State",
    },
    {
      id: uuid(),
      name: "David",
      phone: "9876541234",
      city: "Yokohama",
      pin: "12345",
      addressText: "456 Sakura St",
      profileState: "Tokyo State",
    },
  ],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESSFUL_HOME_DATA": {
      return { ...state, foodHome: action.payload };
    }

    case "SIDEBAR_ACTIVE": {
      return { ...state, isSlide: !state.isSlide };
    }

    case "FETCH_SUCCESSFUL_ALL_FOODLIST_DATA": {
      return { ...state, foodList: action.payload };
    }

    case "CHANGING_THE_PRICE": {
      return { ...state, initialPrice: Number(action.payload) };
    }

    case "CHECK_VEG_CATEGORY": {
      return { ...state, showVeg: !state.showVeg };
    }
    case "CHECK_NON_VEG_CATEGORY": {
      return { ...state, showNonVeg: !state.showNonVeg };
    }
    case "SET_SELECTED_RATING": {
      return { ...state, selectedRating: action.payload };
    }
    case "SORT_LOW_TO_HIGH": {
      const sortedFoodList = [...state.foodList].sort(
        (a, b) => a.price - b.price
      );
      return { ...state, foodList: sortedFoodList, sortBy: "lowToHigh" };
    }

    case "SORT_HIGH_TO_LOW": {
      const sortedFoodList = [...state.foodList].sort(
        (a, b) => b.price - a.price
      );
      return { ...state, foodList: sortedFoodList, sortBy: "highToLow" };
    }

    case "ON_CLICKING_CLEAR": {
      return {
        ...state,
        foodHome: [],
        initialPrice: "500",
        showVeg: false,
        showNonVeg: false,
        selectedRating: false,
        sortBy: null,
        selectedCategory: [],
      };
    }

    case "SEARCH_DATA": {
      return {
        ...state,
        inputValue: action.payload,
        isSearchOpen: action.payload.trim() !== "",
      };
    }

    case "CLOSE_SEARCH": {
      return {
        ...state,
        inputValue: "",
        isSearchOpen: false,
      };
    }

    case "SET_SELECTED_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case "ON_CLICKING_CATEGORY": {
      return {
        ...state,
      };
    }

    case "FILTER_BY_CATEGORY":
      const updatedCategory = state.selectedCategory.includes(action.payload)
        ? state.selectedCategory.filter(
            (addedCategory) => addedCategory !== action.payload
          )
        : [...state.selectedCategory, action.payload];

      return { ...state, selectedCategory: updatedCategory };

    case "ON_CLICKING_SHOW_PASSWORD": {
      return {
        ...state,
        showPassword: !state.showPassword,
      };
    }
    case "ON_CLICKING_SHOW_CONFIRM_PASSWORD": {
      return {
        ...state,
        showConfirmPassword: !state.showConfirmPassword,
      };
    }
    case "ADD_TO_CART": {
      return {
        ...state,
        cart: action.payload,
      };
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: action.payload,
      };
    }
    case "ADD_TO_WISHLIST": {
      return {
        ...state,
        wishList: action.payload,
      };
    }
    case "REMOVE_FROM_WISHLIST": {
      return {
        ...state,
        wishList: action.payload,
      };
    }

    case "INCREMENT_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item._id === action.payload) {
            return {
              ...item,
              qty: item.qty + 1,
            };
          }
          return item;
        }),
      };

    case "DECREMENT_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item._id === action.payload) {
            return {
              ...item,
              qty: item.qty > 1 ? item.qty - 1 : 1,
            };
          }
          return item;
        }),
      };

    case "ADDRESS_EDIT_BUTTON_CLICKED":
      return {
        ...state,
        editAddressId: action.payload,
      };

    case "ADD_ADDRESS_BUTTON_CLICKED":
      return {
        ...state,
        isAdded: true,
      };

    case "ADDRESS_CANCEL_BUTTON_CLICKED": {
      console.log(state.isAdded, "cancel");
      console.log(state.editAddressId, "edit");
      return {
        ...state,
        editAddressId: null,
        isAdded: false,
      };
    }

    case "UPDATE_TO_ADDRESS": {
      const updateAddress = state.addresses.map((address) => {
        if (address.id === action.payload.id) {
          return {
            ...address,
            name: action.payload.name,
            phone: action.payload.phone,
            city: action.payload.city,
            pin: action.payload.pin,
            profileState: action.payload.profileState,
            addressText: action.payload.addressText,
          };
        }
        return address;
      });
      return {
        ...state,
        editAddressId: null,
        addresses: updateAddress,
      };
    }

    case "ADD_TO_ADDRESS": {
      console.log(action.payload);
      return {
        ...state,
        isAdded: false,
        addresses: [...state.addresses, action.payload],
      };
    }

    case "ADDRESS_DELETE_BUTTON_CLICKED": {
      const filteredAddresses = state.addresses.filter(
        (address) => address.id !== action.payload
      );
      return {
        ...state,
        addresses: filteredAddresses,
      };
    }

    case "SELECT_ADDRESS": {
      return { ...state, selectedAddressId: action.payload };
    }

    case "CLEAR_CART": {
      return { ...state, cart: [] };
    }
    default:
      return state;
  }
};
