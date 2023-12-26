export default {
  // Auth
  auth: {
    login_admin: {
      url: "auth",
      method: "POST",
    },
    login_consumer: {
      url: "consumer-signin",
      method: "POST",
    },
  },
  consumerContract: {
    create: {
      url: "consumer-contract",
      method: "POST",
      isAuthenticated: true,
    },
    readLoggedinApplication: {
      url: "consumer-contract",
      method: "GET",
      isAuthenticated: true,
    },
    updateLoggedinApplication: {
      url: "consumer-contract",
      method: "PATCH",
      isAuthenticated: true,
    },
    readApplications: {
      url: "consumer-contract/list",
      method: "GET",
      isAuthenticated: true,
      params: {
        query: "",
      },
    },
    delete: {
      url: "consumer-contract/",
      method: "DELETE",
      isAuthenticated: true,
      params: {
        delete_pdfs: "",
      },
    },
    read: {
      url: "consumer-contract/",
      method: "GET",
      isAuthenticated: true,
    },
    update: {
      url: "consumer-contract/",
      method: "PUT",
      isAuthenticated: true,
    },
    changePassword: {
      url: "consumer-contract/change_password",
      method: "PUT",
      isAuthenticated: true,
    },
  },
  nursingAssessment: {
    create: {
      url: "nursing-assessment",
      method: "POST",
      isAuthenticated: true,
    },
    read: {
      url: "nursing-assessment/",
      method: "GET",
      isAuthenticated: true,
    },
    update: {
      url: "nursing-assessment/",
      method: "PUT",
      isAuthenticated: true,
    },
    list: {
      url: "nursing-assessment/list",
      method: "GET",
      isAuthenticated: true,
      params: {
        query: "",
      },
    },
  },
  discharge: {
    create: {
      url: "discharge",
      method: "POST",
      isAuthenticated: true,
    },
  },
  patientEmergency: {
    create: {
      url: "patient-emergency",
      method: "POST",
      isAuthenticated: true,
    },
    readLoggedIn: {
      url: "patient-emergency",
      method: "GET",
      isAuthenticated: true,
    },
    list: {
      url: "patient-emergency/list",
      method: "GET",
      isAuthenticated: true,
      params: {
        query: "",
      },
    },
    read: {
      url: "patient-emergency/",
      method: "GET",
      isAuthenticated: true,
    },
    update: {
      url: "patient-emergency/",
      method: "PUT",
      isAuthenticated: true,
    },
  },
  planOfCare: {
    create: {
      url: "plan-of-care",
      method: "POST",
      isAuthenticated: true,
    },
    readLoggedIn: {
      url: "plan-of-care",
      method: "GET",
      isAuthenticated: true,
    },
    list: {
      url: "plan-of-care/list",
      method: "GET",
      isAuthenticated: true,
      params: {
        query: "",
      },
    },
    read: {
      url: "plan-of-care/",
      method: "GET",
      isAuthenticated: true,
    },
    update: {
      url: "plan-of-care/",
      method: "PUT",
      isAuthenticated: true,
    },
  },
  generatePDF: {
    url: "generate-pdf/",
    method: "GET",
    isAuthenticated: true,
  },
  savePDF: {
    url: "generate-pdf/save-pdf",
    method: "POST",
    isAuthenticated: true,
    params: {
      cell: "",
    },
  },
  listPDFs: {
    url: "generate-pdf/list",
    method: "GET",
    isAuthenticated: true,
    params: {
      cell: "",
    },
  },
  sendEmail: {
    url: "send-email",
    method: "POST",
    isAuthenticated: true,
    params: {
      query: "",
      application_phone_no: "",
    },
  },
  fax: {
    create: {
      url: "fax",
      method: "POST",
      isAuthenticated: true,
    },
    sendFax: {
      url: "https://api2.westfax.com/REST/Fax_SendFax/json",
      method: "POST",
      headers: {
        ContentType: "multipart/form-data",
      },
    },
    getFaxDocs: {
      url: "https://api2.westfax.com/REST/Fax_GetFaxDocuments/json",
      method: "POST",
      headers: {
        ContentType: "multipart/form-data",
      },
    },
  },
};
