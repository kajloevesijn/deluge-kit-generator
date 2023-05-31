import React, { useState } from "react"; 
import ReactDOM from "react-dom";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected,setSelected] = useState("Categories");

  const toggleOpen = () => setIsOpen(!isOpen);

  const portalRoot = document.getElementById('portal-root');

  // Make sure portalRoot is not null before rendering the portal
  if (portalRoot === null) {
    return null;  // Or return some sort of error message or fallback component
  }

  return ReactDOM.createPortal(
    <div className="dropdown dropdown-hover" style={{ position: 'absolute' }}>
      <label tabIndex={0} className="btn m-1 ">
        {selected}
      </label>

      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50"
      >
        <li className="z-50">
          <a className="z-50">Drums</a>
        </li>
        <li className="z-50">
          <a className="z-50">FX</a>
        </li>
      </ul>
    </div>,
    portalRoot // This will now always be an Element, never null
  );
}

export default Dropdown;