import React from 'react';
// import { FaCopy, FaCut, FaPaste, FaTimes, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

const ContextMenuContainer = styled.div`
	position: absolute;
	top: 0px;
	left: 0px;
	z-index: 100;
	width: 300px;
	background-color: var(--bg);
	border: var(--border);
	border-radius: var(--border-radius);
	padding: 1rem;
	overflow: hidden;
	transition: height var(--speed) ease;
`;

const Menu = styled.div`
	width: 100%;
`;

const MenuItem = styled.div`
	height: 50px;
	display: flex;
	align-items: center;
	border-radius: var(--border-radius);
	transition: background var(--speed);
	padding: 0.5rem;
`;

// .menu-item .icon-button {
//   margin-right: 0.5rem;
// }

// .menu-item .icon-button:hover {
//   filter: none;
// }

// .menu-item:hover {
//   background-color: #525357;
// }

// .icon-right {
//   margin-left: auto;
// }

// /* CSSTransition classes  */
// .menu-primary-enter {
//   position: absolute;
//   transform: translateX(-110%);
// }
// .menu-primary-enter-active {
//   transform: translateX(0%);
//   transition: all var(--speed) ease;
// }
// .menu-primary-exit {
//   position: absolute;
// }
// .menu-primary-exit-active {
//   transform: translateX(-110%);
//   transition: all var(--speed) ease;
// }

// .menu-secondary-enter {
//   transform: translateX(110%);
// }
// .menu-secondary-enter-active {
//   transform: translateX(0%);
//   transition: all var(--speed) ease;
// }
// .menu-secondary-exit {

// }
// .menu-secondary-exit-active {
//   transform: translateX(110%);
//   transition: all var(--speed) ease;
// }

const ContextMenu = () => {
	return (
		<ContextMenuContainer>
			<Menu>
				<MenuItem>{/* <FaCut /> Cut */}</MenuItem>
			</Menu>
		</ContextMenuContainer>
	);
};

export default ContextMenu;

// {/* <MenuItem>
//         <FaCut /> Cut
//       </MenuItem>
//       <MenuItem>
//         <FaCopy /> Copy
//       </MenuItem>
//       <MenuItem>
//         <FaPaste /> Paste
//       </MenuItem>
//       <MenuItem>
//         <FaTrash /> Delete
//       </MenuItem>
//       <hr>
//       <MenuItem>
//         {/* <Refresh /> Reload */}
//         </MenuItem>
//         <MenuItem >
//           <FaTimes /> Exit
//         </MenuItem> */}
