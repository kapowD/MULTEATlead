import React from 'react';
import styles from './Textarea.module.scss';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
    label,
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

    const textareaClass = [
        styles.textarea,
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={wrapperClass}>
            {label && (
                <label className={styles.label}>
                    {label}
                </label>
            )}
            <textarea className={textareaClass} {...props} />
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};