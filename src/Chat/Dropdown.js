import React, { useState } from 'react';
import './Dropdown.css';

function Dropdown({ onItemSelected }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = (forceClose = false) => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown">
            <button onClick={toggleDropdown} className="dropdown-toggle">
                Retrieval Method Selection
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <a href="#embedding_retrieval" onClick={() => onItemSelected('embedding_retrieval')}>
                        embedding_retrieval
                    </a>
                    <a href="#prompt_retrieval" onClick={() => onItemSelected('prompt_retrieval')}>
                        prompt_retrieval
                    </a>
                </div>
            )}
        </div>
    );
}

export default Dropdown;
