import { useState } from "react";
import api from "../services/api";

export default function VerifySection() {
  const [certificateId, setCertificateId] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (!certificateId.trim()) {
      setError("Please enter a Certificate ID.");
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
      console.error(err);
      setError("Certificate Not Found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-xl border border-yellow-600 bg-[#3f6e4d] p-6 sm:p-10">

        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          Certificate Verification
        </h2>

        <p className="mt-3 text-center text-gray-200">
          Enter your certificate ID to verify its authenticity.
        </p>

        {/* Verification Input */}
        <div className="mt-8">
          <label
            htmlFor="certificate-id"
            className="mb-2 block text-sm font-semibold text-white"
          >
            Certificate ID
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">

              {/* Search Icon */}
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m2.35-5.65a8 8 0 11-16 0 8 8 0 0116 0z"
                  />
                </svg>
              </div>

              <input
                id="certificate-id"
                type="text"
                value={certificateId}
                onChange={(e) =>
                  setCertificateId(e.target.value.toUpperCase())
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleVerify();
                  }
                }}
                placeholder="Enter certificate ID"
                autoComplete="off"
                spellCheck="false"
                className="h-12 w-full rounded-lg border border-green-700 bg-[#214b31] pl-11 pr-11 text-sm font-medium tracking-wide text-white placeholder:text-gray-400 outline-none transition duration-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
              />

              {/* Clear Button */}
              {certificateId && (
                <button
                  type="button"
                  onClick={() => {
                    setCertificateId("");
                    setCertificate(null);
                    setError("");
                  }}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 transition hover:text-white"
                  aria-label="Clear certificate ID"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={handleVerify}
              disabled={loading}
              className="h-12 rounded-lg bg-yellow-500 px-8 font-bold text-black transition duration-200 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-[#3f6e4d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify Certificate"}
            </button>
          </div>

          <p className="mt-2 text-xs text-gray-300">
            Example:{" "}
            <span className="font-medium text-yellow-300">
              FCIRSG-42-001
            </span>
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-lg border border-red-400/30 bg-red-600/90 p-4 text-center text-sm font-medium text-white">
            ❌ {error}
          </div>
        )}

        {/* Certificate Result */}
        {certificate && (
          <div className="mt-8 rounded-xl border border-green-400/20 bg-[#29583b] p-6">

            <h3 className="mb-5 text-xl font-bold text-green-400 sm:text-2xl">
              ✅ Certificate Verified
            </h3>

            <div className="space-y-3 text-sm sm:text-base">

              <p>
                <strong>ID:</strong>{" "}
                {certificate.certificateId}
              </p>

              <p>
                <strong>Name:</strong>{" "}
                {certificate.fullName}
              </p>

              <p>
                <strong>Training:</strong>{" "}
                {certificate.trainingName}
              </p>

              <p>
                <strong>Issue Date:</strong>{" "}
                {new Date(
                  certificate.issueDate
                ).toLocaleDateString("en-GB")}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="font-semibold text-green-400">
                  {certificate.status}
                </span>
              </p>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}
