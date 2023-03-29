import css from './Filter.module.css';

export const Filter = ({ handleFilter }) => {
  return (
    <input
      className={css.input}
      type="text"
      name="filter"
      onChange={e => handleFilter(e.currentTarget.value)}
    />
  );
};
