import { useState } from "react";
import api from "../services/api";

export default function AddCertificateForm({
  onClose,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    certificateId: "",
    fullName: "",
    trainingName: "",
    issueDate: "",
    status: "Valid",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/certificates", formData);

      alert("Certificate Added Successfully");

      onSuccess();
      onClose();

    } catch (error) {
      alert(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-[#2c5a3b] rounded-xl w-full max-w-xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          Add New Certificate
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            name="certificateId"
            placeholder="Certificate ID"
            className="w-full p-3 rounded bg-[#1d412b]"
            onChange={handleChange}
          />

          <input
            name="fullName"
            placeholder="Full Name"
            className="w-full p-3 rounded bg-[#1d412b]"
            onChange={handleChange}
          />

          <select
            name="trainingName"
            value={formData.trainingName}
            onChange={handleChange}
            className="w-full p-3 rounded bg-[#1d412b]"
          >
            <option value="">Select Training</option>

            <option value="Annual Camp & Initiation Ceremony 2026">
              Annual Camp & Initiation Ceremony 2026
            </option>
            <option value="Typhoid Conjugated Vaccine (TCV) Campaign 2025">
              Typhoid Conjugated Vaccine (TCV) Campaign 2025
            </option>
            <option value="Final Scouting Certificate - Batch - 18">
              Final Scouting Certificate - Batch - 18
            </option>



          </select>

          <input
            type="date"
            name="issueDate"
            className="w-full p-3 rounded bg-[#1d412b]"
            onChange={handleChange}
          />

          <select
            name="status"
            className="w-full p-3 rounded bg-[#1d412b]"
            onChange={handleChange}
          >
            <option value="Valid">Valid</option>
            <option value="Revoked">Revoked</option>
          </select>

          <div className="flex gap-4 pt-4">

            <button
              type="submit"
              className="flex-1 bg-green-600 py-3 rounded font-bold"
            >
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-red-600 py-3 rounded font-bold"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}