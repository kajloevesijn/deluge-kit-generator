import React, { useState } from "react";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown dropdown-hover">
      <label tabIndex={0} className="btn m-1 ">
        Click
      </label>

      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50"
      >
        <li className="z-50">
          <a className="z-50">Item 1</a>
        </li>
        <li className="z-50">
          <a className="z-50">Item 2</a>
        </li>
      </ul>
    </div>
  );
}

export default Dropdown;
