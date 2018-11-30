// @flow
import React from "react";
import Proptypes from "prop-types";
import { FaSearch } from "react-icons/fa";
import type { SearchFormProps } from "../../../types";

const SearchForm = (props: SearchFormProps) => {
  const { onClick, handleChange } = props;
  return (
    <div className="search-form col-lg-8 offset-lg-2">
      <form onSubmit={e => onClick(e)}>
        <div className="input-group">
          <input
            className="form-control"
            placeholder="Search GIF!"
            onChange={e => handleChange(e)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary"
              type="button"
              onClick={e => onClick(e)}
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

SearchForm.propTypes = {
  onClick: Proptypes.func.isRequired,
  handleChange: Proptypes.func.isRequired
};

export default SearchForm;
