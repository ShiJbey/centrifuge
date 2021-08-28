import React from "react";
import {
  FaProjectDiagram,
  FaQuestion,
} from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { IconContext } from "react-icons";
import { Link, useLocation } from "react-router-dom";
import styles from "./AppNavbar.module.scss";
import classNames from "classnames";

interface NavLinkInfo {
  icon: JSX.Element;
  router_link: string;
  tooltip: string;
}

const NAV_LINKS: NavLinkInfo[] = [
  {
    icon: <FaProjectDiagram />,
    router_link: "/editor",
    tooltip: "Editor",
  },
  {
    icon: <FaQuestion />,
    router_link: "/help",
    tooltip: "Help",
  },
];

const AppNavbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className={styles.AppNavbar}>
      <ul className={styles.AppNavbarNav}>
        {NAV_LINKS.map((linkInfo, index) => (
          <li key={`${index}_${linkInfo.router_link}`} className={styles.NavItem}>
            <OverlayTrigger
              placement="right"
              delay={{ show: 600, hide: 250 }}
              overlay={(props: any) => <Tooltip {...props}>{linkInfo.tooltip}</Tooltip>}
            >
              <Link
                to={linkInfo.router_link}
                className={classNames(styles.NavLink, {
                  [styles.active]: location.pathname === linkInfo.router_link,
                })}
              >
                {location.pathname === linkInfo.router_link && (
                  <div className={styles.ActiveIndicator}></div>
                )}
                <IconContext.Provider value={{ className: styles.NavIcon }}>
                  {linkInfo.icon}
                </IconContext.Provider>
              </Link>
            </OverlayTrigger>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AppNavbar;
