import React from 'react';
import { Modal } from './Modal';
import { Button } from '../Forms/Button/Button';

export const ModalWindow = ({ title, children, isOpen, onClose, onSubmit }) => {
    return <>
        {isOpen && <Modal onClose={onClose}>
            <div className="modal-window" onClick={e => e.stopPropagation()}>
                <section className="title">
                    {title}
                </section>                    
                {children}
                <section className="controls">
                    <Button color="blue" borderless onClick={onClose}>Cancel</Button>
                    <Button color="blue" borderless onClick={onSubmit}>Ok</Button>
                </section>
            </div>
        </Modal>}
    </>
};