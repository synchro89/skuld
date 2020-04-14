import React from 'react';

import Drawer from '../Drawer';

function Layout({ children }) {
  return (
    <>
      <Drawer />
      {children}
    </>
  );
}

export default Layout;
