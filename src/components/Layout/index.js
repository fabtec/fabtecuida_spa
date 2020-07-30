import React, { useContext } from 'react';
import {
  Container,
} from 'react-bootstrap';

import { AppContext } from '../../context/AppContext';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

export default function Layout({ children }) {
  const { isSidebarOpen } = useContext(AppContext);
  const showSidebarClassname = isSidebarOpen
    ? 'd-flex'
    : 'd-flex toggled';
  return (
    <div className={showSidebarClassname} id="wrapper">
      <Sidebar />
      <div id="page-content-wrapper">
        <Navbar />
        <Container className="mt-4 mb-4">
          { children }
        </Container>
      </div>
    </div>
  )
}