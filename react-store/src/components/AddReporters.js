import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const AddReporters = ({ displayForm, toggleForm, handleAddAppointment }) => {
  const [reporterData, setReporterData] = useState({
    name: "",
    channel: "",
    notes: "",
    date: "",
    image: ""
  });
  const handleReporterData = e => {
    const value = e.target.value;
    const name = e.target.name;
    setReporterData({
      ...reporterData,
      [name]: value
    });
  };
  const handleAdd = e => {
    e.preventDefault();
    handleAddAppointment(reporterData);
    setReporterData({ name: "", channel: "", notes: "", date: "", image: "" });
    toggleForm();
  };
  return (
    <form onSubmit={handleAdd}>
      {displayForm ? (
        <div>
          <button
            className="btn btn-secondary btn-block my-3"
            onClick={() => toggleForm()}
          >
            <FaMinus /> Add reporter
          </button>
          <fieldset className="form-group">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Enter Name"
                name="name"
                value={reporterData.name}
                onChange={e => handleReporterData(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Enter Channel"
                name="channel"
                value={reporterData.channel}
                onChange={e => handleReporterData(e)}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                name="notes"
                id=""
                cols="30"
                rows="4"
                placeholder="Enter Notes"
                value={reporterData.notes}
                onChange={e => handleReporterData(e)}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="date"
                name="date"
                value={reporterData.date}
                onChange={e => handleReporterData(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="url"
                name="image"
                placeholder="Add Reporters Image URL"
                value={reporterData.file}
                onChange={e => handleReporterData(e)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </div>
          </fieldset>
        </div>
      ) : (
        <button
          className="btn btn-secondary btn-block my-3"
          onClick={() => toggleForm()}
        >
          <FaPlus /> Add reporter
        </button>
      )}
    </form>
  );
};

export default AddReporters;
