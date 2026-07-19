import { useState } from "react";
import api from "../services/api";

export default function VerifySection() {
  const [certificateId, setCertificateId] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (!certificateId.trim()) {
      alert("Please enter Certificate ID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setCertificate(null);
      const formattedId = certificateId.trim().toUpperCase();

        const res = await api.get(`/certificates/${formattedId}`);

      setCertificate(res.data.data);
    } catch (err) {
      setError("Certificate Not Found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

      <div className="bg-[#3f6e4d] rounded-xl border border-yellow-600 p-10">

        <h2 className="text-3xl font-bold text-center">
          Certificate Verification
        </h2>

        <p className="text-center mt-3 text-gray-200">
          Enter Certificate ID
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

          <input
            type="text"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            placeholder="FCIRSG-42-001"
            className=" flex-1 rounded-lg bg-[#214b31] px-4 outline-emerald-500"
          />
          <button
            onClick={handleVerify}
            className="h-12 rounded-lg bg-yellow-500 px-8 font-bold text-black"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>

        {error && (
          <div className="mt-8 bg-red-600 rounded-lg p-4 text-center">
            ❌ {error}
          </div>
        )}

        {certificate && (

          <div className="mt-8 bg-[#29583b] rounded-xl p-6">

            <h3 className="text-2xl font-bold text-green-400 mb-4">
              ✅ Certificate Verified
            </h3>

            <div className="space-y-2">

              <p>
                <strong>ID:</strong> {certificate.certificateId}
              </p>

              <p>
                <strong>Name:</strong> {certificate.fullName}
              </p>

              <p>
                <strong>Training:</strong> {certificate.trainingName}
              </p>

              <p>
                <strong>Issue Date:</strong>{" "}
                {new Date(certificate.issueDate).toLocaleDateString()}
              </p>

              <p>
                <strong>Status:</strong> {certificate.status}
              </p>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}