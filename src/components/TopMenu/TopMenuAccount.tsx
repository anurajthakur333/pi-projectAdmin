import React, { useState, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/account.actions";
import { IStateType } from "../../store/models/root.interface";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'; // ✅ Import SweetAlert2

function TopMenuAccount(): JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  const history = useHistory();
  const email: string = useSelector((state: IStateType) => state.account.email);
  const [isShow, setShow] = useState(false);

  function handleLogout() {
    dispatch(logout());
    localStorage.removeItem('adminEmail');

    // ✅ SweetAlert2 Toast
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Logged out successfully!',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });

    setTimeout(() => {
      history.push("/login");
    }, 1000); // Delay to show toast smoothly
  }

  return (
    <li className="nav-item dropdown no-arrow">
      <a className="nav-link dropdown-toggle"
        onClick={() => {
          setShow(!isShow);
        }}
        href="#"
        id="userDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">
        <span className="mr-2 d-none d-lg-inline small cadet">{email}</span>
        <img className="img-profile rounded-circle" alt=""
          src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
      </a>

      <div className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${(isShow) ? "show" : ""}`}
        aria-labelledby="userDropdown">
        <a 
          className="dropdown-item"
          onClick={handleLogout}
          href="#"
        >
          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
          Logout
        </a>
      </div>
    </li>
  );
}

export default TopMenuAccount;
