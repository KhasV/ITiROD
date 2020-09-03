import React from 'react';
import cx from 'classnames';
import './style.scss'

export const Container = ({ children, flex }) => {
    return <main>
        <div className={cx({ "container": true , flex })}>
            {children}
        </div>
    </main>;
}