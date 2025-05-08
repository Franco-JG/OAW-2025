import { useState } from 'react';
import { addFeed } from '../services/api';
import { AddFeedFormProps } from '../types';

const AddFeedForm: React.FC<AddFeedFormProps> = ({onFeedAdded}) => {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addFeed(url);
      setUrl('');
      alert(response);
      onFeedAdded();
    } catch (error) {
      alert('Error al agregar el feed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-feed-form d-flex flex-column gap-3">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="form-control rounded-pill"
        placeholder="URL"
        required
      />
      <button type="submit" className="btn btn-primary rounded-pill py-3">
        Agregar Feed
      </button>
    </form>
  );
};

export default AddFeedForm;
