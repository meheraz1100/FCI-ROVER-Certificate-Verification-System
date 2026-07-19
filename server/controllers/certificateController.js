const Certificate = require("../models/Certificate");

const createCertificate = async (req, res) => {
  try {
    const {
      certificateId,
      fullName,
      trainingName,
      issueDate,
      status,
    } = req.body;

    // Duplicate Check
    const exists = await Certificate.findOne({ certificateId });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Certificate ID already exists",
      });
    }

    const certificate = await Certificate.create({
      certificateId,
      fullName,
      trainingName,
      issueDate,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Certificate Added Successfully",
      data: certificate,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


const verifyCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const certificate = await Certificate.findOne({
      certificateId,
    });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    const certificate = await Certificate.findById(id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate Not Found",
      });
    }

    await Certificate.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Certificate Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createCertificate,
  getAllCertificates,
  verifyCertificate,
  deleteCertificate,
};