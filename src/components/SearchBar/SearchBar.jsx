import { useState } from 'react';
import { StyledSearchBar, StyledForm, Label } from './SearchBar.styled';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { warnNotify } from 'utils/utils';
import 'react-toastify/dist/ReactToastify.css';

export const SearchBar = ({ onQuery, onOption }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [option, setOption] = useState(10);

  const onChangeOption = e => {
    setOption(e.target.value);
  };
  const onChangeInput = e => {
    setSearchQuery(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return warnNotify();
    }
    onQuery(searchQuery);
    onOption(option);
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
          name="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChangeInput}
          value={searchQuery}
        />
      </StyledForm>
      <Label>
        images per page
        <select name="option" value={option} onChange={onChangeOption}>
          images per page
          <option defaultValue value="10">
            10
          </option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </Label>
    </StyledSearchBar>
  );
};

SearchBar.propTypes = {
  onQuery: PropTypes.func,
};
