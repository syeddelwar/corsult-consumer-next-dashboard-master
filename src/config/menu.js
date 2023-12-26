import routes from "./routes.js";

export default {
  admin: [
    {
      text: "Dashboard",
      route: routes.dashboard,
      icon: "fa-dashboard",
    },
    {
      text: "Consumer Contract",
      route: routes.consumerContract,
      icon: "fa-solid fa-pen",
      isAdminOnly: true,
    },
    {
      text: "Nursing Assessment",
      route: routes.nursingAssessment,
      icon: "fa-solid fa-book",
    },
    {
      text: "Discharge/Transfer",
      route: routes.discharge,
      icon: "fa-solid fa-check",
    },
    {
      text: "Plan Of Care",
      route: routes.planOfCare,
      icon: "fa-solid fa-hospital",
    },
    {
      text: "Patient Emergency",
      route: routes.patientEmergency,
      icon: "fa-solid fa-triangle-exclamation",
    },
    {
      text: "Fax",
      route: routes.fax,
      icon: "fa-solid fa-print",
    },
    {
      text: "Generate PDF",
      route: routes.generatePDF,
      icon: "fa-solid fa-file",
    },
  ],
  aid: [
    {
      text: "Plan Of Care",
      route: routes.planOfCareForAid,
      icon: "fa-solid fa-hospital",
    },

    {
      text: "Patient Emergency",
      route: routes.patientEmergencyForAid,
      icon: "fa-solid fa-triangle-exclamation",
    },
  ],
  consumer: [
    {
      text: "Dashboard",
      route: routes.consumerApplication,
      icon: "fa-dashboard",
    },
    {
      text: "Application",
      route: routes.consumerApplicationLoggedInApplication,
      icon: "fa-solid fa-pen",
    },
    {
      text: "Change Password",
      route: routes.changeConsumerPassword,
      icon: "fa-solid fa-lock",
    },
    {
      text: "Plan Of Care",
      route: routes.planOfCareForConsumer,
      icon: "fa-solid fa-hospital",
    },
    {
      text: "Patient Emergency",
      route: routes.patientEmergencyForConsumer,
      icon: "fa-solid fa-triangle-exclamation",
    },
  ],
};
