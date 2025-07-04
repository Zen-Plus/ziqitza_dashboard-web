import React from 'react';
import Logo from '../../../../components/Logo';


function Header() {
  return (
    <div className="Header_Wrapper">
      <div className="Header container">
        <div className="row d-flex justify-content-between">
          <div className="col-sm-4 col-md-3 col-4 d-flex justify-content-between p-2">
            <Logo src="/upNhmDashboard/up-nrhm-logo.png" className="img img-responsive Header_Logo" />
            <Logo src="/upNhmDashboard/up-cm-pic.png" className="img img-responsive Header_Logo" />
          </div>
          <div className="col-3 p-2 d-flex justify-content-end">
            <Logo src="/upNhmDashboard/up-govt-logo.png" className="img img-responsive Header_Logo" />
          </div>
        </div>
      </div>
    </div>
  );
}


export default Header;

