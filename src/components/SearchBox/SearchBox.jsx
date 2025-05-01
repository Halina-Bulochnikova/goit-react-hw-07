import React from "react";
import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";



const SearchBox = () => {

  const filter = useSelector((state) => state.filters.name);
  const dispatch = useDispatch();

  const onFilterChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.searchBlock}>
      <label className={css.searchLabel}>
        Find contacts by name:
        <input
          className={css.searchField}
          type="text"
          value={filter}
          onChange={onFilterChange}
        />
      </label>
    </div>
  );
};
export default SearchBox;
