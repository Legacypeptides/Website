import React, { useState, useEffect } from 'react';

interface EditableContentProps {
  content: string;
  onSave: (content: string) => void;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  isEditable?: boolean;
}

export const EditableContent: React.FC<EditableContentProps> = ({
  content,
  onSave,
  className = '',
  multiline = false,
  placeholder = 'Click to edit...',
  isEditable = true
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  useEffect(() => {
    setEditContent(content);
  }, [content]);

  const handleSave = () => {
    onSave(editContent);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditContent(content);
      setIsEditing(false);
    }
  };

  if (!isEditable) {
    return <div className={className}>{content || placeholder}</div>;
  }
  if (isEditing) {
    return multiline ? (
      <textarea
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`w-full p-2 border-2 border-blue-400 rounded resize-none bg-white text-gray-900 ${className}`}
        placeholder={placeholder}
        rows={4}
        autoFocus
      />
    ) : (
      <input
        type="text"
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`w-full p-2 border-2 border-blue-400 rounded bg-white text-gray-900`}
        placeholder={placeholder}
        autoFocus
      />
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`cursor-text hover:bg-white hover:bg-opacity-10 rounded transition-colors p-1 ${isEditable ? 'border-2 border-transparent hover:border-blue-400' : ''} ${className}`}
    >
      {content || <span className="text-gray-400">{placeholder}</span>}
    </div>
  );
};