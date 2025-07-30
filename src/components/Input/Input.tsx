import React from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
    error?: string;
    fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
    label,
    icon,
    error,
    fullWidth = false,
    className = '',
    ...props
}) => {
    const wrapperClass = [
        styles.wrapper,
        fullWidth ? styles.fullWidth : '',
        error ? styles.hasError : ''
    ].filter(Boolean).join(' ');

    const inputClass = [
        styles.input,
        icon ? styles.withIcon : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={wrapperClass}>
            {label && (
                <label className={styles.label}>
                    {icon && <span className={styles.labelIcon}>{icon}</span>}
                    {label}
                </label>
            )}
            <div className={styles.inputWrapper}>
                {icon && <span className={styles.icon}>{icon}</span>}
                <input className={inputClass} {...props} />
            </div>
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};