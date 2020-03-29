import React from "react";
import { FaCut } from "react-icons/fa";

const Reporter = ({ reporter, handleDeleteReporter, updateReporter }) => {
  const { channel, name, notes, date, image, id } = reporter;
  return (
    <div className="col-12 col-lg-6 mb-3">
      <div className="card h-100">
        <div className="card-header">
          <h1
            contentEditable
            suppressContentEditableWarning
            onBlur={e => updateReporter("name", e.target.innerText, id)}
          >
            {name}
          </h1>
        </div>
        <div className="card-body mx-auto pb-0">
          <img
            src={image}
            alt={name}
            className="img-fluid rounded img-reporter"
          />
        </div>
        <div className="card-footer position-relative">
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={e => updateReporter("channel", e.target.innerText, id)}
          >
            {channel}
          </p>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={e => updateReporter("notes", e.target.innerText, id)}
          >
            {notes}
          </p>
          <p>
            <small>Date: {date}</small>
          </p>
          <button
            className="btn btn-danger position-absolute btn-delete"
            onClick={() => handleDeleteReporter(reporter)}
          >
            <FaCut />
          </button>
        </div>
      </div>
    </div>
  );
};

const ListReporters = ({ reporters, handleDeleteReporter, updateReporter }) => {
  if (!reporters) return;
  return (
    <>
      {reporters.map(reporter => (
        <Reporter
          key={reporter.id}
          reporter={reporter}
          handleDeleteReporter={handleDeleteReporter}
          updateReporter={updateReporter}
        />
      ))}
    </>
  );
};

export default ListReporters;
