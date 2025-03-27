import css from "./Navigation.module.css";
import clsx from "clsx";
import { NavLink } from "react-router";

const getLinkStyle = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <ul className={css.list}>
          <li>
            <NavLink to="/" className={getLinkStyle}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={getLinkStyle}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
