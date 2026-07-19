const express = require("express");

const router = express.Router();

const {
  createCertificate,
  getAllCertificates,
  verifyCertificate,
  deleteCertificate,
} = require("../controllers/certificateController");

router.get("/", getAllCertificates);

router.get("/:certificateId", verifyCertificate);

router.post("/", createCertificate);

router.delete("/:id", deleteCertificate);

module.exports = router;