import React from 'react';

interface DeleteConfirmModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConformModel: React.FC<DeleteConfirmModalProps> = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-lg max-h-[90vh]">
        <h3 className="text-xl font-semibold mb-4 text-center">Delete Job</h3>
        <p className="text-center mb-6">
          Are you sure you want to delete this job? This action cannot be undone.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConformModel;
