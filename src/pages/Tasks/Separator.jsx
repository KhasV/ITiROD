import React from 'react';

export const Separator = ({ title, children }) => {
    return <div className="separator">
        <div className="title">{title}</div><hr />
        <div className="list">{children}</div>
    </div>;
}