import React, { useState, useRef } from 'react';
import { GripVertical, Edit3, Save, X } from 'lucide-react';

interface EditableSection {
  id: string;
  type: 'hero' | 'feature' | 'product' | 'contact' | 'about';
  content: any;
  order: number;
}

interface DragDropEditorProps {
  sections: EditableSection[];
  onSectionsChange: (sections: EditableSection[]) => void;
  onEdit: (sectionId: string) => void;
}

export const DragDropEditor: React.FC<DragDropEditorProps> = ({
  sections,
  onSectionsChange,
  onEdit
}) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent, sectionId: string) => {
    setDraggedItem(sectionId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = sections.findIndex(s => s.id === draggedItem);
    const targetIndex = sections.findIndex(s => s.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newSections = [...sections];
    const [draggedSection] = newSections.splice(draggedIndex, 1);
    newSections.splice(targetIndex, 0, draggedSection);

    // Update order
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index
    }));

    onSectionsChange(updatedSections);
    setDraggedItem(null);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  if (!isEditing) {
    return (
      <button
        onClick={toggleEditMode}
        className="fixed top-4 right-4 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-2"
      >
        <Edit3 size={16} />
        Edit Mode
      </button>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Edit Mode - Drag sections to reorder</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleEditMode}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Save size={16} />
            Save & Exit
          </button>
          <button
            onClick={toggleEditMode}
            className="text-gray-600 hover:text-gray-800 p-2"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
        {sections.map((section) => (
          <div
            key={section.id}
            draggable
            onDragStart={(e) => handleDragStart(e, section.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, section.id)}
            className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-move hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <GripVertical size={20} className="text-gray-400" />
              <div>
                <h4 className="font-medium text-gray-800 capitalize">{section.type} Section</h4>
                <p className="text-sm text-gray-600">Order: {section.order + 1}</p>
              </div>
            </div>
            <button
              onClick={() => onEdit(section.id)}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Edit3 size={14} />
              Edit Content
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};