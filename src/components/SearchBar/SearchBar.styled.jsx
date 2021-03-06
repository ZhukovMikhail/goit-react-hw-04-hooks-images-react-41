import styled from '@emotion/styled';

export const StyledSearchBar = styled.header`
  position: fixed;
  top: 0;
  display: flex;
  width: 100vw;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  background-color: #3f51b5;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;
export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;

  & input {
    display: inline-block;
    width: 100%;
    font: inherit;
    font-size: 20px;
    border: none;
    outline: none;
    padding-left: 4px;
    padding-right: 4px;
    &::placeholder {
      font: inherit;
      font-size: 18px;
    }
  }
  & button {
    display: block;
    width: 120px;
    height: 48px;
    border: 0;
    opacity: 0.6;
    transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    & span {
      font-size: 18px;
      display: inline-block;
      margin-right: 5px;
    }
    &:hover {
      opacity: 1;
    }
  }
`;
export const Label = styled.label`
  font-size: 20px;
  margin-left: 10px;

  & select {
    margin-left: 10px;
    font-size: 15px;
    width: 40px;
    text-align: center;
    border-radius: 4px;
    border: none;
  }
`;
