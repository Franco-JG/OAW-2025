import React, { useState } from "react";
import { updateNews } from "../services/api.ts";
import { UpdateNewsButtonProps } from "../types.ts";

const UpdateNewsButton: React.FC<UpdateNewsButtonProps> = ({onFetchNews}) => {
  const [showModal, setShowModal] = useState(false);

  const handleUpdateNews = async () => {
    await updateNews();
    onFetchNews();
    setShowModal(true); // Muestra el modal después de actualizar las noticias
  };

  return (
    <>
      <button className="btn btn-primary rounded-3 shadow-sm" onClick={handleUpdateNews}>
        Update News
      </button>
      {showModal && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Noticias Actualizadas</h5>
              </div>
              <div className="modal-body">
                <p>Las noticias han sido actualizadas correctamente.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-close"
                  onClick={() => setShowModal(false)}
                >
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default UpdateNewsButton;
