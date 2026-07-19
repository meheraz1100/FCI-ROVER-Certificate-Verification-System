import { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import AddCertificateForm from "./AddCertificateForm";

export default function Dashboard({ onLogout }) {
  const [certificates, setCertificates] = useState([]);
const [loading, setLoading] = useState(true);
const [showForm, setShowForm] = useState(false);

// ✅ Data fetching logic আলাদা
const fetchCertificates = useCallback(async () => {
  setLoading(true);
  try {
    const res = await api.get("/certificates");
    setCertificates(res.data.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}, []); // dependencies empty কারণ API call fixed

useEffect(() => {
  fetchCertificates();
}, [fetchCertificates]); // ✅ dependency-তে রাখো

  if (loading) {
    return (
      <h2 className="text-center text-xl text-white">
        Loading Certificates...
      </h2>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          📜 All Certificates
        </h2>

      </div>

      <div className="overflow-x-auto bg-[#3f6e4d] rounded-xl border border-yellow-600">

        <table className="w-full">

          <thead className="bg-[#5d7540]">

            <tr>

              <th className="p-4 text-left">ID</th>

              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Cer. Name</th>

              <th className="p-4 text-left">Date</th>


            </tr>

          </thead>

          <tbody>

            {certificates.map((certificate) => (

              <tr
                key={certificate._id}
                className="border-t border-green-700"
              >

                <td className="p-4">
                  {certificate.certificateId}
                </td>

                <td className="p-4">
                  {certificate.fullName}
                </td>

                <td className="p-4">
                  {certificate.trainingName}
                </td>

                <td className="p-4">
                  {new Date(
                    certificate.issueDate
                  ).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="text-center mt-8 space-x-4">
<button
  onClick={() => setShowForm(true)}
  className="bg-yellow-500 text-black px-5 py-3 rounded-lg font-bold"
>
  + Add New Certificate
</button>
        <button
          onClick={onLogout}
          className="bg-red-500 px-8 py-3 rounded-lg font-bold"
        >
          Logout
        </button>

      </div>
{showForm && (
  <AddCertificateForm
    onClose={() => setShowForm(false)}
    onSuccess={fetchCertificates}
  />
)}
    </div>
    
  );
}