import React from 'react';
import { FaChartLine, FaProjectDiagram, FaQuestion, FaVial } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { Link, useLocation } from 'react-router-dom';
import styles from './SideNavbar.module.scss';

const SideNavbar: React.FC = () => {
  const location = useLocation();
  return (
    <div className={styles.SideNavBar}>
      <ul className={styles.SideNavBar_Nav}>
        <li className={styles.NavItem} style={{background: 'rgba(255, 255, 255, 0.137)'}}>
          <div className={styles.AppLogo}>
            <IconContext.Provider value={{ className: styles.NavIcon }}>
              <FaVial className={styles.NavIcon} />
            </IconContext.Provider>
            <span className={styles.LinkText}>Centrifuge</span>
          </div>
        </li>
        <li className={styles.NavItem}>
          <Link to="/editor" className={styles.NavLink}>
            {location.pathname === '/editor' && <div className={styles.ActiveIndicator}></div>}
            <IconContext.Provider value={{ className: styles.NavIcon }}>
              <FaProjectDiagram className={styles.NavIcon} />
            </IconContext.Provider>
            <span className={styles.LinkText}>Editor</span>
          </Link>
        </li>
        <li className={styles.NavItem}>
          <Link to="/metrics" className={styles.NavLink}>
          {location.pathname === '/metrics' && <div className={styles.ActiveIndicator}></div>}
            <IconContext.Provider value={{ className: styles.NavIcon }}>
              <FaChartLine className={styles.NavIcon} />
            </IconContext.Provider>
            <span className={styles.LinkText}>Metrics</span>
          </Link>
        </li>
        <li className={styles.NavItem}>
          <Link to="/help" className={styles.NavLink}>
            {location.pathname === '/help' && <div className={styles.ActiveIndicator}></div>}
            <IconContext.Provider value={{ className: styles.NavIcon }}>
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
