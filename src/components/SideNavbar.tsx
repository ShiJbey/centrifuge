import React from "react";
import {
  FaChartLine,
  FaProjectDiagram,
  FaQuestion,
} from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom';
import styles from "./SideNavbar.module.scss";

const SideNavbar: React.FC = () => {
  return (
    <div className={styles.SideNavBar}>
      <ul className={styles.SideNavBar_Nav}>
        <li className={styles.NavItem}>
          <Link to="/" className={styles.NavLink}>
            <IconContext.Provider value={{className:styles.NavIcon}}>
              <FaChartLine className={styles.NavIcon} />
            </IconContext.Provider>
            <span className={styles.LinkText}>Metrics</span>
          </Link>
        </li>
        <li className={styles.NavItem}>
          <Link to="/editor" className={styles.NavLink}>
            <IconContext.Provider value={{className:styles.NavIcon}}>
              <FaProjectDiagram className={styles.NavIcon} />
            </IconContext.Provider>
            <span className={styles.LinkText}>Patterns</span>
          </Link>
        </li>
        <li className={styles.NavItem}>
          <Link to="/help" className={styles.NavLink}>
            <IconContext.Provider value={{className:styles.NavIcon}}>
              <FaQuestion className={styles.NavIcon} />
            </IconContext.Provider>
            <span className={styles.LinkText}>Help</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNavbar;
