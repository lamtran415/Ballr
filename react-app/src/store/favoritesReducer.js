const GET_USER_FAVORITES = "favorites/GET_USER_FAVORITES";
const ADD_USER_FAVORITES = "favorites/ADD_USER_FAVORITES";
const DELETE_USER_FAVORITES = "favorites/DELETE_USER_FAVORITES";

// Action Creators
const loadFavoritesForUser = (favorites) => ({
  type: GET_USER_FAVORITES,
  favorites,
});

const addNewFavorite = (favorite, photo) => ({
  type: ADD_USER_FAVORITES,
  favorite,
  photo
});

const deleteUserFavorite = (favoriteId) => ({
  type: DELETE_USER_FAVORITES,
  favoriteId,
});

// Thunks
export const getUserFavoritesThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/photos/users/${userId}/favorites`);

  if (res.ok) {
    const favoritesFromUser = await res.json();
    dispatch(loadFavoritesForUser(favoritesFromUser));
    return favoritesFromUser;
  }

  return res;
};


export const createUserFavoritesThunk = (userId, photoId) => async (dispatch) => {
    const res = await fetch(`/api/photos/users/${userId}/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photoId }),
    });

    if (res.ok) {
      const { favorite, photo } = await res.json();
      dispatch(addNewFavorite(favorite, photo));
      return favorite;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."]
    }

    return res;
  };

const initialState = {};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_FAVORITES: {
        const getAllFavoritesState = {};
        getAllFavoritesState[action.favorites.id] = action.favorites;
        return getAllFavoritesState;
    }
    case ADD_USER_FAVORITES: {
        const addUserFavorites = {...state}
        addUserFavorites[action.favorite.id].photos.push(action.photo);
        return addUserFavorites
    }
    default: {
      return state;
    }
  }
};

export default favoritesReducer;
