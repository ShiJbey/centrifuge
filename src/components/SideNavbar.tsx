import React from 'react'
import styled from 'styled-components';
import { FaBars, FaChartLine, FaProjectDiagram } from 'react-icons/fa';
import styles from './SideNavbar.module.scss';

const textPrimaryColor = '#b6b6b6';
const textSecondaryColor = '#ececec';
const bgPrimaryColor = '#23232e';
const bgSecondaryColor = '#141418';

const SideNavBar = styled.nav`
  font-size: 16px;
  font-family: 'Open Sans';
  width: 5rem;
  height: 100vh;
  position: fixed;
  background-color: ${bgPrimaryColor};
`;

const SideNavBar_Nav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const NavItem = styled.li`
  
`;

const SideNavbar: React.FC = () => {
  return (
    <SideNavBar>
      <SideNavBar_Nav>
        <NavItem>
          <FaChartLine style={{width: '3rem', height: '3rem'}} />
          <span className={styles.LinkText}>Metrics</span>
        </NavItem>
        <NavItem>
          <FaProjectDiagram />
          <span className={styles.LinkText}>Patterns</span>
        </NavItem>
      </SideNavBar_Nav>
    </SideNavBar>
  );
};

export default SideNavbar
