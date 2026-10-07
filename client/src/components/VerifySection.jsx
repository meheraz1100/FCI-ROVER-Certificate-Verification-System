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
        className="h-12 w-full rounded-lg border border-green-700 bg-[#214b31] pl-11 pr-4 text-sm font-medium tracking-wide text-white placeholder:text-gray-400 outline-none transition duration-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
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
    Example: <span className="font-medium text-yellow-300">FCIRSG-42-001</span>
  </p>
</div>