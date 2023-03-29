import css from './ContactList.module.css';

export const ContactList = ({ data, deleteContact }) => {
  return (
    <ul>
      {data.map(({ name, number, id }, i) => {
        return (
          <li key={id}>
            <span>
              {i + 1}.{name}: {number}
            </span>
            <button
              className={css.button}
              type="button"
              onClick={() => deleteContact(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
