import { PDFDocument } from "pdf-lib";
import getMonthName from "./getMonthName";
import { pdfs } from "@/config";
// eslint-disable-next-line import/no-anonymous-default-export
export default async function (data) {
  try {
    // Fetch an existing PDF document
    let response = await fetch(pdfs.application);
    let bytes = await response.arrayBuffer();

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(bytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    fields.forEach((field) => {
      const type = field.constructor.name;
      const name = field.getName();
      console.log(`${type}: ${name}`);
    });
    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const fourteenPage = pages[13];
    const fifteenPage = pages[14];
    const twentyFourPage = pages[23];
    const twentyFivePage = pages[24];
    const fourtyOnePage = pages[40];
    const fourtyTwoPage = pages[41];
    const fiftyFourPage = pages[53];
    const thirtySixPage = pages[35];
    // Set Fields ---------------------->

    // Fetch png signs
    if (data?.consumerContract?.consumer_representative_sign) {
      // 1. Consumer/Consumer Representative Sign
      const consumerRepresentativeUrl = `/uploads/consumer_representative_sign/${data.consumerContract.consumer_representative_sign}`;
      const consumerRepresentativeImageBytes = await fetch(
        consumerRepresentativeUrl
      ).then((res) => res.arrayBuffer());

      const consumerRepresentativeImage = await pdfDoc.embedPng(
        consumerRepresentativeImageBytes
      );
      const consumerRepresentativeDims = consumerRepresentativeImage.scale(0.5);

      fourteenPage.drawImage(consumerRepresentativeImage, {
        x: fourteenPage.getWidth() / 4 - consumerRepresentativeDims.width / 4,
        y:
          fourteenPage.getHeight() / 1.65 -
          consumerRepresentativeDims.height / 1.65,
        width: consumerRepresentativeDims.width,
        height: consumerRepresentativeDims.height,
      });
      fifteenPage.drawImage(consumerRepresentativeImage, {
        x:
          fifteenPage.getWidth() / 4.5 - consumerRepresentativeDims.width / 4.5,
        y:
          fifteenPage.getHeight() / 10.5 -
          consumerRepresentativeDims.height / 10.5,
        width: consumerRepresentativeDims.width / 3,
        height: consumerRepresentativeDims.height / 3,
      });
      twentyFourPage.drawImage(consumerRepresentativeImage, {
        x: twentyFourPage.getWidth() / 8 - consumerRepresentativeDims.width / 8,
        y:
          twentyFourPage.getHeight() / 1.9 -
          consumerRepresentativeDims.height / 1.9,
        width: consumerRepresentativeDims.width,
        height: consumerRepresentativeDims.height,
      });
      fourtyOnePage.drawImage(consumerRepresentativeImage, {
        x: fourtyOnePage.getWidth() / 4 - consumerRepresentativeDims.width / 4,
        y:
          fourtyOnePage.getHeight() / 2.45 -
          consumerRepresentativeDims.height / 2.45,
        width: consumerRepresentativeDims.width / 2,
        height: consumerRepresentativeDims.height / 2,
      });
    }
    if (data?.consumerContract?.authority_sign) {
      // 2. Agency Authorized Sign
      const authorityUrl = `/uploads/authority_sign/${data.consumerContract.authority_sign}`;
      const authorityImageBytes = await fetch(authorityUrl).then((res) =>
        res.arrayBuffer()
      );

      const authorityImage = await pdfDoc.embedPng(authorityImageBytes);
      const authorityDims = authorityImage.scale(0.5);

      fourteenPage.drawImage(authorityImage, {
        x: fourteenPage.getWidth() / 4 - authorityDims.width / 4,
        y: fourteenPage.getHeight() / 2.25 - authorityDims.height / 2.25,
        width: authorityDims.width,
        height: authorityDims.height,
      });

      fourtyOnePage.drawImage(authorityImage, {
        x: fourtyOnePage.getWidth() / 4 - authorityDims.width / 4,
        y: fourtyOnePage.getHeight() / 3.2 - authorityDims.height / 3.2,
        width: authorityDims.width / 2,
        height: authorityDims.height / 2,
      });
      // if (data.discharge) {
      //   fiftyFourPage.drawImage(authorityImage, {
      //     x: fiftyFourPage.getWidth() / 4 - authorityDims.width / 4,
      //     y: fiftyFourPage.getHeight() / 8.5 - authorityDims.height / 8.59,
      //     width: authorityDims.width / 1.5,
      //     height: authorityDims.height / 1.5,
      //   });
      // }
    }

    if (data?.nursingAssessment?.nurse_signature) {
      // 5. Nurse signature
      const nurseUrl = `/uploads/nurse_signature/${data.nursingAssessment.nurse_signature}`;
      const nurseImageBytes = await fetch(nurseUrl).then((res) =>
        res.arrayBuffer()
      );

      const nurseImage = await pdfDoc.embedPng(nurseImageBytes);
      const nurseDims = nurseImage.scale(0.5);

      thirtySixPage.drawImage(nurseImage, {
        x: thirtySixPage.getWidth() / 6 - nurseDims.width / 6,
        y: thirtySixPage.getHeight() / 1.75 - nurseDims.height / 1.75,
        width: nurseDims.width / 2,
        height: nurseDims.height / 2,
      });
    }

    form.getCheckBox("Entire Medical Record Option").check();

    form
      .getTextField("Year_es_:signer1")
      .setText(
        data.consumerContract.consumerInfo?.effective_date?.substr(0, 4)
      );
    if (data.consumerContract.consumerInfo?.effective_date) {
      form
        .getDropdown("Month_es_:signer1:fullname")
        .select(
          getMonthName(
            parseInt(
              data.consumerContract.consumerInfo?.effective_date?.substr(5, 6)
            )
          )
        );
    }
    /**
     * @parseInt to remove leading 0s
     *
     * @toString to convert formatted number to string as dropdown requires select option to be string
     */
    if (data.consumerContract.consumerInfo?.effective_date) {
      form
        .getDropdown("Day_es_:signer1:fullname")
        .select(
          parseInt(
            data.consumerContract.consumerInfo?.effective_date?.substr(8, 9)
          ).toString()
        );
    }
    form
      .getTextField("Consumer MRN_es_:signer1")
      .setText(data.consumerContract.consumerInfo?.consumer_mrn);
    form
      .getTextField("Consumer First Name_es_:signer1:fullname")
      .setText(data.consumerContract.consumerInfo?.consumer_first_name);
    form
      .getTextField("Consumer Last Name_es_:signer1:fullname")
      .setText(data.consumerContract.consumerInfo?.consumer_last_name);
    if (data.consumerContract.consumerInfo?.consumer_gender) {
      form
        .getDropdown("Consumer Gender_es_:signer1:fullname")
        .select(
          data.consumerContract.consumerInfo?.consumer_gender === "M"
            ? "Male"
            : "Female"
        );
    }
    form
      .getTextField("Consumer SSN_es_:signer1")
      .setText(data.consumerContract.consumerInfo?.consumer_ssn);
    form
      .getTextField("Consumer DOB_es_:signer1:date")
      .setText(data.consumerContract.consumerInfo?.consumer_dob);
    form
      .getTextField("Consumer Medicaid Id")
      .setText(data.consumerContract.consumerInfo?.consumer_medicaid_id);
    form
      .getTextField("Consumer Insurance Name_es_:fullname")
      .setText(data.consumerContract.consumerInfo?.consumer_insurance_name);
    form
      .getTextField("Consumer Insurance ID")
      .setText(data.consumerContract.consumerInfo?.consumer_insurance_id);
    form
      .getTextField("Consumer Street Address")
      .setText(data.consumerContract.consumerInfo?.consumer_street_address);
    form
      .getTextField("Consumer City")
      .setText(data.consumerContract.consumerInfo?.consumer_city);
    if (data.consumerContract.consumerInfo?.consumer_state) {
      form
        .getDropdown("Consumer State")
        .select(data.consumerContract.consumerInfo?.consumer_state);
    }
    form
      .getTextField("Consumer Zip")
      .setText(data.consumerContract.consumerInfo?.consumer_zip);
    form
      .getTextField("Consumer Home Phone")
      .setText(data.consumerContract.consumerInfo?.consumer_home_phone);
    form
      .getTextField("Consumer Cell")
      .setText(data.consumerContract.consumerInfo?.consumer_cell);
    form
      .getTextField("Consumer Email Address_es_:email")
      .setText(data.consumerContract.consumerInfo?.consumer_email_address);
    form
      .getTextField("Emergency One Name_es_:fullname")
      .setText(data.consumerContract.emergencyOne?.emergency_one_name);
    form
      .getTextField("Emergency One Relationship")
      .setText(data.consumerContract.emergencyOne?.emergency_one_relationship);
    form
      .getTextField("Emergency One Email_es_:email")
      .setText(data.consumerContract.emergencyOne?.emergency_one_email);
    form
      .getTextField("Emergency One Phone")
      .setText(data.consumerContract.emergencyOne?.emergency_one_phone);
    form
      .getTextField("Emergency One Alternate Phone")
      .setText(
        data.consumerContract.emergencyOne?.emergency_one_alternate_phone
      );
    form
      .getTextField("Emergency Two Name_es_:fullname")
      .setText(data.consumerContract.emergencyTwo?.emergency_two_name);
    form
      .getTextField("Emergency Two Relationship")
      .setText(data.consumerContract.emergencyTwo?.emergency_two_relationship);
    form
      .getTextField("Emergency Two Email_es_:email")
      .setText(data.consumerContract.emergencyTwo?.emergency_two_email);
    form
      .getTextField("Emergency Two Phone")
      .setText(data.consumerContract.emergencyTwo?.emergency_two_phone);
    form
      .getTextField("Emergency Two Alternate Phone")
      .setText(
        data.consumerContract.emergencyTwo?.emergency_two_alternate_phone
      );
    if (data.consumerContract.consumerDiagnosis?.nursing_assessment) {
      form
        .getDropdown("Nursing Assessment")
        .select(data.consumerContract.consumerDiagnosis?.nursing_assessment);
    }
    form
      .getTextField("Consumer Diagnosis Auth Number")
      .setText(
        data.consumerContract.consumerDiagnosis?.consumer_diagnosis_auth_number
      );
    form
      .getTextField("Consumer Diagnosis From Date_es_:date")
      .setText(
        data.consumerContract.consumerDiagnosis?.consumer_diagnosis_from_date
      );
    form
      .getTextField("Consumer Diagnosis To Date_es_:date")
      .setText(
        data.consumerContract.consumerDiagnosis?.consumer_diagnosis_to_date
      );
    form
      .getTextField("Consumer Code")
      .setText(data.consumerContract.consumerDiagnosis?.consumer_code);
    form
      .getTextField("Consumer Modifier")
      .setText(data.consumerContract.consumerDiagnosis?.consumer_modifier);
    form
      .getTextField("PCP First Name_es_:fullname")
      .setText(data.consumerContract.pcp?.pcp_first_name);
    form
      .getTextField("PCP Last Name_es_:fullname")
      .setText(data.consumerContract.pcp?.pcp_last_name);
    form.getTextField("PCP NPI").setText(data.consumerContract.pcp?.pcp_npi);
    form
      .getTextField("PCP Phone No")
      .setText(data.consumerContract.pcp?.pcp_phone_no);
    form
      .getTextField("PCP Fax No")
      .setText(data.consumerContract.pcp?.pcp_fax_no);
    form
      .getTextField("PCP Street Address")
      .setText(data.consumerContract.pcp?.pcp_street_address);
    form.getTextField("PCP City").setText(data.consumerContract.pcp?.pcp_city);
    if (data.consumerContract.pcp?.pcp_state) {
      form
        .getDropdown("PCP State")
        .select(data.consumerContract.pcp?.pcp_state);
    }
    form.getTextField("PCP Zip").setText(data.consumerContract.pcp?.pcp_zip);

    form
      .getTextField("Authorized Sign Date_es_:date")
      .setText(data.consumerContract.authorized_sign_date);
    form
      .getTextField("Consumer Sign Date_es_:date")
      .setText(data.consumerContract.consumer_representative_sign_date);

    form
      .getTextField("Person to send info")
      .setText(
        data.consumerContract.authorizationForRelease?.person_to_send_info
      );

    data.consumerContract.authorizationForRelease?.medical_record_from &&
    data.consumerContract.authorizationForRelease?.medical_record_to
      ? form.getCheckBox("Medical Record Option").check()
      : form.getCheckBox("Medical Record Option").uncheck();
    form
      .getTextField("Medical Record From_es_:date")
      .setText(
        data.consumerContract.authorizationForRelease?.medical_record_from?.substr(
          0,
          10
        )
      );
    form
      .getTextField("Medical Record To_es_:date")
      .setText(
        data.consumerContract.authorizationForRelease?.medical_record_to?.substr(
          0,
          10
        )
      );
    form
      .getTextField("Other Auth Information")
      .setText(
        data.consumerContract.authorizationForRelease?.other_auth_information
      );
    data.consumerContract.authorizationForRelease?.other_auth_information
      ? form.getCheckBox("Other Auth Information Option").check()
      : form.getCheckBox("Other Auth Information Option").uncheck();

    data.consumerContract.authorizationForRelease?.treatments.alcohol_treatment
      ? form.getCheckBox("Alcohol Treatment").check()
      : form.getCheckBox("Alcohol Treatment").uncheck();
    data.consumerContract.authorizationForRelease?.treatments
      .mental_health_treatment
      ? form.getCheckBox("Mental Health Treatment").check()
      : form.getCheckBox("Mental Health Treatment").uncheck();
    data.consumerContract.authorizationForRelease?.treatments.hiv_treatment
      ? form.getCheckBox("HIV Treatment").check()
      : form.getCheckBox("HIV Treatment").uncheck();
    data.consumerContract.authorizationToDiscussHealth?.initials &&
    data.consumerContract.authorizationToDiscussHealth
      ?.individual_health_care_provider
      ? form.getCheckBox("Auth To Discuss Health Option").check()
      : form.getCheckBox("Auth To Discuss Health Option").uncheck();
    form
      .getTextField("Initials_es_:initials")
      .setText(data.consumerContract.authorizationToDiscussHealth?.initials);
    form
      .getTextField("Individual Health Care Provider_es_:fullname")
      .setText(
        data.consumerContract.authorizationToDiscussHealth
          ?.individual_health_care_provider
      );
    form
      .getTextField("Health info with attorney_es_:fullname")
      .setText(
        data.consumerContract.authorizationToDiscussHealth
          ?.health_info_with_attorney
      );
    form
      .getTextField("Other Reason for release of information")
      .setText(
        data.consumerContract.authorizationToDiscussHealth
          ?.other_reason_for_info_release
      );
    data.consumerContract.authorizationToDiscussHealth
      ?.other_reason_for_info_release
      ? form.getCheckBox("Reason for release of information Other").check()
      : form.getCheckBox("Reason for release of information Other").uncheck();
    form
      .getTextField("Auth Expire Date_es_:date")
      .setText(
        data.consumerContract.authorizationToDiscussHealth?.auth_expire_date?.substr(
          0,
          10
        )
      );
    form
      .getTextField("Person Signing Form_es_:fullname")
      .setText(
        data.consumerContract.authorizationToDiscussHealth?.person_signing_form
      );
    form
      .getTextField("Auth to sign on behalf of consumer")
      .setText(
        data.consumerContract.authorizationToDiscussHealth
          ?.auth_to_sign_on_behalf_of_consumer
      );

    if (data.discharge) {
      form
        .getTextField("Summary of care")
        .setText(data.discharge?.summary_of_care);
      form
        .getTextField("Summary of patient progress")
        .setText(data.discharge?.summary_of_patient_progress);
      form
        .getTextField("Patient remaining needs")
        .setText(data.discharge?.patient_remaining_needs);
      form
        .getTextField("Patient remaining problems")
        .setText(data.discharge?.patient_remaining_problems);
      form
        .getRadioGroup("Discharge Reason_es_:date")
        .select(data.discharge?.discharge_reason);

      form
        .getTextField("Other Discharge Reason")
        .setText(data.discharge?.other_discharge_reason);

      form
        .getTextField("Name of Facility/Agency/Other_es_:fullname")
        .setText(data.discharge?.transferred_to);

      // form
      //   .getTextField("Discharge Date_es_:date")
      //   .setText(data.discharge?.createdAt.substr(0, 10));
    }
    if (data.emergency) {
      form
        .getTextField("Patient Emergency Address one")
        .setText(data.emergency?.patient_emergency_address_one);
      form
        .getTextField("Patient Emergency Address Two")
        .setText(data.emergency?.patient_emergency_address_two);
      form
        .getTextField("Medical Equipment Provider Name_es_:fullname")
        .setText(data.emergency?.med_equipment_provider_name);
      form
        .getTextField("Medical Equipment Provider Phone")
        .setText(data.emergency?.med_equipment_provider_phone);
      form
        .getTextField("Medical Supplies Provider Name_es_:fullname")
        .setText(data.emergency?.med_supplies_provider_name);
      form
        .getTextField("Medical Equipment Provider Phone")
        .setText(data.emergency?.med_supplies_provider_phone);
      form
        .getTextField("Smoke Alarm How many")
        .setText(data.emergency?.smoke_alarm_how_many);
      form
        .getTextField("Smoke Alarm Location")
        .setText(data.emergency?.smoke_alarm_location);
      form
        .getTextField("carbon Monoxide How Many")
        .setText(data.emergency?.carbon_monoxide_how_many);
      form
        .getTextField("Carbon Monoxide Locations")
        .setText(data.emergency?.carbon_monoxide_location);
      form
        .getTextField("Escape Routes How many_es_:company")
        .setText(data.emergency?.escape_routes_how_many);
      form
        .getTextField("Escape Routes Location")
        .setText(data.emergency?.escape_routes_location);
      form
        .getTextField("Person to Call Name_es_:fullname")
        .setText(data.emergency?.person_to_call_name);
      form.getRadioGroup("Survival Kit").select(data.emergency?.survival_kit);
      form
        .getRadioGroup("Patient Uses Oxygen")
        .select(data.emergency?.patient_uses_oxygen);
      form
        .getRadioGroup("Light Support Equipment")
        .select(data.emergency?.light_support_equipment);
      form
        .getRadioGroup("Food and Water Store")
        .select(data.emergency?.food_and_water_storage);
    }
    form
      .getTextField("Client Primary Diagnosis Code")
      .setText(
        data.nursingAssessment?.consumerDiagnosis
          ?.consumer_primary_diagnosis_code
      );
    form
      .getTextField("Client Primary Diagnosis")
      .setText(
        data.nursingAssessment?.consumerDiagnosis?.consumer_primary_diagnosis
      );
    form
      .getTextField("Client Secondary Diagnosis Code")
      .setText(
        data.nursingAssessment?.consumerDiagnosis
          ?.consumer_secondary_diagnosis_code
      );
    form
      .getTextField("Client Secondary Diagnosis")
      .setText(
        data.nursingAssessment?.consumerDiagnosis?.consumer_secondary_diagnosis
      );
    form
      .getTextField("Client TOS")
      .setText(data.nursingAssessment?.consumerDiagnosis?.consumer_tos);
    if (data.nursingAssessment?.consumerDiagnosis?.consumer_los) {
      form
        .getDropdown("Client LOS")
        .select(data.nursingAssessment?.consumerDiagnosis?.consumer_los);
    }

    form
      .getTextField("Actions Indicated - Medical Information - 1")
      .setText(data.nursingAssessment?.medicalInfo?.notes_one);
    form
      .getTextField("Actions Indicated - Medical Information - 2")
      .setText(data.nursingAssessment?.medicalInfo?.notes_two);
    form
      .getTextField("Actions Indicated - Medical Information - 3")
      .setText(data.nursingAssessment?.medicalInfo?.notes_three);
    form
      .getTextField("Actions Indicated - Medical Information - 4")
      .setText(data.nursingAssessment?.medicalInfo?.notes_four);
    form
      .getTextField("Actions Indicated - Living Habits")
      .setText(data.nursingAssessment?.notes_living_habits);
    form
      .getTextField("Actions Indicated - Communication")
      .setText(data.nursingAssessment?.notes_living_communications);

    form
      .getTextField("Height in")
      .setText(data.nursingAssessment?.medicalInfo?.height_inch);
    form
      .getTextField("Height ft")
      .setText(data.nursingAssessment?.medicalInfo?.height_feet);
    form
      .getTextField("Weight")
      .setText(data.nursingAssessment?.medicalInfo?.weight);
    form
      .getRadioGroup("Weight Status")
      .select(data.nursingAssessment?.medicalInfo?.weight_status);
    form
      .getTextField("Reason for Weight Change")
      .setText(data.nursingAssessment?.medicalInfo?.reason_for_weight_change);
    form
      .getTextField("Blood Pressure Systolic Pressure")
      .setText(data.nursingAssessment?.medicalInfo?.blood_pressure_upper);
    form
      .getTextField("Blood Pressure Diastolic Pressure")
      .setText(data.nursingAssessment?.medicalInfo?.blood_pressure_lower);
    form
      .getTextField("Pulse")
      .setText(data.nursingAssessment?.medicalInfo?.pulse);
    form
      .getTextField("Respirations")
      .setText(data.nursingAssessment?.medicalInfo?.respirations);
    form
      .getTextField("Temperature")
      .setText(data.nursingAssessment?.medicalInfo?.temperature);
    form
      .getRadioGroup("Pain Status")
      .select(data.nursingAssessment?.medicalInfo?.pain_status);
    if (data.nursingAssessment?.medicalInfo?.level_of_pain) {
      form
        .getDropdown("Level of Pain")
        .select(data.nursingAssessment?.medicalInfo?.level_of_pain);
    }
    form
      .getTextField("Location and Description")
      .setText(data.nursingAssessment?.medicalInfo?.location_and_description);
    form
      .getTextField("History of Present Illness")
      .setText(data.nursingAssessment?.medicalInfo?.history_of_present_illness);
    form
      .getTextField("Past History")
      .setText(data.nursingAssessment?.medicalInfo?.past_history);
    form
      .getTextField("Family and Personal History")
      .setText(
        data.nursingAssessment?.medicalInfo?.family_and_personal_history
      );
    form
      .getTextField("General Appearence")
      .setText(data.nursingAssessment?.medicalInfo?.general_appearance);
    form
      .getTextField("Skin")
      .setText(data.nursingAssessment?.medicalInfo?.skin);
    form
      .getTextField("HEENT")
      .setText(data.nursingAssessment?.medicalInfo?.heent);
    form
      .getTextField("Neck")
      .setText(data.nursingAssessment?.medicalInfo?.neck);
    form
      .getTextField("Chest and Lungs")
      .setText(data.nursingAssessment?.medicalInfo?.chest_and_lungs);
    form
      .getTextField("Cardiovascular")
      .setText(data.nursingAssessment?.medicalInfo?.cardiovascular);
    form
      .getTextField("Abdomen")
      .setText(data.nursingAssessment?.medicalInfo?.abdomen);
    form
      .getTextField("Genitourinary")
      .setText(data.nursingAssessment?.medicalInfo?.genitourinary);
    form
      .getTextField("Rectal")
      .setText(data.nursingAssessment?.medicalInfo?.rectal);
    form
      .getTextField("Neurological")
      .setText(data.nursingAssessment?.medicalInfo?.neurological);

    let medications = "";

    data.nursingAssessment?.medications.map((medication, i) => {
      medications += `\n ${i + 1}.${medication.medication} \t \t \t ${
        medication.dose
      } \t \t \t \t \t ${medication.frequency} \t \t \t \t \t${
        medication.route
      }`;
    });
    form.getTextField("Medications").setText(medications);

    form.getRadioGroup("Prognosis").select(data.nursingAssessment?.prognosis);

    form
      .getTextField("Safety Measures")
      .setText(data.nursingAssessment?.safety_measures);

    form
      .getTextField("Medication Allergies")
      .setText(data.nursingAssessment?.medication_allergies);

    form
      .getRadioGroup("Dental Problems")
      .select(data.nursingAssessment?.dentalCare?.dental_problem);
    form
      .getRadioGroup("Care Of Dentist")
      .select(data.nursingAssessment?.dentalCare?.care_of_dentist);

    data.nursingAssessment?.dentalCare?.dentalState?.dental_state_no_dentures
      ? form.getCheckBox("Dental State No Dentures").check()
      : form.getCheckBox("Dental State No Dentures").uncheck();

    data.nursingAssessment?.dentalCare?.dentalState
      ?.dental_state_dentures_damaged
      ? form.getCheckBox("Dental State Dentures Damaged").check()
      : form.getCheckBox("Dental State Dentures Damaged").uncheck();

    data.nursingAssessment?.dentalCare?.dentalState?.dental_state_full_upper
      ? form.getCheckBox("Dental State Full Upper").check()
      : form.getCheckBox("Dental State Full Upper").uncheck();

    data.nursingAssessment?.dentalCare?.dentalState?.dental_state_full_lower
      ? form.getCheckBox("Dental State Full Lower").check()
      : form.getCheckBox("Dental State Full Lower").uncheck();

    data.nursingAssessment?.dentalCare?.dentalState
      ?.dental_state_partial_denture
      ? form.getCheckBox("Dental State Partial Denture").check()
      : form.getCheckBox("Dental State Partial Denture").uncheck();

    data.nursingAssessment?.dentalCare?.dentalState
      ?.dental_state_not_wearing_dentures
      ? form.getCheckBox("Dental State Not Wearing Dentures").check()
      : form.getCheckBox("Dental State Not Wearing Dentures").uncheck();

    data.nursingAssessment?.dentalCare?.dentalState?.dental_state_no_teeth
      ? form.getCheckBox("Dental State No Teeth").check()
      : form.getCheckBox("Dental State No Teeth").uncheck();

    form
      .getRadioGroup("Client Chew")
      .select(data.nursingAssessment?.dentalCare?.client_chew);
    form
      .getTextField("Dentist Name_es_:fullname")
      .setText(data.nursingAssessment?.dentalCare?.dentist_name);
    form
      .getTextField("Dentist Phone No")
      .setText(data.nursingAssessment?.dentalCare?.dentist_phone_no);
    form
      .getRadioGroup("Dentist Visit")
      .select(data.nursingAssessment?.dentalCare?.dental_visit);
    form
      .getTextField("Dentist Next Appointment_es_:date")
      .setText(data.nursingAssessment?.dentalCare?.dentist_next_appointment);

    data.nursingAssessment?.vision?.vision?.vision_unimpaired
      ? form.getCheckBox("Vision Unimpaired").check()
      : form.getCheckBox("Vision Unimpaired").uncheck();

    data.nursingAssessment?.vision?.vision[
      "vision_blind_-_safe_in_familiar_locale"
    ]
      ? form.getCheckBox("Vision Blind-Safe In Familiar Locale").check()
      : form.getCheckBox("Vision Blind-Safe In Familiar Locale").uncheck();

    data.nursingAssessment?.vision?.vision?.vision_adequate_for_personal_safety
      ? form.getCheckBox("Vision Adequate For Personal Safety").check()
      : form.getCheckBox("Vision Adequate For Personal Safety").uncheck();

    data.nursingAssessment?.vision?.vision["vision_blind_-_requires_assistance"]
      ? form.getCheckBox("Vision Blind-Requires Assistance").check()
      : form.getCheckBox("Vision Blind-Requires Assistance").uncheck();

    data.nursingAssessment?.vision?.vision
      ?.vision_distinguishes_only_light_or_dark
      ? form.getCheckBox("Vision Distinguishes Only Light Or Dark").check()
      : form.getCheckBox("Vision Distinguishes Only Light Or Dark").uncheck();

    form
      .getRadioGroup("Wears Glasses")
      .select(data.nursingAssessment?.vision?.wear_glasses);

    form
      .getTextField("Ophthalmologist Name_es_:fullname")
      .setText(data.nursingAssessment?.vision?.ophthalmologist_name);

    form
      .getTextField("Ophthalmologist Phone No")
      .setText(data.nursingAssessment?.vision?.ophthalmologist_phone_no);

    form
      .getRadioGroup("Opthalmologist Visit")
      .select(data.nursingAssessment?.vision?.ophthalmologist_visit);

    form
      .getTextField("Ophthalmologist Next Appointment_es_:date")
      .setText(
        data.nursingAssessment?.vision?.ophthalmologist_next_appointment.substr(
          0,
          10
        )
      );

    data.nursingAssessment?.hearing?.hearing?.hearing_unimpaired
      ? form.getCheckBox("Hearing Unimpaired").check()
      : form.getCheckBox("Hearing Unimpaired").uncheck();

    data.nursingAssessment?.hearing?.hearing?.hearing_mild_impairment
      ? form.getCheckBox("Hearing Mild Impairment").check()
      : form.getCheckBox("Hearing Mild Impairment").uncheck();

    data.nursingAssessment?.hearing?.hearing
      ?.hearing_moderate_impairment_but_not_a_threat_to_safety
      ? form
          .getCheckBox("Hearing Moderate Impairment But Not a Threat to Safety")
          .check()
      : form
          .getCheckBox("Hearing Moderate Impairment But Not a Threat to Safety")
          .uncheck();

    data.nursingAssessment?.hearing?.hearing[
      "hearing_impaired_-_safety_threat_exists"
    ]
      ? form.getCheckBox("Hearing Impaired – Safety threat exists").check()
      : form.getCheckBox("Hearing Impaired – Safety threat exists").uncheck();

    data.nursingAssessment?.hearing?.hearing?.hearing_totally_deaf
      ? form.getCheckBox("Hearing Totally Deaf").check()
      : form.getCheckBox("Hearing Totally Deaf").uncheck();

    form
      .getRadioGroup("Uses Hearing Aids")
      .select(data.nursingAssessment?.hearing?.uses_hearing_aids);

    form
      .getTextField("ENT Name_es_:fullname")
      .setText(data.nursingAssessment?.hearing?.ent_name);

    form
      .getTextField("ENT Phone No")
      .setText(data.nursingAssessment?.hearing?.ent_phone_no);

    form
      .getRadioGroup("ENT Visit")
      .select(data.nursingAssessment?.hearing?.ent_visit);

    form
      .getTextField("ENT Next Appointment_es_:date")
      .setText(data.nursingAssessment?.hearing?.ent_next_appointment);

    data.nursingAssessment?.mentalHealth?.attitudes?.attitude_cooperative
      ? form.getCheckBox("Attitude Cooperative").check()
      : form.getCheckBox("Attitude Cooperative").uncheck();

    data.nursingAssessment?.mentalHealth?.attitudes?.attitude_indifferent
      ? form.getCheckBox("Attitude Indifferent").check()
      : form.getCheckBox("Attitude Indifferent").uncheck();

    data.nursingAssessment?.mentalHealth?.attitudes?.attitude_resistive
      ? form.getCheckBox("Attitude Resistive").check()
      : form.getCheckBox("Attitude Resistive").uncheck();

    data.nursingAssessment?.mentalHealth?.attitudes?.attitude_demanding
      ? form.getCheckBox("Attitude Demanding").check()
      : form.getCheckBox("Attitude Demanding").uncheck();

    data.nursingAssessment?.mentalHealth?.attitudes?.attitude_suspicious
      ? form.getCheckBox("Attitude Suspicious").check()
      : form.getCheckBox("Attitude Suspicious").uncheck();

    data.nursingAssessment?.mentalHealth?.attitudes?.attitude_hostile
      ? form.getCheckBox("Attitude Hostile").check()
      : form.getCheckBox("Attitude Hostile").uncheck();

    data.nursingAssessment?.mentalHealth?.behaviors?.behavior_normal
      ? form.getCheckBox("Behavior Normal").check()
      : form.getCheckBox("Behavior Normal").uncheck();

    data.nursingAssessment?.mentalHealth?.behaviors?.behavior_wandering
      ? form.getCheckBox("Behavior Wandering").check()
      : form.getCheckBox("Behavior Wandering").uncheck();

    data.nursingAssessment?.mentalHealth?.behaviors?.behavior_sun_downing
      ? form.getCheckBox("Behavior Sun downing").check()
      : form.getCheckBox("Behavior Sun downing").uncheck();

    data.nursingAssessment?.mentalHealth?.behaviors?.behavior_restless
      ? form.getCheckBox("Behavior Restless").check()
      : form.getCheckBox("Behavior Restless").uncheck();

    data.nursingAssessment?.mentalHealth?.behaviors?.behavior_hostile
      ? form.getCheckBox("Behavior Hostile").check()
      : form.getCheckBox("Behavior Hostile").uncheck();

    data.nursingAssessment?.mentalHealth?.behaviors?.behavior_withdrawn
      ? form.getCheckBox("Behavior Withdrawn").check()
      : form.getCheckBox("Behavior Withdrawn").uncheck();

    data.nursingAssessment?.mentalHealth?.behaviors?.behavior_self_destructive
      ? form.getCheckBox("Behavior Self Destructive").check()
      : form.getCheckBox("Behavior Self Destructive").uncheck();

    data.nursingAssessment?.mentalHealth?.behaviors?.behavior_safety_hazard
      ? form.getCheckBox("Behavior Safety Hazard").check()
      : form.getCheckBox("Behavior Safety Hazard").uncheck();

    data.nursingAssessment?.mentalHealth?.behaviors?.behavior_aggressive
      ? form.getCheckBox("Behavior Aggressive").check()
      : form.getCheckBox("Behavior Aggressive").uncheck();

    data.nursingAssessment?.mentalHealth?.behaviors?.behavior_verbal
      ? form.getCheckBox("Behavior Verbal").check()
      : form.getCheckBox("Behavior Verbal").uncheck();

    data.nursingAssessment?.mentalHealth?.behaviors?.behavior_physical
      ? form.getCheckBox("Behavior Physical").check()
      : form.getCheckBox("Behavior Physical").uncheck();

    data.nursingAssessment?.mentalHealth?.perceptions?.perception_normal
      ? form.getCheckBox("Perception Normal").check()
      : form.getCheckBox("Perception Normal").uncheck();

    data.nursingAssessment?.mentalHealth?.perceptions?.perception_hallucinations
      ? form.getCheckBox("Perception Hallucinations").check()
      : form.getCheckBox("Perception Hallucinations").uncheck();

    data.nursingAssessment?.mentalHealth?.perceptions?.perception_auditory
      ? form.getCheckBox("Perception Auditory").check()
      : form.getCheckBox("Perception Auditory").uncheck();

    data.nursingAssessment?.mentalHealth?.perceptions?.perception_visual
      ? form.getCheckBox("Perception Visual").check()
      : form.getCheckBox("Perception Visual").uncheck();

    data.nursingAssessment?.mentalHealth?.perceptions?.perception_other
      ? form.getCheckBox("Perception Other").check()
      : form.getCheckBox("Perception Other").uncheck();

    form
      .getRadioGroup("Appearance")
      .select(data.nursingAssessment?.mentalHealth?.appearances);

    form
      .getRadioGroup("Cognition")
      .select(data.nursingAssessment?.mentalHealth?.cognitions);

    form
      .getRadioGroup("Self-Direction")
      .select(data.nursingAssessment?.mentalHealth?.selfDirection);

    form
      .getRadioGroup("Thought Content")
      .select(data.nursingAssessment?.mentalHealth?.thoughtContent);

    form
      .getRadioGroup("Insight")
      .select(data.nursingAssessment?.mentalHealth?.insights);

    form
      .getRadioGroup("Judgment")
      .select(data.nursingAssessment?.mentalHealth?.judgement);

    data.nursingAssessment?.mentalHealth?.influences?.influence_appropriate
      ? form.getCheckBox("Influence Appropriate").check()
      : form.getCheckBox("Influence Appropriate").uncheck();

    data.nursingAssessment?.mentalHealth?.influences?.influence_inappropriate
      ? form.getCheckBox("Influence Inappropriate").check()
      : form.getCheckBox("Influence Inappropriate").uncheck();

    data.nursingAssessment?.mentalHealth?.influences?.influence_anxious
      ? form.getCheckBox("Influence Anxious").check()
      : form.getCheckBox("Influence Anxious").uncheck();

    data.nursingAssessment?.mentalHealth?.influences?.influence_blunted
      ? form.getCheckBox("Influence Blunted").check()
      : form.getCheckBox("Influence Blunted").uncheck();

    data.nursingAssessment?.mentalHealth?.influences?.influence_euphoric
      ? form.getCheckBox("Influence Euphoric").check()
      : form.getCheckBox("Influence Euphoric").uncheck();

    data.nursingAssessment?.mentalHealth?.influences?.influence_depressed
      ? form.getCheckBox("Influence Depressed").check()
      : form.getCheckBox("Influence Depressed").uncheck();

    data.nursingAssessment?.mentalHealth?.influences?.influence_angry
      ? form.getCheckBox("Influence Angry").check()
      : form.getCheckBox("Influence Angry").uncheck();

    data.nursingAssessment?.mentalHealth?.influences?.influence_mood_swings
      ? form.getCheckBox("Influence Mood Swings").check()
      : form.getCheckBox("Influence Mood Swings").uncheck();

    form
      .getRadioGroup("Client Smokes")
      .select(data.nursingAssessment?.smokingHabits?.client_smokes);

    form
      .getRadioGroup("Smoking Degreee of Problem")
      .select(data.nursingAssessment?.smokingHabits?.smokes_degree_of_problem);

    form
      .getRadioGroup("Client Drinks")
      .select(data.nursingAssessment?.alcoholConsumption?.client_drinks);

    form
      .getRadioGroup("Drinks Degreee of Problem")
      .select(
        data.nursingAssessment?.alcoholConsumption?.drinks_degree_of_problem
      );

    data.nursingAssessment?.diets?.diet_regular
      ? form.getCheckBox("Diet Regular").check()
      : form.getCheckBox("Diet Regular").uncheck();

    data.nursingAssessment?.diets?.diet_low_salt
      ? form.getCheckBox("Diet Low Salt").check()
      : form.getCheckBox("Diet Low Salt").uncheck();

    data.nursingAssessment?.diets?.diet_diabetic
      ? form.getCheckBox("Diet Diabetic").check()
      : form.getCheckBox("Diet Diabetic").uncheck();

    data.nursingAssessment?.diets?.diet_vegetarian
      ? form.getCheckBox("Diet Vegetarian").check()
      : form.getCheckBox("Diet Vegetarian").uncheck();

    data.nursingAssessment?.diets?.diet_low_fat
      ? form.getCheckBox("Diet Low Fat").check()
      : form.getCheckBox("Diet Low Fat").uncheck();

    data.nursingAssessment?.diets?.diet_other
      ? form.getCheckBox("Diet Other").check()
      : form.getCheckBox("Diet Other").uncheck();

    form
      .getTextField("Other Diet")
      .setText(data.nursingAssessment?.diets?.other_diet);

    form
      .getTextField("Takes Supplement")
      .setText(data.nursingAssessment?.diets?.client_takes_supplement);

    form
      .getTextField("Nutritional Requirement")
      .setText(data.nursingAssessment?.diets?.client_nutritional_requirements);

    form
      .getRadioGroup("Eating Habit")
      .select(data.nursingAssessment?.eatingHabits?.eating_habit);
    form
      .getTextField("Eating Habits Comments")
      .setText(data.nursingAssessment?.eatingHabits?.eating_habits_comment);

    data.nursingAssessment?.communication?.languages?.language_english
      ? form.getCheckBox("Language Spoken English").check()
      : form.getCheckBox("Language Spoken English").uncheck();

    data.nursingAssessment?.communication?.languages?.language_italian
      ? form.getCheckBox("Language Spoken Italian").check()
      : form.getCheckBox("Language Spoken Italian").uncheck();

    data.nursingAssessment?.communication?.languages?.language_french
      ? form.getCheckBox("Language Spoken French").check()
      : form.getCheckBox("Language Spoken French").uncheck();

    data.nursingAssessment?.communication?.languages?.language_spanish
      ? form.getCheckBox("Language Spoken Spanish").check()
      : form.getCheckBox("Language Spoken Spanish").uncheck();

    data.nursingAssessment?.communication?.languages?.language_chinese
      ? form.getCheckBox("Language Spoken Chinese").check()
      : form.getCheckBox("Language Spoken Chinese").uncheck();

    data.nursingAssessment?.communication?.languages?.language_russian
      ? form.getCheckBox("Language Spoken Russian").check()
      : form.getCheckBox("Language Spoken Russian").uncheck();

    data.nursingAssessment?.communication?.languages?.language_japanese
      ? form.getCheckBox("Language Spoken Japanese").check()
      : form.getCheckBox("Language Spoken Japanese").uncheck();

    data.nursingAssessment?.communication?.languages?.language_east_indian
      ? form.getCheckBox("Language Spoken East Indian").check()
      : form.getCheckBox("Language Spoken East Indian").uncheck();

    data.nursingAssessment?.communication?.languages?.language_other
      ? form.getCheckBox("Language Spoken Other").check()
      : form.getCheckBox("Language Spoken Other").uncheck();

    form
      .getTextField("Other Language Spoken")
      .setText(
        data.nursingAssessment?.communication?.languages?.other_language
      );

    form
      .getRadioGroup("Speech")
      .select(data.nursingAssessment?.communication?.speech);

    form
      .getTextField("Method of Communicating")
      .setText(data.nursingAssessment?.communication?.method_of_communicating);

    form
      .getRadioGroup("Method of communicating is")
      .select(data.nursingAssessment?.communication?.speech_method);

    form
      .getRadioGroup("Understanding")
      .select(data.nursingAssessment?.communication?.speech_understanding);

    data.nursingAssessment?.activitiesOfDailyLiving?.mobilityAids
      ?.mobility_aids_uses_cane
      ? form.getCheckBox("Mobility Aids Uses Cane").check()
      : form.getCheckBox("Mobility Aids Uses Cane").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.mobilityAids
      ?.mobility_aids_uses_walker
      ? form.getCheckBox("Mobility Aids Uses Walker").check()
      : form.getCheckBox("Mobility Aids Uses Walker").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.mobilityAids
      ?.mobility_aids_uses_crutches
      ? form.getCheckBox("Mobility Aids Uses Crutches").check()
      : form.getCheckBox("Mobility Aids Uses Crutches").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.mobilityAids
      ?.mobility_aids_uses_manual_wheelchair
      ? form.getCheckBox("Mobility Aids Uses Manual Wheelchair").check()
      : form.getCheckBox("Mobility Aids Uses Manual Wheelchair").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.mobilityAids
      ?.mobility_aids_uses_electric_wheelchair
      ? form.getCheckBox("Mobility Aids Uses Electric Wheelchair").check()
      : form.getCheckBox("Mobility Aids Uses Electric Wheelchair").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.mobilityAids
      ?.mobility_aids_uses_grab_bars
      ? form.getCheckBox("Mobility Aids Uses Grab Bars").check()
      : form.getCheckBox("Mobility Aids Uses Grab Bars").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.mobilityAids
      ?.mobility_aids_others
      ? form.getCheckBox("Mobility Aids Other").check()
      : form.getCheckBox("Mobility Aids Other").uncheck();

    form
      .getTextField("Other Mobility Aid")
      .setText(
        data.nursingAssessment?.activitiesOfDailyLiving?.mobilityAids?.other_aid
      );

    form
      .getRadioGroup("Ambulation")
      .select(data.nursingAssessment?.activitiesOfDailyLiving?.ambulations);

    form
      .getRadioGroup("Transferring")
      .select(
        data.nursingAssessment?.activitiesOfDailyLiving?.transferring
          ?.transferring
      );

    data.nursingAssessment?.activitiesOfDailyLiving?.transferring
      ?.transferring_needs_supervision_transferring_to_bed
      ? form.getCheckBox("Sup transferring to Bed").check()
      : form.getCheckBox("Sup transferring to Bed").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.transferring
      ?.transferring_needs_supervision_transferring_to_chair
      ? form.getCheckBox("Sup transferring to Chair").check()
      : form.getCheckBox("Sup transferring to Chair").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.transferring
      ?.transferring_needs_supervision_transferring_to_toilet
      ? form.getCheckBox("Sup transferring to Toilet").check()
      : form.getCheckBox("Sup transferring to Toilet").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.transferring
      ?.transferring_needs_intermittent_assistance_transferring_to_bed
      ? form.getCheckBox("Inter transferring to Bed").check()
      : form.getCheckBox("Inter transferring to Bed").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.transferring
      ?.transferring_needs_intermittent_assistance_transferring_to_chair
      ? form.getCheckBox("Inter transferring to Chair").check()
      : form.getCheckBox("Inter transferring to Chair").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.transferring
      ?.transferring_needs_intermittent_assistance_transferring_to_toilet
      ? form.getCheckBox("Inter transferring to Toilet").check()
      : form.getCheckBox("Inter transferring to Toilet").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.transferring
      ?.transferring_needs_continued_assistance_transferring_to_bed
      ? form.getCheckBox("Cont transferring to Bed").check()
      : form.getCheckBox("Cont transferring to Bed").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.transferring
      ?.transferring_needs_continued_assistance_transferring_to_chair
      ? form.getCheckBox("Cont transferring to Chair").check()
      : form.getCheckBox("Cont transferring to Chair").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.transferring
      ?.transferring_needs_continued_assistance_transferring_to_toilet
      ? form.getCheckBox("Cont transferring to Toilet").check()
      : form.getCheckBox("Cont transferring to Toilet").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.bathing
      ?.bathing_independent_in_bathtub
      ? form.getCheckBox("Bathing Independent in Bathtub or Shower").check()
      : form.getCheckBox("Bathing Independent in Bathtub or Shower").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.bathing
      ?.bathing_independent_with_mech_aids
      ? form.getCheckBox("Bathing Independent with Mechanical Aids").check()
      : form.getCheckBox("Bathing Independent with Mechanical Aids").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.bathing
      ?.bathing_getting_in_out_tub
      ? form.getCheckBox("Bathing Getting in out Tub").check()
      : form.getCheckBox("Bathing Getting in out Tub").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.bathing
      ?.bathing_turning_taps_on_off
      ? form.getCheckBox("Bathing Turning Taps on off").check()
      : form.getCheckBox("Bathing Turning Taps on off").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.bathing?.bathing_back
      ? form.getCheckBox("Bathing Back").check()
      : form.getCheckBox("Bathing Back").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.bathing
      ?.bathing_req_continued_assistance
      ? form.getCheckBox("Bathing Cont").check()
      : form.getCheckBox("Bathing Cont").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.bathing
      ?.bathing_resists_assistance
      ? form.getCheckBox("Bathing Rest").check()
      : form.getCheckBox("Bathing Rest").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.bathing?.bathing_other
      ? form.getCheckBox("Bathing Other").check()
      : form.getCheckBox("Bathing Other").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.bathing
      ?.bathing_getting_in_out_tub &&
    data.nursingAssessment?.activitiesOfDailyLiving?.bathing
      ?.bathing_turning_taps_on_off &&
    data.nursingAssessment?.activitiesOfDailyLiving?.bathing?.bathing_back
      ? form.getCheckBox("Bathing Require Assistance").check()
      : form.getCheckBox("Bathing Require Assistance").uncheck();

    form
      .getTextField("Other Bathing")
      .setText(
        data.nursingAssessment?.activitiesOfDailyLiving?.bathing?.other_bathing
      );

    data.nursingAssessment?.activitiesOfDailyLiving?.dressing
      ?.dressing_independent
      ? form.getCheckBox("Dressing Independent").check()
      : form.getCheckBox("Dressing Independent").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.dressing
      ?.dressing_needs_help_selecting_clothes
      ? form.getCheckBox("Dressing Needs Help Selecting Clothes").check()
      : form.getCheckBox("Dressing Needs Help Selecting Clothes").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.dressing
      ?.dressing_needs_help_coordinating_colors
      ? form.getCheckBox("Dressing Needs Help Coordinating Colours").check()
      : form.getCheckBox("Dressing Needs Help Coordinating Colours").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.dressing
      ?.dressing_needs_daily_clothing
      ? form.getCheckBox("Dressing Needs Daily Clothing").check()
      : form.getCheckBox("Dressing Needs Daily Clothing").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.dressing
      ?.dressing_needs_doing_buttons
      ? form.getCheckBox("Dressing Needs Doing Buttons").check()
      : form.getCheckBox("Dressing Needs Doing Buttons").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.dressing
      ?.dressing_needs_pulling_trousers
      ? form.getCheckBox("Dressing Needs Pulling Trousers").check()
      : form.getCheckBox("Dressing Needs Pulling Trousers").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.dressing
      ?.dressing_needs_clothes_cleanliness
      ? form.getCheckBox("Dressing Needs Clothes Cleanliness").check()
      : form.getCheckBox("Dressing Needs Clothes Cleanliness").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.dressing
      ?.dressing_needs_help_selecting_clothes &&
    data.nursingAssessment?.activitiesOfDailyLiving?.dressing
      ?.dressing_needs_help_coordinating_colors
      ? form.getCheckBox("Dressing Needs Help").check()
      : form.getCheckBox("Dressing Needs Help").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.dressing
      ?.dressing_needs_daily_clothing &&
    data.nursingAssessment?.activitiesOfDailyLiving?.dressing
      ?.dressing_needs_doing_buttons &&
    data.nursingAssessment?.activitiesOfDailyLiving?.dressing
      ?.dressing_needs_pulling_trousers &&
    data.nursingAssessment?.activitiesOfDailyLiving?.dressing
      ?.dressing_needs_clothes_cleanliness
      ? form.getCheckBox("Dressing Needs Daily").check()
      : form.getCheckBox("Dressing Needs Daily").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.groomingAndHygiene
      ?.grooming_and_hygiene_independent
      ? form.getCheckBox("Grooming and Hygiene Independent").check()
      : form.getCheckBox("Grooming and Hygiene Independent").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.groomingAndHygiene
      ?.grooming_and_hygiene_direction
      ? form.getCheckBox("Grooming and Hygiene Direction").check()
      : form.getCheckBox("Grooming and Hygiene Direction").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.groomingAndHygiene
      ?.grooming_and_hygiene_req_assistance_toothbrush
      ? form
          .getCheckBox("Grooming and Hygiene Req Assistance Toothbrush")
          .check()
      : form
          .getCheckBox("Grooming and Hygiene Req Assistance Toothbrush")
          .uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.groomingAndHygiene
      ?.grooming_and_hygiene_req_assistance_using_razor
      ? form
          .getCheckBox("Grooming and Hygiene Req Assistance Using Razor")
          .check()
      : form
          .getCheckBox("Grooming and Hygiene Req Assistance Using Razor")
          .uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.groomingAndHygiene
      ?.grooming_and_hygiene_total_assistance
      ? form.getCheckBox("Grooming and Hygiene Total Assistance").check()
      : form.getCheckBox("Grooming and Hygiene Total Assistance").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.groomingAndHygiene
      ?.grooming_and_hygiene_resists
      ? form.getCheckBox("Grooming and Hygiene Resists").check()
      : form.getCheckBox("Grooming and Hygiene Resists").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.groomingAndHygiene
      ?.grooming_and_hygiene_req_assistance_toothbrush &&
    data.nursingAssessment?.activitiesOfDailyLiving?.groomingAndHygiene
      ?.grooming_and_hygiene_req_assistance_using_razor
      ? form.getCheckBox("Grooming and Hygiene Req Assistance").check()
      : form.getCheckBox("Grooming and Hygiene Req Assistance").uncheck();

    form
      .getRadioGroup("Eating")
      .select(data.nursingAssessment?.activitiesOfDailyLiving?.eating);

    data.nursingAssessment?.activitiesOfDailyLiving?.[
      "eating_cutting_up/pureeing_food"
    ]
      ? form.getCheckBox("Eating Int Help").check()
      : form.getCheckBox("Eating Int Help").uncheck();
    form
      .getRadioGroup("Bladder Control")
      .select(data.nursingAssessment?.activitiesOfDailyLiving?.bladder_control);
    form
      .getRadioGroup("Bowel Control")
      .select(data.nursingAssessment?.activitiesOfDailyLiving?.bowel_control);

    data.nursingAssessment?.activitiesOfDailyLiving?.toileting
      ?.toileting_requires_raised_toilet_seat_or_commode
      ? form.getCheckBox("Toileting Requires Raised Toilet Seat").check()
      : form.getCheckBox("Toileting Requires Raised Toilet Seat").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.toileting
      ?.toileting_has_difficulty_with_buttons_and_zippers
      ? form
          .getCheckBox("Toileting Has Difficulty With Buttons and Zippers")
          .check()
      : form
          .getCheckBox("Toileting Has Difficulty With Buttons and Zippers")
          .uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.toileting
      ?.toileting_needs_help_with_aids
      ? form.getCheckBox("Toileting Needs Help with Aids").check()
      : form.getCheckBox("Toileting Needs Help with Aids").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.toileting?.toileting_other
      ? form.getCheckBox("Toileting Other").check()
      : form.getCheckBox("Toileting Other").uncheck();

    form
      .getTextField("Other Toileting")
      .setText(
        data.nursingAssessment?.activitiesOfDailyLiving?.toileting
          ?.other_toileting
      );
    if (
      data.nursingAssessment?.activitiesOfDailyLiving?.exercising
        ?.exercising_exercises
    ) {
      // form.getCheckBox('Exercising Time')
      form
        .getRadioGroup("Exercise")
        .select(
          data.nursingAssessment?.activitiesOfDailyLiving?.exercising
            ?.exercising_exercises
        );
    }

    data.nursingAssessment?.activitiesOfDailyLiving?.exercising?.exercising_time
      ? form.getCheckBox("Exercising Time").check()
      : form.getCheckBox("Exercising Time").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.exercising
      ?.exercising_recent_changes
      ? form.getCheckBox("Exercising Recent Changes").check()
      : form.getCheckBox("Exercising Recent Changes").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.exercising
      ?.exercising_alone
      ? form.getCheckBox("Exercising Alone").check()
      : form.getCheckBox("Exercising Alone").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.exercising
      ?.exercising_with_attendant
      ? form.getCheckBox("Exercising With Attendant").check()
      : form.getCheckBox("Exercising With Attendant").uncheck();

    data.nursingAssessment?.activitiesOfDailyLiving?.exercising
      ?.exercising_other
      ? form.getCheckBox("Exercising Other").check()
      : form.getCheckBox("Exercising Other").uncheck();

    form
      .getTextField("Other Exercising")
      .setText(
        data.nursingAssessment?.activitiesOfDailyLiving?.exercising
          ?.about_exercise
      );
    form
      .getTextField("Exercise Other")
      .setText(
        data.nursingAssessment?.activitiesOfDailyLiving?.exercising
          ?.other_exercise
      );
    form
      .getTextField("Time Exercising")
      .setText(
        data.nursingAssessment?.activitiesOfDailyLiving?.exercising
          ?.time_exercising
      );
    form
      .getTextField("Recent Changes Exercising")
      .setText(
        data.nursingAssessment?.activitiesOfDailyLiving?.exercising
          ?.recent_changes_exercising
      );

    form
      .getRadioGroup("Preparing Food")
      .select(
        data.nursingAssessment?.instrumentalActivitiesOfDailyLiving
          ?.preparing_food
      );

    form
      .getRadioGroup("Housekeeping")
      .select(
        data.nursingAssessment?.instrumentalActivitiesOfDailyLiving
          ?.house_keeping
      );

    form
      .getRadioGroup("Shopping")
      .select(
        data.nursingAssessment?.instrumentalActivitiesOfDailyLiving?.shopping
      );

    form
      .getRadioGroup("Transportation")
      .select(
        data.nursingAssessment?.instrumentalActivitiesOfDailyLiving
          ?.transportation
      );

    form
      .getRadioGroup("Telephone")
      .select(
        data.nursingAssessment?.instrumentalActivitiesOfDailyLiving?.telephone
      );

    form
      .getRadioGroup("Medication")
      .select(
        data.nursingAssessment?.instrumentalActivitiesOfDailyLiving?.medication
      );

    data.nursingAssessment?.attendantProfile?.attendants?.attendant_independent
      ? form.getCheckBox("Attendant Independent").check()
      : form.getCheckBox("Attendant Independent").uncheck();

    data.nursingAssessment?.attendantProfile?.attendants
      ?.attendant_needs_an_attendant
      ? form.getCheckBox("Attendant Needs an Attendant").check()
      : form.getCheckBox("Attendant Needs an Attendant").uncheck();

    if (
      data.nursingAssessment?.attendantProfile
        ?.frequency_of_attendant_assistance
    ) {
      form.getCheckBox("Attendant Frequency of Attendant Assistance").check();
      form
        .getRadioGroup("Frequency of Attendant Assistance")
        .select(
          data.nursingAssessment?.attendantProfile
            ?.frequency_of_attendant_assistance
        );
    }

    if (data.nursingAssessment?.attendantProfile?.attendant_needs_met_by) {
      form.getCheckBox("Attendant Attendant Needs Met by").check();
      form
        .getRadioGroup("Attendant Needs Met by")
        .select(
          data.nursingAssessment?.attendantProfile?.attendant_needs_met_by
        );
    }

    form
      .getTextField("Other Attendant")
      .setText(data.nursingAssessment?.attendantProfile?.other_attendant);

    form
      .getRadioGroup("Housing")
      .select(data.nursingAssessment?.socialProfile?.housing);

    form
      .getRadioGroup("Housing Status")
      .select(data.nursingAssessment?.socialProfile?.housing_ownership);

    form
      .getRadioGroup("Housing Urban/Rural")
      .select(data.nursingAssessment?.socialProfile?.housing_area);

    form
      .getTextField("Other Housing")
      .setText(data.nursingAssessment?.socialProfile?.other_housing);

    form
      .getRadioGroup("Living Companion")
      .select(data.nursingAssessment?.socialProfile?.living_companion);

    form
      .getTextField("Living Companion Principal Helper")
      .setText(data.nursingAssessment?.socialProfile?.principal_helper);

    form
      .getTextField("Ethnicity")
      .setText(data.nursingAssessment?.socialProfile?.ethnicity);

    data.nursingAssessment?.socialProfile?.ethnicity
      ? form.getCheckBox("Religion & Culture Ethnicity").check()
      : form.getCheckBox("Religion & Culture Ethnicity").uncheck();

    form
      .getTextField("Religion")
      .setText(data.nursingAssessment?.socialProfile?.religion);

    data.nursingAssessment?.socialProfile?.religion
      ? form.getCheckBox("Religion & Culture Religion").check()
      : form.getCheckBox("Religion & Culture Religion").uncheck();

    form
      .getTextField("Orders for Discipline - 1")
      .setText(data.nursingAssessment?.orders_for_discipline);

    form
      .getTextField("Goals Plans")
      .setText(data.nursingAssessment?.goals_plans);

    form
      .getRadioGroup("Covid Vac")
      .select(data.nursingAssessment?.vaccinationStatus?.covid_19_vaccine);

    form
      .getRadioGroup("Flu Vac")
      .select(data.nursingAssessment?.vaccinationStatus?.flu_vaccine);

    form
      .getRadioGroup("Pneumococcal Vac")
      .select(data.nursingAssessment?.vaccinationStatus?.pneumococcal_vaccine);

    form
      .getTextField("Date HHA Received_es_:date")
      .setText(data.nursingAssessment?.date_hha_received);

    form
      .getTextField("Note for Physician")
      .setText(data.nursingAssessment?.note_for_physician);

    if (data.planOfCare) {
      data.planOfCare?.functionalLimitations?.functional_limitation_hearing
        ? form.getCheckBox("Functional Limitation Hearing").check()
        : form.getCheckBox("Functional Limitation Hearing").uncheck();

      data.planOfCare?.functionalLimitations?.functional_limitation_speech
        ? form.getCheckBox("Functional Limitation Speech").check()
        : form.getCheckBox("Functional Limitation Speech").uncheck();

      data.planOfCare?.functionalLimitations?.functional_limitation_vision
        ? form.getCheckBox("Functional Limitation Vision").check()
        : form.getCheckBox("Functional Limitation Vision").uncheck();

      data.planOfCare?.functionalLimitations?.functional_limitation_mobility
        ? form.getCheckBox("Functional Limitation Mobility").check()
        : form.getCheckBox("Functional Limitation Mobility").uncheck();

      data.planOfCare?.functionalLimitations?.functional_limitation_swallowing
        ? form.getCheckBox("Functional Limitation Swallowing").check()
        : form.getCheckBox("Functional Limitation Swallowing").uncheck();

      data.planOfCare?.functionalLimitations?.functional_limitation_breathing
        ? form.getCheckBox("Functional Limitation Breathing").check()
        : form.getCheckBox("Functional Limitation Breathing").uncheck();

      data.planOfCare?.functionalLimitations?.functional_limitation_cognition
        ? form.getCheckBox("Functional Limitation Cognition").check()
        : form.getCheckBox("Functional Limitation Cognition").uncheck();

      data.planOfCare?.functionalLimitations
        ?.functional_limitation_performing_activities_of_daily_living
        ? form
            .getCheckBox(
              "Functional Limitation Performing Activities of Daily Living"
            )
            .check()
        : form
            .getCheckBox(
              "Functional Limitation Performing Activities of Daily Living"
            )
            .uncheck();

      form.getRadioGroup("Allergies").select(data.planOfCare?.allergies);

      form
        .getTextField("Medication Allergies")
        .setText(data.planOfCare?.allergies_no);

      form
        .getTextField("Special diet and /or Nutritional Needs")
        .setText(data.planOfCare?.special_diet_text);
      form.getRadioGroup("Special diet").select(data.planOfCare?.special_diet);

      data.planOfCare?.personalCare?.cares?.care_brush_teeth
        ? form.getCheckBox("Care Brush Teeth").check()
        : form.getCheckBox("Care Brush Teeth").uncheck();

      data.planOfCare?.personalCare?.cares["care_clean_hearing_aid(s)"]
        ? form.getCheckBox("Care Clean Hearing Aid(s)").check()
        : form.getCheckBox("Care Clean Hearing Aid(s)").uncheck();

      data.planOfCare?.personalCare?.cares?.care_clean_nasal_cannula
        ? form.getCheckBox("Care Clean Nasal Cannula").check()
        : form.getCheckBox("Care Clean Nasal Cannula").uncheck();

      data.planOfCare?.personalCare?.cares["care_shave_(electric)"]
        ? form.getCheckBox("Care Shave (Electric)").check()
        : form.getCheckBox("Care Shave (Electric)").uncheck();

      data.planOfCare?.personalCare?.cares?.care_routine_skin_care
        ? form.getCheckBox("Care Routine Skin Care").check()
        : form.getCheckBox("Care Routine Skin Care").uncheck();

      data.planOfCare?.personalCare?.cares["care_dressing/undressing"]
        ? form.getCheckBox("Care Dressing/Undressing").check()
        : form.getCheckBox("Care Dressing/Undressing").uncheck();

      data.planOfCare?.personalCare?.cares["care_nail_care_(filing,do_not_cut)"]
        ? form.getCheckBox("Care Nail Care (Filing,Do Not Cut)").check()
        : form.getCheckBox("Care Nail Care (Filing,Do Not Cut)").uncheck();

      data.planOfCare?.personalCare?.cares?.care_foot_care
        ? form.getCheckBox("Care Foot Care").check()
        : form.getCheckBox("Care Foot Care").uncheck();
      if (
        data.planOfCare?.personalCare?.cares?.frequencies?.brush_teeth_frequency
      ) {
        form
          .getDropdown("Care Brush Teeth frequency")
          .select(
            data.planOfCare?.personalCare?.cares?.frequencies
              ?.brush_teeth_frequency
          );
      }
      if (
        data.planOfCare?.personalCare?.cares?.frequencies?.[
          "clean_hearing_aid(s)_frequency"
        ]
      ) {
        form
          .getDropdown("Care Clean Hearing Aid(s) Frequency")
          .select(
            data.planOfCare?.personalCare?.cares?.frequencies?.[
              "clean_hearing_aid(s)_frequency"
            ]
          );
      }
      if (
        data.planOfCare?.personalCare?.cares?.frequencies
          ?.clean_nasal_cannula_frequency
      ) {
        form
          .getDropdown("Care Clean Nasal Cannula Frequency")
          .select(
            data.planOfCare?.personalCare?.cares?.frequencies
              ?.clean_nasal_cannula_frequency
          );
      }

      if (
        data.planOfCare?.personalCare?.cares?.frequencies?.[
          "shave_(electric)_frequency"
        ]
      ) {
        form
          .getDropdown("Care Shave (Electric) Frequency")
          .select(
            data.planOfCare?.personalCare?.cares?.frequencies?.[
              "shave_(electric)_frequency"
            ]
          );
      }

      if (
        data.planOfCare?.personalCare?.cares?.frequencies
          ?.routine_skin_care_frequency
      ) {
        form
          .getDropdown("Care Routine Skin Care Frequency")
          .select(
            data.planOfCare?.personalCare?.cares?.frequencies
              ?.routine_skin_care_frequency
          );
      }

      if (
        data.planOfCare?.personalCare?.cares?.frequencies?.[
          "dressing/undressing_frequency"
        ]
      ) {
        form
          .getDropdown("Care Dressing/Undressing Frequency")
          .select(
            data.planOfCare?.personalCare?.cares?.frequencies?.[
              "dressing/undressing_frequency"
            ]
          );
      }

      if (
        data.planOfCare?.personalCare?.cares?.frequencies?.[
          "nail_care_(filing,do_not_cut)_frequency"
        ]
      ) {
        form
          .getDropdown("Care Nail Care (Filing,Do Not Cut) Frequency")
          .select(
            data.planOfCare?.personalCare?.cares?.frequencies?.[
              "nail_care_(filing,do_not_cut)_frequency"
            ]
          );
      }

      if (
        data.planOfCare?.personalCare?.cares?.frequencies?.foot_care_frequency
      ) {
        form
          .getDropdown("Care Foot Care Frequency")
          .select(
            data.planOfCare?.personalCare?.cares?.frequencies
              ?.foot_care_frequency
          );
      }
      if (data.planOfCare?.personalCare?.baths?.bath_frequency) {
        form
          .getDropdown("Care Bath Frequency")
          .select(data.planOfCare?.personalCare?.baths?.bath_frequency);
      }

      data.planOfCare?.personalCare?.baths?.care_bed
        ? form.getCheckBox("Care Bed").check()
        : form.getCheckBox("Care Bed").uncheck();

      data.planOfCare?.personalCare?.baths?.care_sponge
        ? form.getCheckBox("Care Sponge").check()
        : form.getCheckBox("Care Sponge").uncheck();

      data.planOfCare?.personalCare?.baths?.care_tub
        ? form.getCheckBox("Care Tub").check()
        : form.getCheckBox("Care Tub").uncheck();

      data.planOfCare?.personalCare?.baths?.care_shower
        ? form.getCheckBox("Care Shower").check()
        : form.getCheckBox("Care Shower").uncheck();

      if (data.planOfCare?.personalCare?.hairCare?.hair_frequency) {
        form
          .getDropdown("Care Hair Care Frequency")
          .select(data.planOfCare?.personalCare?.hairCare?.hair_frequency);
      }

      data.planOfCare?.personalCare?.hairCare?.care_wash
        ? form.getCheckBox("Care Wash").check()
        : form.getCheckBox("Care Wash").uncheck();

      data.planOfCare?.personalCare?.hairCare?.care_shampoo
        ? form.getCheckBox("Care Shampoo").check()
        : form.getCheckBox("Care Shampoo").uncheck();
      if (data.planOfCare?.personalCare?.toiletings?.toileting_frequency) {
        form
          .getDropdown("Care Toileting Frequency")
          .select(
            data.planOfCare?.personalCare?.toiletings?.toileting_frequency
          );
      }

      data.planOfCare?.personalCare?.toiletings?.care_toilet
        ? form.getCheckBox("Care Toilet").check()
        : form.getCheckBox("Care Toilet").uncheck();

      data.planOfCare?.personalCare?.toiletings?.care_bedside_commode
        ? form.getCheckBox("Care Bedside Commode").check()
        : form.getCheckBox("Care Bedside Commode").uncheck();

      data.planOfCare?.personalCare?.toiletings?.care_bedpan
        ? form.getCheckBox("Care Bedpan").check()
        : form.getCheckBox("Care Bedpan").uncheck();

      data.planOfCare?.personalCare?.toiletings?.care_urinal
        ? form.getCheckBox("Care Urinal").check()
        : form.getCheckBox("Care Urinal").uncheck();

      data.planOfCare?.personalCare?.toiletings?.care_toilet_hygiene
        ? form.getCheckBox("Care Toilet Hygiene").check()
        : form.getCheckBox("Care Toilet Hygiene").uncheck();

      if (data.planOfCare?.personalCare?.incontinent?.incontinent_frequency) {
        form
          .getDropdown("Care Incontinent Care Frequency")
          .select(
            data.planOfCare?.personalCare?.incontinent?.incontinent_frequency
          );
      }

      data.planOfCare?.personalCare?.incontinent?.care_changing_diapers
        ? form.getCheckBox("Care Changing Diapers").check()
        : form.getCheckBox("Care Changing Diapers").uncheck();

      data.planOfCare?.personalCare?.incontinent?.care_skin_care
        ? form.getCheckBox("Care Skin Care").check()
        : form.getCheckBox("Care Skin Care").uncheck();
      if (data.planOfCare?.nutrition?.meal_preparation_frequency) {
        form
          .getDropdown("Meal Preparation Frequency")
          .select(data.planOfCare?.nutrition?.meal_preparation_frequency);
      }

      data.planOfCare?.nutrition?.meal_preparation_breakfast
        ? form.getCheckBox("Meal Preparation Breakfast").check()
        : form.getCheckBox("Meal Preparation Breakfast").uncheck();

      data.planOfCare?.nutrition?.meal_preparation_lunch
        ? form.getCheckBox("Meal Preparation Lunch").check()
        : form.getCheckBox("Meal Preparation Lunch").uncheck();

      data.planOfCare?.nutrition?.meal_preparation_dinner
        ? form.getCheckBox("Meal Preparation Dinner").check()
        : form.getCheckBox("Meal Preparation Dinner").uncheck();

      data.planOfCare?.nutrition?.meal_preparation_food_for_next_day
        ? form.getCheckBox("Meal Preparation Food For Next Day").check()
        : form.getCheckBox("Meal Preparation Food For Next Day").uncheck();
      if (data.planOfCare?.nutrition?.feeding_frequency) {
        form
          .getDropdown("Feeding Frequency")
          .select(data.planOfCare?.nutrition?.feeding_frequency);
      }

      data.planOfCare?.nutrition?.feedings_reinforce_diet
        ? form.getCheckBox("Feeding Reinforce Diet").check()
        : form.getCheckBox("Feeding Reinforce Diet").uncheck();

      data.planOfCare?.nutrition?.feedings_serving
        ? form.getCheckBox("Feeding Serving").check()
        : form.getCheckBox("Feeding Serving").uncheck();

      data.planOfCare?.nutrition?.feedings_clean_up
        ? form.getCheckBox("Feeding Clean Up").check()
        : form.getCheckBox("Feeding Clean Up").uncheck();

      form.getRadioGroup("Fluids").select(data.planOfCare?.nutrition?.fluids);

      form
        .getTextField("Other Nutrition")
        .setText(data.planOfCare?.nutrition?.other_nutrition);
      if (data.planOfCare?.nutrition?.other_nutrition) {
        form.getCheckBox("Nutrition Other").check();
      }
      if (data.planOfCare?.nutrition?.other_frequency) {
        form
          .getDropdown("Nutrition Other Frequency")
          .select(data.planOfCare?.nutrition?.other_frequency);
      }

      data.planOfCare?.nutrition?.fluids_encourage
        ? form.getCheckBox("Fluids Encourage").check()
        : form.getCheckBox("Fluids Encourage").uncheck();

      data.planOfCare?.nutrition?.fluids_restrict
        ? form.getCheckBox("Fluids Restrict").check()
        : form.getCheckBox("Fluids Restrict").uncheck();

      form
        .getRadioGroup("Activities Weight Bearing Restriction")
        .select(data.planOfCare?.activitiesDevices?.weight_restriction);

      form
        .getRadioGroup("Activities Bedrest")
        .select(data.planOfCare?.activitiesDevices?.bed_rest_with_bath);
      form
        .getRadioGroup("Activities Up As Tolerated")
        .select(data.planOfCare?.activitiesDevices?.tolerated);

      data.planOfCare?.activitiesDevices?.p_of_c_ambulations_walking
        ? form.getCheckBox("P Of C Ambulations Walking").check()
        : form.getCheckBox("P Of C Ambulations Walking").uncheck();

      data.planOfCare?.activitiesDevices?.p_of_c_ambulations_rollator
        ? form.getCheckBox("P Of C Ambulations Rollator").check()
        : form.getCheckBox("P Of C Ambulations Rollator").uncheck();

      data.planOfCare?.activitiesDevices?.p_of_c_ambulations_walker
        ? form.getCheckBox("P Of C Ambulations Walker").check()
        : form.getCheckBox("P Of C Ambulations Walker").uncheck();

      data.planOfCare?.activitiesDevices?.p_of_c_ambulations_cane
        ? form.getCheckBox("P Of C Ambulations Cane").check()
        : form.getCheckBox("P Of C Ambulations Cane").uncheck();

      data.planOfCare?.activitiesDevices?.p_of_c_ambulations_wheelchair
        ? form.getCheckBox("P Of C Ambulations Wheelchair").check()
        : form.getCheckBox("P Of C Ambulations Wheelchair").uncheck();

      data.planOfCare?.activitiesDevices?.p_of_c_ambulations_complete_bedrest
        ? form.getCheckBox("Activities Complete Bedrest").check()
        : form.getCheckBox("Activities Complete Bedrest").uncheck();

      data.planOfCare?.activitiesDevices[
        "p_of_c_ambulations_turning/positioning"
      ]
        ? form.getCheckBox("Activities Turning/Positioning").check()
        : form.getCheckBox("Activities Turning/Positioning").uncheck();

      data.planOfCare?.activitiesDevices?.p_of_c_ambulations_transferring
        ? form.getCheckBox("Activities Transferring").check()
        : form.getCheckBox("Activities Transferring").uncheck();

      data.planOfCare?.activitiesDevices
        ?.p_of_c_ambulations_take_client_for_walk
        ? form.getCheckBox("Activities Take Client For Walk").check()
        : form.getCheckBox("Activities Take Client For Walk").uncheck();

      data.planOfCare?.activitiesDevices[
        "p_of_c_ambulations_supervision/assistance_with_exercise_and_therapy"
      ]
        ? form
            .getCheckBox(
              "Activities Supervision/Assistance With Exercise And Therapy"
            )
            .check()
        : form
            .getCheckBox(
              "Activities Supervision/Assistance With Exercise And Therapy"
            )
            .uncheck();

      data.planOfCare?.activitiesDevices?.p_of_c_ambulations_other
        ? form.getCheckBox("Activities Other").check()
        : form.getCheckBox("Activities Other").uncheck();

      if (data.planOfCare?.activitiesDevices?.ambulation_frequency) {
        form
          .getDropdown("P Of C Ambulation Frequency")
          .select(data.planOfCare?.activitiesDevices?.ambulation_frequency);
      }

      if (data.planOfCare?.activitiesDevices?.other_frequency) {
        form
          .getDropdown("Activities Other Frequency")
          .select(data.planOfCare?.activitiesDevices?.other_frequency);
      }

      if (
        data.planOfCare?.activitiesDevices?.[
          "supervision/assistance_with_exercise_and_therapy_frequency"
        ]
      ) {
        form
          .getDropdown(
            "Activities Supervision/Assistance With Exercise And Therapy Frequency"
          )
          .select(
            data.planOfCare?.activitiesDevices?.[
              "supervision/assistance_with_exercise_and_therapy_frequency"
            ]
          );
      }

      if (data.planOfCare?.activitiesDevices?.take_client_for_walk_frequency) {
        form
          .getDropdown("Activities Take Client For Walk Frequency")
          .select(
            data.planOfCare?.activitiesDevices?.take_client_for_walk_frequency
          );
      }

      if (data.planOfCare?.activitiesDevices?.transferring_frequency) {
        form
          .getDropdown("Activities Transferring Frequency")
          .select(data.planOfCare?.activitiesDevices?.transferring_frequency);
      }

      if (
        data.planOfCare?.activitiesDevices?.["turning/positioning_frequency"]
      ) {
        form
          .getDropdown("Activities Turning_or_Positioning:Frequency")
          .select(
            data.planOfCare?.activitiesDevices?.[
              "turning/positioning_frequency"
            ]
          );
      }

      if (data.planOfCare?.activitiesDevices?.complete_bedrest_frequency) {
        form
          .getDropdown("Activities Complete Bedrest Frequency")
          .select(
            data.planOfCare?.activitiesDevices?.complete_bedrest_frequency
          );
      }

      if (data.planOfCare?.relatedDuties?.medication_reminding_frequency) {
        form
          .getDropdown("Duties Medication Reminding Frequency")
          .select(
            data.planOfCare?.relatedDuties?.medication_reminding_frequency
          );
      }

      if (data.planOfCare?.relatedDuties?.pick_up_mall_frequency) {
        form
          .getDropdown("Duties Pick Up Mall Frequency")
          .select(data.planOfCare?.relatedDuties?.pick_up_mall_frequency);
      }

      if (data.planOfCare?.relatedDuties?.grocery_shopping_frequency) {
        form
          .getDropdown("Duties Grocery Shopping Frequency")
          .select(data.planOfCare?.relatedDuties?.grocery_shopping_frequency);
      }

      if (data.planOfCare?.relatedDuties?.trash_management_frequency) {
        form
          .getDropdown("Duties Trash Management Frequency")
          .select(data.planOfCare?.relatedDuties?.trash_management_frequency);
      }

      if (data.planOfCare?.relatedDuties?.other_frequency) {
        form
          .getDropdown("Duties Other Frequrency-2")
          .select(data.planOfCare?.relatedDuties?.other_frequency);
      }

      data.planOfCare?.relatedDuties?.duties_medication_reminding
        ? form.getCheckBox("Duties Medication Reminding").check()
        : form.getCheckBox("Duties Medication Reminding").uncheck();

      data.planOfCare?.relatedDuties?.duties_pick_up_mall
        ? form.getCheckBox("Duties Pick Up Mall").check()
        : form.getCheckBox("Duties Pick Up Mall").uncheck();

      data.planOfCare?.relatedDuties?.duties_grocery_shopping
        ? form.getCheckBox("Duties Grocery Shopping").check()
        : form.getCheckBox("Duties Grocery Shopping").uncheck();

      data.planOfCare?.relatedDuties?.duties_trash_management
        ? form.getCheckBox("Duties Trash Management").check()
        : form.getCheckBox("Duties Trash Management").uncheck();

      data.planOfCare?.relatedDuties?.duties_other
        ? form.getCheckBox("Duties Other-2").check()
        : form.getCheckBox("Duties Other-2").uncheck();

      form
        .getTextField("Other Duties-2")
        .setText(data.planOfCare?.relatedDuties?.other_related_duties);

      if (data.planOfCare?.homeVisit?.friendly_home_visit_check_frequency) {
        form
          .getDropdown("Home Related Friendly Home Visit Check Frequency")
          .select(
            data.planOfCare?.homeVisit?.friendly_home_visit_check_frequency
          );
      }
      if (data.planOfCare?.homeVisit?.["telephone_check/monitor_frequency"]) {
        form
          .getDropdown("Home Related Telephone Check/Monitor Frequency")
          .select(
            data.planOfCare?.homeVisit?.["telephone_check/monitor_frequency"]
          );
      }
      if (data.planOfCare?.homeVisit?.other_frequency) {
        form
          .getDropdown("Home Related Other Frequency-1")
          .select(data.planOfCare?.homeVisit?.other_frequency);
      }

      data.planOfCare?.homeVisit?.home_related_friendly_home_visit_check
        ? form.getCheckBox("Home Related Friendly Home Visit Check").check()
        : form.getCheckBox("Home Related Friendly Home Visit Check").uncheck();

      data.planOfCare?.homeVisit["home_related_telephone_check/monitor"]
        ? form.getCheckBox("Home Related Telephone Check/Monitor").check()
        : form.getCheckBox("Home Related Telephone Check/Monitor").uncheck();

      data.planOfCare?.homeVisit?.home_related_other
        ? form.getCheckBox("Home Related Other-1").check()
        : form.getCheckBox("Home Related Other-1").uncheck();

      form
        .getTextField("Other Home Related-1")
        .setText(data.planOfCare?.homeVisit?.other_home_related);

      if (data.planOfCare?.homemakingTasks?.make_bed_frequency) {
        form
          .getDropdown("Home Making Task Make Bed Frequency")
          .select(data.planOfCare?.homemakingTasks?.make_bed_frequency);
      }

      if (data.planOfCare?.homemakingTasks?.change_linen_frequency) {
        form
          .getDropdown("Home Making Task Change Linen Frequency")
          .select(data.planOfCare?.homemakingTasks?.change_linen_frequency);
      }

      if (data.planOfCare?.homemakingTasks?.laundry_frequency) {
        form
          .getDropdown("Home Making Task Laundry Frequency")
          .select(data.planOfCare?.homemakingTasks?.laundry_frequency);
      }

      if (data.planOfCare?.homemakingTasks?.light_housekeeping_frequency) {
        form
          .getDropdown("Home Making Task Light Housekeeping Frequency")
          .select(
            data.planOfCare?.homemakingTasks?.light_housekeeping_frequency
          );
      }

      if (data.planOfCare?.homemakingTasks?.other_frequency) {
        form
          .getDropdown("Home Making Task Other Frequency-1")
          .select(data.planOfCare?.homemakingTasks?.other_frequency);
      }

      data.planOfCare?.homemakingTasks?.home_making_task_make_bed
        ? form.getCheckBox("Home Making Task Make Bed").check()
        : form.getCheckBox("Home Making Task Make Bed").uncheck();

      data.planOfCare?.homemakingTasks?.home_making_task_change_linen
        ? form.getCheckBox("Home Making Task Change Linen").check()
        : form.getCheckBox("Home Making Task Change Linen").uncheck();

      data.planOfCare?.homemakingTasks?.home_making_task_laundry
        ? form.getCheckBox("Home Making Task Laundry").check()
        : form.getCheckBox("Home Making Task Laundry").uncheck();

      data.planOfCare?.homemakingTasks["home_making_task_vaccum/sweep_floors"]
        ? form.getCheckBox("Home Making Task Vaccum/Sweep Floors").check()
        : form.getCheckBox("Home Making Task Vaccum/Sweep Floors").uncheck();

      data.planOfCare?.homemakingTasks?.home_making_task_dust_furniture
        ? form.getCheckBox("Home Making Task Dust Furniture").check()
        : form.getCheckBox("Home Making Task Dust Furniture").uncheck();

      data.planOfCare?.homemakingTasks["home_making_task_clean_oven/microwave"]
        ? form.getCheckBox("Home Making Task Clean Oven/Microwave").check()
        : form.getCheckBox("Home Making Task Clean Oven/Microwave").uncheck();

      data.planOfCare?.homemakingTasks?.home_making_task_wet_mop_floors
        ? form.getCheckBox("Home Making Task Wet Mop Floors").check()
        : form.getCheckBox("Home Making Task Wet Mop Floors").uncheck();

      data.planOfCare?.homemakingTasks?.home_making_task_clean_kitchen_surfaces
        ? form.getCheckBox("Home Making Task Clean Kitchen Surfaces").check()
        : form.getCheckBox("Home Making Task Clean Kitchen Surfaces").uncheck();

      data.planOfCare?.homemakingTasks?.["home_making_task_clean_bathroom_sink"]
        ? form.getCheckBox("Home Making Task Clean Bathroom Sink").check()
        : form.getCheckBox("Home Making Task Clean Bathroom Sink").uncheck();

      data.planOfCare?.homemakingTasks?.[
        "home_making_task_clean_bathtub/shower"
      ]
        ? form.getCheckBox("Home Making Task Clean Bathtub/Shower").check()
        : form.getCheckBox("Home Making Task Clean Bathtub/Shower").uncheck();

      data.planOfCare?.homemakingTasks?.home_making_task_clean_toilet
        ? form.getCheckBox("Home Making Task Clean Toilet").check()
        : form.getCheckBox("Home Making Task Clean Toilet").uncheck();

      data.planOfCare?.homemakingTasks?.home_making_task_other
        ? form.getCheckBox("Home Making Task Other-1").check()
        : form.getCheckBox("Home Making Task Other-1").uncheck();

      form
        .getTextField("Other Home Making Task-1")
        .setText(data.planOfCare?.homemakingTasks?.home_making_task_other_text);

      data.planOfCare?.info_provided_to_client_roles_and_responsibilities
        ? form
            .getCheckBox("Info Provided To Client Roles and Responsibilities")
            .check()
        : form
            .getCheckBox("Info Provided To Client Roles and Responsibilities")
            .uncheck();

      data.planOfCare?.info_provided_to_client_code_of_ethics
        ? form.getCheckBox("Info Provided To Client Code of Ethics").check()
        : form.getCheckBox("Info Provided To Client Code of Ethics").uncheck();

      data.planOfCare["info_provided_to_client_costs_&_billing"]
        ? form.getCheckBox("Info Provided To Client Costs & Billing").check()
        : form.getCheckBox("Info Provided To Client Costs & Billing").uncheck();

      data.planOfCare
        ?.info_provided_to_client_confidentiality_of_client_information
        ? form
            .getCheckBox(
              "Info Provided To Client Confidentiality of Client Information"
            )
            .check()
        : form
            .getCheckBox(
              "Info Provided To Client Confidentiality of Client Information"
            )
            .uncheck();

      data.planOfCare?.info_provided_to_client_contact_information
        ? form
            .getCheckBox("Info Provided To Client Contact Information")
            .check()
        : form
            .getCheckBox("Info Provided To Client Contact Information")
            .uncheck();

      data.planOfCare?.info_provided_to_client_client_consent
        ? form.getCheckBox("Info Provided To Client Client Consent").check()
        : form.getCheckBox("Info Provided To Client Client Consent").uncheck();

      data.planOfCare?.info_provided_to_client_other
        ? form.getCheckBox("Info Provided To Client Other-1").check()
        : form.getCheckBox("Info Provided To Client Other-1").uncheck();

      form
        .getTextField("Other information-1")
        .setText(data.planOfCare?.info_provided_to_client_other_text);

      form
        .getTextField("Number of times supervisor will review")
        .setText(data.planOfCare?.number_of_times_supervisor_will_review);

      form
        .getTextField("Service Plan Designer Name_es_:fullname")
        .setText(data.planOfCare?.service_plan_designer_name);

      form
        .getTextField("Title of Agency Representative")
        .setText(data.planOfCare?.title_of_agency_represent);

      form
        .getTextField("Service Start Date_es_:date")
        .setText(data.planOfCare?.service_date_start);

      form
        .getTextField("Days of Services")
        .setText(data.planOfCare?.days_of_service);

      form
        .getTextField("Authorized Number of hours")
        .setText(data.planOfCare?.authorized_hours);

      form
        .getRadioGroup("Verbal Consent")
        .select(data.planOfCare?.verbal_consent);

      if (data.planOfCare?.service_start_time) {
        const serviceStartHours =
          parseInt(data.planOfCare?.service_start_time.substr(0, 2)) > 12
            ? parseInt(data.planOfCare?.service_start_time.substr(0, 2)) - 12
            : data.planOfCare?.service_start_time.substr(0, 2);
        form
          .getDropdown("Service Start Time Hours")
          .select(serviceStartHours?.toString());

        form
          .getDropdown("Service Start Time Minutes")
          .select(data.planOfCare?.service_start_time.substr(3, 4));

        form
          .getDropdown("Service Start Time AM_PM")
          .select(
            parseInt(data.planOfCare?.service_start_time.substr(0, 2)) >= 12
              ? "PM"
              : "AM"
          );
      }
      if (data.planOfCare?.service_end_time) {
        const serviceEndHours =
          parseInt(data.planOfCare?.service_end_time.substr(0, 2)) > 12
            ? parseInt(data.planOfCare?.service_end_time.substr(0, 2)) - 12
            : data.planOfCare?.service_end_time.substr(0, 2);
        form
          .getDropdown("Service End Time Hours")
          .select(serviceEndHours?.toString());

        form
          .getDropdown("Service End Time Minutes")
          .select(data.planOfCare?.service_end_time.substr(3, 4));

        form
          .getDropdown("Service End Time AM_PM")
          .select(
            parseInt(data.planOfCare?.service_end_time.substr(0, 2)) >= 12
              ? "PM"
              : "AM"
          );
      }
    }

    if (data.fax) {
      form
        .getTextField("Surgical Procedure")
        .setText(data.fax?.surgical_procedure);
      form
        .getTextField("ICD_3 Date_es_:date")
        .setText(data.fax?.surgical_procedure_date);
      // form.getTextField("Surgical Procedure").setText(data.fax?.dme_and_supplies);
    }

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Trigger the browser to download the PDF document
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const urlChan = window.URL.createObjectURL(pdfBlob);

    window.open(urlChan);

    const base64DataUri = await pdfDoc.saveAsBase64();

    return base64DataUri;
  } catch (error) {
    console.log(error);
  }
}
