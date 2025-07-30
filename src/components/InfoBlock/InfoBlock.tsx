import React from 'react';
import styles from './InfoBlock.module.scss';

interface InfoBlockProps {
    title?: string;
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'error';
}

export const InfoBlock: React.FC<InfoBlockProps> = ({
    title,
    children,
    variant = 'default'
}) => {
    const blockClass = [
        styles.infoBlock,
        styles[variant]
    ].filter(Boolean).join(' ');

    return (
        <div className={blockClass}>
            {title && <h4 className={styles.title}>{title}</h4>}
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};