import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const FilterIconButton: React.FC<{ className?: string; onClick: () => void}> = ({ className, onClick }) => {
    return (
        <div className={className}>
            <button onClick={onClick} className="icon-button filter-button">
                <FontAwesomeIcon icon={faFilter} />
            </button>
        </div>
    );
};

export default FilterIconButton;