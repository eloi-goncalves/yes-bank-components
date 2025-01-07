import React from 'react';
import { DefaultProps } from '../../types/button/DefaultProps';

const InsertTransactionButton: React.FC<DefaultProps> = ({ className, title, action }) => (
    <div className={className}>
        <button className="primary" onClick={action}>
            {title}
        </button>
    </div>
);

export default InsertTransactionButton;
