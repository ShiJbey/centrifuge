import React from 'react';
import { FaChartLine, FaProjectDiagram, FaQuestion } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { Link, useLocation } from 'react-router-dom';
import styles from './AppNavbar.module.scss';
import classNames from 'classnames';

const AppNavbar: React.FC = () => {
  const location = useLocation();
  return (
    <nav className={styles.AppNavbar}>
      <ul className={styles.AppNavbarNav}>
        {/* <li className={styles.Logo}>
          <div className={styles.NavLink}>
          <span className={classNames(styles.LinkText, styles.LogoText)}>Centrifuge</span>
            <IconContext.Provider value={{ className: styles.NavIcon }}>
              <FaVial />
            </IconContext.Provider>
          </div>
        </li> */}
        <li className={styles.NavItem}>
          <Link to="/editor" className={classNames(styles.NavLink, { [styles.active]: location.pathname === '/editor'})}>
            {location.pathname === '/editor' && <div className={styles.ActiveIndicator}></div>}
            <IconContext.Provider value={{ className: styles.NavIcon }}>
              <FaProjectDiagram />
            </IconContext.Provider>
            <span className={styles.LinkText}>Editor</span>
          </Link>
        </li>
        <li className={styles.NavItem}>
          <Link to="/metrics" className={classNames(styles.NavLink, { [styles.active]: location.pathname === '/metrics'})}>
          {location.pathname === '/metrics' && <div className={styles.ActiveIndicator}></div>}
            <IconContext.Provider value={{ className: styles.NavIcon }}>
              <FaChartLine />
            </IconContext.Provider>
            <span className={styles.LinkText}>Metrics</span>
          </Link>
        </li>
        <li className={styles.NavItem}>
          <Link to="/help" className={classNames(styles.NavLink, { [styles.active]: location.pathname === '/help'})}>
            {location.pathname === '/help' && <div className={styles.ActiveIndicator}></div>}
            <IconContext.Provider value={{ className: styles.NavIcon }}>
              <FaQuestion />
            </IconContext.Provider>
            <span className={styles.LinkText}>Help</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AppNavbar;
