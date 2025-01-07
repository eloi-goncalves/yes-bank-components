import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const FilterIconButton:  React.FC<{ className?: string;}> = ({ className }) => {
    return (
        <div className={className}>
            <button 
                className="icon-button">
                <FontAwesomeIcon icon={faFilter} />
            </button>
        </div>
    );
};

export default FilterIconButton;