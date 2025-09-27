// components/DeleteButton.js
'use client'

import { deletePost } from '../../actions'
import { useState } from 'react'

export default function DeleteButton({ postId }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deletePost(postId);
    setIsDeleting(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`text-red-500 hover:text-red-700 transition-colors ${isDeleting ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  )
}