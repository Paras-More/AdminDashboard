import React, { useState, useEffect } from "react";
import formatToDateTimeLocal from "../../Utils/formatToDateTimeLocal";
import handleSaveRow from "../../Utils/handleSaveRow";
import getTableData from "../../Utils/getTableData";
const ApiForm = ({ formData, handleSaveRow }) => {
  const [currentFormData, setCurrentFormData] = useState(formData || {});

  useEffect(() => {
    if (formData) setCurrentFormData(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log("did reached");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle submit called");

    console.log("Form Data Submitted:", currentFormData);
    let { ID, Expiry, Username, Status, BroadcastAllowed, InteractiveAllowed } =
      currentFormData;
    console.log("current form data", currentFormData);

    let obj = {
      ID: ID,
      Expiry: Expiry,
      Username: Username,
      Status: Status,
      BroadcastAllowed: BroadcastAllowed,
      InteractiveAllowed: InteractiveAllowed,
    };
    console.log("obj", obj);

    handleSaveRow(obj.ID, obj);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation(); // Prevents clicks inside the form from closing modal
        console.log("Inside form clicked"); // Debug
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white text-black rounded-lg w-full max-w-xl mx-auto h-screen flex flex-col justify-center"
      >
        <label className="block mb-2">ID:</label>
        <input
          type="text"
          name="ID"
          value={currentFormData?.ID || ""}
          disabled
          className="w-full p-2 rounded bg-orange-200"
        />

        <label className="block mb-2">Username:</label>
        <input
          type="text"
          name="Username"
          value={currentFormData?.Username || ""}
          disabled
          className="w-full p-2 rounded bg-orange-200"
        />

        <label className="block mt-4 mb-2">App Name:</label>
        <input
          type="text"
          name="AppName"
          value={currentFormData?.AppName || ""}
          disabled
          className="w-full p-2 rounded bg-orange-200"
        />

        <label className="block mt-4 mb-2">API Key:</label>
        <input
          type="text"
          name="APIKey"
          value={currentFormData?.APIKey || ""}
          disabled
          className="w-full p-2 rounded bg-orange-200"
        />

        <label className="block mt-4 mb-2">Expiry Date:</label>
        <input
          type="datetime-local"
          name="Expiry"
          value={
            currentFormData?.Expiry
              ? formatToDateTimeLocal(currentFormData.Expiry)
              : ""
          }
          onChange={handleChange}
          className="w-full p-2 rounded bg-orange-200"
        />

        <label className="block mt-4 mb-2">Status:</label>
        <select
          name="Status"
          value={currentFormData?.Status || ""}
          onChange={handleChange}
          className="w-full p-2 rounded bg-orange-200"
        >
          <option value="ACTIVE">Active</option>
          <option value="EXPIRED">Expired</option>
          <option value="PENDING">Pending</option>
          <option value="SUSPENDED">Suspended</option>
        </select>

        <div className="mt-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="InteractiveAllowed"
              checked={currentFormData?.InteractiveAllowed || false}
              onChange={handleChange}
              className="mr-2"
            />
            Interactive Allowed
          </label>
        </div>

        <div className="mt-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="BroadcastAllowed"
              checked={currentFormData?.BroadcastAllowed || false}
              onChange={handleChange}
              className="mr-2"
            />
            Broadcast Allowed
          </label>
        </div>

        <label className="block mt-4 mb-2">Webhook URL:</label>
        <input
          type="text"
          disabled
          name="WebhookURL"
          value={currentFormData?.WebhookURL || ""}
          // onChange={handleChange}
          className="w-full p-2 rounded bg-orange-200"
        />

        <button
          type="submit"
          className="mt-4 w-full p-2 bg-[#F5821F] text-white rounded hover:bg-opacity-75"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ApiForm;
