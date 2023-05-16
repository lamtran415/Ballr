import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import './SearchBar.css'
import { loadAllSearchThunk } from "../../../store/searchReducer";
import { getAllPhotosThunk } from "../../../store/photoReducer";

const SearchBar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [searchInput, setSearchInput] = useState('')
  const allPhotos = useSelector(state => state.photos.allPhotos)
  const allPhotosArray = Object.values(allPhotos)

  const searchedPhoto = allPhotosArray.filter(photo => {
    if (searchInput == '') {
      return
    } else {
      if (photo.title.toLowerCase().includes(searchInput.toLowerCase())) {
        return photo.title
      }
    }
  })

  const slicedSearchedPhoto = searchedPhoto.slice(0,10)

  const handleSearch = async (e) => {
    e.preventDefault()

      return await dispatch(loadAllSearchThunk(searchInput))
      .then(() => localStorage.setItem('searchData', JSON.stringify(searchedPhoto)))
      .then(() => history.push(`/search/${searchInput}`))
      .then(() => setSearchInput(''))
  }


  return (
    <div>
      <div>
        <form onSubmit={handleSearch}>
          <div className='search-bar-container'>
            <button className='search-icon' type="submit"><i className="fa fa-search"></i></button>
            <input className='search-bar' type='text' placeholder="Photos, people, or groups" value={searchInput} onChange={e => setSearchInput(e.target.value)}/>
          </div>
        </form>
      </div>
      <div>
        <div className="search-bar-list-items">
        { slicedSearchedPhoto.map(photo =>
          <div className='search-list-item'
          key={photo.id}
          onClick={() => {
          history.push(`/photos/${photo.id}`);
          setSearchInput('');
          }}>
          {photo.title}
          </div>
)}
        </div>
      </div>
    </div>
  )
}

export default SearchBar;
