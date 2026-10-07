import { useEffect, useState, useCallback, useMemo } from "react";
import api from "../services/api";
import AddCertificateForm from "./AddCertificateForm";

export default function Dashboard({ onLogout }) {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Filter states
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // =========================
  // Fetch Certificates
  // =========================
  const fetchCertificates = useCallback(async () => {
    setLoading(true);

    try {
      const res = await api.get("/certificates");
      setCertificates(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch certificates:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  // =========================
  // Filter + Sort
  // =========================
  const filteredCertificates = useMemo(() => {
    let result = [...certificates];

    // Search
    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter((certificate) => {
        return (
          certificate.certificateId
            ?.toLowerCase()
            .includes(query) ||
          certificate.fullName
            ?.toLowerCase()
            .includes(query) ||
          certificate.trainingName
            ?.toLowerCase()
            .includes(query)
        );
      });
    }

    // Sort by issue date
    result.sort((a, b) => {
      const dateA = new Date(a.issueDate).getTime();
      const dateB = new Date(b.issueDate).getTime();

      return sortOrder === "newest"
        ? dateB - dateA
        : dateA - dateB;
    });

    return result;
  }, [certificates, search, sortOrder]);

  // =========================
  // Pagination
  // =========================
  const totalPages = Math.ceil(
    filteredCertificates.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentCertificates = filteredCertificates.slice(
    startIndex,
    endIndex
  );

  // Search/filter change করলে page 1 এ যাবে
  useEffect(() => {
    setCurrentPage(1);
  }, [search, itemsPerPage, sortOrder]);

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <h2 className="text-xl font-semibold text-white">
          Loading Certificates...
        </h2>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8">

      {/* =========================
          Header
      ========================= */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            📜 All Certificates
          </h2>

          <p className="mt-1 text-sm text-green-100">
            {filteredCertificates.length} certificate
            {filteredCertificates.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="w-full rounded-lg bg-yellow-500 px-5 py-3 font-bold text-black transition hover:bg-yellow-400 sm:w-auto"
        >
          + Add New Certificate
        </button>

      </div>

      {/* =========================
          Filters
      ========================= */}
      <div className="mb-6 rounded-xl border border-yellow-600 bg-[#3f6e4d] p-4">

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* Search */}
          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-semibold text-white">
              Search Certificate
            </label>

            <div className="relative">

              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                🔎
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by ID, name or training..."
                className="w-full rounded-lg border border-green-700 bg-white px-10 py-3 text-sm text-gray-900 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30"
              />

            </div>

          </div>

          {/* Sort */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-white">
              Sort By
            </label>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full rounded-lg border border-green-700 bg-white px-3 py-3 text-sm text-gray-900 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30"
            >
              <option value="newest">
                Newest First
              </option>

              <option value="oldest">
                Oldest First
              </option>
            </select>

          </div>

        </div>

        {/* Clear Filter */}
        {(search || sortOrder !== "newest") && (
          <div className="mt-4">

            <button
              onClick={() => {
                setSearch("");
                setSortOrder("newest");
              }}
              className="text-sm font-semibold text-yellow-300 hover:text-yellow-200"
            >
              ✕ Clear Filters
            </button>

          </div>
        )}

      </div>

      {/* =========================
          Certificate Table
      ========================= */}
      <div className="overflow-hidden rounded-xl border border-yellow-600 bg-[#3f6e4d]">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead className="bg-[#5d7540]">

              <tr>

                <th className="whitespace-nowrap p-4 text-left text-sm font-bold">
                  ID
                </th>

                <th className="whitespace-nowrap p-4 text-left text-sm font-bold">
                  Name
                </th>

                <th className="whitespace-nowrap p-4 text-left text-sm font-bold">
                  Certificate Name
                </th>

                <th className="whitespace-nowrap p-4 text-left text-sm font-bold">
                  Issue Date
                </th>

              </tr>

            </thead>

            <tbody>

              {currentCertificates.length > 0 ? (

                currentCertificates.map((certificate) => (

                  <tr
                    key={certificate._id}
                    className="border-t border-green-700 transition hover:bg-[#4b7a58]"
                  >

                    <td className="whitespace-nowrap p-4 text-sm">
                      {certificate.certificateId}
                    </td>

                    <td className="p-4 text-sm font-medium">
                      {certificate.fullName}
                    </td>

                    <td className="p-4 text-sm">
                      {certificate.trainingName}
                    </td>

                    <td className="whitespace-nowrap p-4 text-sm">
                      {new Date(
                        certificate.issueDate
                      ).toLocaleDateString("en-GB")}
                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    className="px-4 py-12 text-center"
                  >

                    <div className="text-4xl">
                      🔍
                    </div>

                    <p className="mt-3 font-semibold text-white">
                      No certificates found
                    </p>

                    <p className="mt-1 text-sm text-green-100">
                      Try a different search term.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =========================
          Pagination
      ========================= */}
      {filteredCertificates.length > 0 && (

        <div className="mt-5 flex flex-col gap-4 rounded-xl border border-yellow-600 bg-[#3f6e4d] p-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Results info */}
          <div className="text-center text-sm text-green-100 sm:text-left">

            Showing{" "}
            <span className="font-bold text-white">
              {startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold text-white">
              {Math.min(
                endIndex,
                filteredCertificates.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-bold text-white">
              {filteredCertificates.length}
            </span>

          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center gap-2">

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.max(prev - 1, 1)
                )
              }
              disabled={currentPage === 1}
              className="rounded-lg border border-yellow-600 px-3 py-2 text-sm font-semibold transition hover:bg-yellow-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Prev
            </button>

            {/* Page Numbers */}
            <div className="hidden items-center gap-1 sm:flex">

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (

                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${
                    currentPage === page
                      ? "bg-yellow-500 text-black"
                      : "border border-yellow-600 hover:bg-yellow-500 hover:text-black"
                  }`}
                >
                  {page}
                </button>

              ))}

            </div>

            {/* Mobile Page Indicator */}
            <span className="px-2 text-sm font-semibold sm:hidden">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
              disabled={currentPage === totalPages}
              className="rounded-lg border border-yellow-600 px-3 py-2 text-sm font-semibold transition hover:bg-yellow-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next →
            </button>

          </div>

          {/* Items Per Page */}
          <div className="flex items-center justify-center gap-2 sm:justify-end">

            <span className="text-sm text-green-100">
              Show
            </span>

            <select
              value={itemsPerPage}
              onChange={(e) =>
                setItemsPerPage(Number(e.target.value))
              }
              className="rounded-lg border border-green-700 bg-white px-2 py-2 text-sm text-gray-900 outline-none focus:border-yellow-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>

          </div>

        </div>

      )}

      {/* =========================
          Logout
      ========================= */}
      <div className="mt-8 text-center">

        <button
          onClick={onLogout}
          className="rounded-lg bg-red-500 px-8 py-3 font-bold transition hover:bg-red-600"
        >
          Logout
        </button>

      </div>

      {/* =========================
          Add Certificate Modal
      ========================= */}
      {showForm && (
        <AddCertificateForm
          onClose={() => setShowForm(false)}
          onSuccess={fetchCertificates}
        />
      )}

    </div>
  );
}