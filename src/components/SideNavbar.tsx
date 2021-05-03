import React from 'react'
import styled from 'styled-components';

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
`;

const SideNavbar: React.FC = () => {
  return (
    <SideNavBar>
      <SideNavBar_Nav>

      </SideNavBar_Nav>
    </SideNavBar>
  );
};

export default SideNavbar
