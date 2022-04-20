import React, { Component } from 'react';
import { StyledSearchBar, StyledForm } from './SearchBar.styled';
import { ImSearch } from 'react-icons/im';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class SearchBar extends Component {
  state = {
    query: '',
  };
  notify = () =>
    toast.warn(' No data entered', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  onInputChange = e => {
    this.setState({
      query: e.currentTarget.value,
    });
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      return this.notify();
    }
    this.props.query(this.state.query);
  };
  render() {
    return (
      <StyledSearchBar>
        <ToastContainer />
        <StyledForm onSubmit={this.onSubmit}>
          <button type="submit">
            <span>Search</span>
            <ImSearch />
          </button>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInputChange}
            value={this.state.query}
          />
        </StyledForm>
      </StyledSearchBar>
    );
  }
}
