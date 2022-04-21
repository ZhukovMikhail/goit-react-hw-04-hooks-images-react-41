import { useState } from 'react';
import { StyledSearchBar, StyledForm } from './SearchBar.styled';
import { ImSearch } from 'react-icons/im';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SearchBar = ({ onQuery }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const notify = () =>
    toast.warn(' No data entered', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  const onInputChange = e => {
    setSearchQuery(e.currentTarget.value);
  };
  const onSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return notify();
    }
    console.log('SearchBar-query:', searchQuery);

    onQuery(searchQuery);
  };

  return (
    <StyledSearchBar>
      <ToastContainer />
      <StyledForm onSubmit={onSubmit}>
        <button type="submit">
          <span>Search</span>
          <ImSearch />
        </button>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onInputChange}
          value={searchQuery}
        />
      </StyledForm>
    </StyledSearchBar>
  );
};
