const mongoose = require("mongoose");
const PatientEmergencyModel = new mongoose.Schema(
  {
    consumer_contract_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "consumer_contracts",
      unique: true,
    },
    patient_emergency_address_one: {
      type: String,
    },
    patient_emergency_address_two: {
      type: String,
    },
    med_equipment_provider_name: {
      type: String,
    },
    med_equipment_provider_phone: {
      type: String,
    },
    med_supplies_provider_name: {
      type: String,
    },
    med_supplies_provider_phone: {
      type: String,
    },
    smoke_alarm_how_many: {
      type: String,
    },
    smoke_alarm_location: {
      type: String,
    },
    carbon_monoxide_how_many: {
      type: String,
    },
    carbon_monoxide_location: {
      type: String,
    },
    escape_routes_how_many: {
      type: String,
    },
    escape_routes_location: {
      type: String,
    },
    person_to_call_name: {
      type: String,
    },
    person_to_call_phone: {
      type: String,
    },
    survival_kit: {
      type: String,
    },
    patient_uses_oxygen: {
      type: String,
    },
    light_support_equipment: {
      type: String,
    },
    food_and_water_storage: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.patient_emergency ||
  mongoose.model("patient_emergency", PatientEmergencyModel);
