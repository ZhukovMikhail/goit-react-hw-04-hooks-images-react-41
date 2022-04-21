import { useState } from 'react';
import { StyledSearchBar, StyledForm } from './SearchBar.styled';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { warnNotify } from 'utils/utils';
import 'react-toastify/dist/ReactToastify.css';

export const SearchBar = ({ onQuery }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onInputChange = e => {
    setSearchQuery(e.currentTarget.value);
  };
  const onSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return warnNotify();
    }
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

SearchBar.propTypes = {
  onQuery: PropTypes.func,
};
