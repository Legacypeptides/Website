import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'warning';
    onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const styles = {
        success: {
            bg: 'bg-green-50 border-green-200',
            text: 'text-green-800',
            icon: <CheckCircle className="text-green-600" size={20} />
        },
        error: {
            bg: 'bg-red-50 border-red-200',
            text: 'text-red-800',
            icon: <XCircle className="text-red-600" size={20} />
        },
        warning: {
            bg: 'bg-yellow-50 border-yellow-200',
            text: 'text-yellow-800',
            icon: <AlertCircle className="text-yellow-600" size={20} />
        }
    };

    const style = styles[type];

    return (
        <div className="fixed top-4 right-4 z-[70] animate-fade-in">
            <div className={`${style.bg} border rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[300px]`}>
                {style.icon}
                <p className={`${style.text} font-medium flex-1`}>{message}</p>
                <button
                    onClick={onClose}
                    className={`${style.text} hover:opacity-70 transition-opacity`}
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};
