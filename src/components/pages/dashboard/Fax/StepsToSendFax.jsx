import React from "react";
import { TextMd } from "@/components/commons";

const StepsToSendFax = () => {
  return (
    <div>
      <TextMd
        text="1. Click The Generate Button And Save the PDF"
        classes="font-semibold"
      />
      <TextMd
        text="2. Select The Consumer From Dropdown Given Above"
        classes="font-semibold"
      />
      <TextMd
        text="3. After Selecting Consumer, Fill The Required Data And Select The PDF That You Just Recently Saved"
        classes="font-semibold"
      />
      <TextMd
        text="4. Click Continue To Send Fax To Primary Care Physician"
        classes="font-semibold"
      />
      <TextMd
        text="5. Wait For Primary Care Physician To Sign And Send The Fax Back"
        classes="font-semibold"
      />
      <TextMd
        text="6. Once Primary Care Physician Signs And Send The Fax Back, You Can Search PDF That You Sent And Open It To See Received Fax With Primary Care Physician Sign"
        classes="font-semibold"
      />
    </div>
  );
};

export default StepsToSendFax;
