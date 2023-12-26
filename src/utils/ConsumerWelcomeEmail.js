export default function (
  changePasswordRoute = null,
  cell_no = null,
  gender = null,
  name = null,
  app_password = null
) {
  // return `
  //   <!DOCTYPE html>
  //             <html>
  //             <head>
  //             <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //             <meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />

  //             <style>
  //             #info-box{
  //               width:70%;
  //             }
  //             @media (max-width:1024px){
  //               #info-box{
  //                 width:92%;
  //               }
  //             }
  //             </style>
  //             </head>
  //         <body>
  //             <div style="background:#523178;padding:3rem;">
  //             <div id="info-box" style="background:white;border-radius:4px;padding:2rem 1rem;margin:auto;">
  //             <h2 style="color:#523178;font-weight:700;margin-top:0;">Welcome to Axzons Homecare</h2>
  //             <span>Dear Mr/Ms. Patient,</span> <br>
  //             <span>Thank you for trusting in Axzons as the agency for your homecare needs.</span> <br>
  //             <span>Your admission packet to Axzons is ready for your review.</span> <br>
  //             <span>Please use the given username and password to access and review the information for correctness. Once you have confirmed that all information is correct, please sign it at the place designated for client or patient. If you would like to make any changes please send us back your comments in the comment section below so we can make the changes and send it back to you for your signatures.</span> <br>
  //             <span>You can change your password from this <a href="${changePasswordRoute}">link</a> after login</span> <br>
  //             <br>
  //             <strong>Your Phone Number: </strong><span>${cell_no}</span> <br>
  //             <strong>Your Password: </strong><span>${app_password}</span> <br>
  //             <br>
  //             <span>We look forward to serving you with your homecare needs.</span><br>
  //             <span>Should you have any comments or suggestions please feel free to reach out to us at <a href="tel:1-866-429-9667">1-866-429-9667</a>.</span><br>
  //             <hr/>
  //             <span>www.axzonshomecare.com</span> <br>
  //             <strong><a href="tel:1-866-429-9667">1-866-429-9667</a></strong>

  //             </div>
  //             </div>
  //           </body>
  //         </html>
  //   `;

  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Axzons update</title>
<link href="https://fonts.googleapis.com/css2?family=Sora&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
<style type="text/css">
	body {
		margin: 0;
		background-color: white;
	}
	table {
		border-spacing: 0;
	}
	td {
		padding: 0;
	}
	img {
		border: 0;
	}
    h6{
      font-family: 'Lobster', cursive;
      padding: 6px 6px;
    }
    .wrapper{
        width: 100%;
        table-layout: fixed;
        background-color: white;
        padding-bottom: 60px;
    }
    .main{
        background-color: rgba(135, 83, 135, 0.138);
        margin: 0 auto;
        width: 100%;
        max-width: 600px;
        border-spacing: 0;
    }
    .footer-two-columns{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin: auto;
        text-align: center;
    }
    .footer-icon{
       display: flex;align-items: center;gap: 4px; justify-content: end;
   }
    @media screen and (max-width: 400px) {
        .footer-two-columns{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: auto;
        text-align: center;
    }
    .footer-icon{
         justify-content: flex-start;
    }
    }
</style>
</head>
<body>
    <center class="wrapper">
        <table style="margin-top: 10px;" class="main" width="100%">
            <!-- logo section -->
<tr>
    <td style="align-items: center; text-align: center;padding-top: 20px; margin:auto 10px;">
        <img height="50" style="max-width: 25%;padding-bottom: 20px; margin: auto 20px; object-fit: contain;" src="https://www.axzonshomecare.com/assets/img/logo.png" alt="">
    </td>
  </tr>
<!-- Table section -->
  <tr>
    <td >
        <p style="padding: 0 40px;">Welcome to Axzons Homecare</p>
      <p style="padding: 0 40px;">Dear ${
        gender === "M" ? "Mr." : "Ms."
      } ${name},</p>
      <p style="padding: 0 40px;">Thank you for trusting in Axzons as the agency for your homecare needs.Your admission packet of Axzons is ready for your review.</p>
      <p style="padding: 0 40px;">
        Please use the given username and password to access and review the information for correctness. If you would like to         
         make any changes please send us back your comments in the comment section below so we can make the changes and send it back to you for your signatures. Once you have confirmed that all information is correct
         please sign it at the place designated for client or patient
        </p>
      <p style="padding: 0 40px;">You can change your password from this <a style="color: blue;" href="${changePasswordRoute}">link</a> after login</p>
      <p style="text-align: left;padding: 0 40px;font-size: 14px; margin-bottom: 5px;"> <span style="font-weight: 600;">Your username </span> <span style="color: blue;">${cell_no} </span></p>
      <p style="text-align: left;padding: 0 40px;font-size: 14px; margin-top: 0; padding-bottom: 0%;margin-bottom: 5px;"> <span style="font-weight: 600;font-size: 14px; margin-top: 0;">Your password:</span> <span style="color: blue;" 
        >${app_password}</span>  </p>
      <p style="padding: 0 40px;">We look forward to serving you with your homecare needs.
        Should you have any comments or suggestions please feel free to reach out to us at  <a style="color: blue;" href="tel:1(866)429-9667"> 1(866)429-9667</a> </p>
    </td>
  </tr>
  <!-- footer SECTION -->
    <tr>
        <td><p style="border: 1px solid rgba(177, 156, 196, 0.227); margin-top: 20px;"></p></td>
    </tr>
  <tr >
    <td style="padding:3% 6% 3% 6%;">
        <table width="100%">
            <tr>
                <td class="footer-two-columns">
                    <table style="width: 100%;">
                        <tr>
                            <td>
                                <div>
                                    <p style="text-align: left;font-size: 14px; margin-top: 0; padding-bottom: 0%;margin-bottom: 5px;"> <span style="font-weight: 600;font-size: 14px; margin-top: 0;">Email:</span> <a style="color: blue;" href="emailto:info@axzonshonshomecare.com">info@axzonshonshomecare.com</a>  </p>
                                    <p style="text-align: left;font-size: 14px; margin-top: 0; padding-bottom: 0%;"> <span style="font-weight: 600;font-size: 14px; margin-top: 0;">Website:</span> <a href="https//:axzonshomecare.com">https//:axzonshomecare.com</a>  </p>
                                  </div>
                            </td>
                        </tr>
                    </table>
                    <table style="width: 100%;" class="social-icon">
                        <tr>
                            <td>
                                <div class="footer-icon" style="">
                                    <a href="https://twitter.com/axzonshomecare"></a> <img  style="width: 11%; margin:0 5px ;" src="https://gneqfh.stripocdn.email/content/assets/img/social-icons/circle-colored/twitter-circle-colored.png" alt=""></a>
                                    <a href="https://www.facebook.com/axzonscare/"></a> <img  style="width: 11%; margin:0 5px ;" src="https://gneqfh.stripocdn.email/content/assets/img/social-icons/circle-colored/facebook-circle-colored.png" alt=""></a>
                                    <a href="https://www.instagram.com/axzonshomecare/"></a> <img  style="width: 11%; margin:0 5px ;" src="https://gneqfh.stripocdn.email/content/assets/img/social-icons/circle-colored/instagram-circle-colored.png" alt=""></a>
                                   <a href="https://www.youtube.com/channel/UCpm8Pu6kl6IpiZCS31h5n0w"></a> <img  style="width: 11%; margin:0 5px ;" src="https://gneqfh.stripocdn.email/content/assets/img/social-icons/circle-colored/youtube-circle-colored.png" alt=""></a>
                                  </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </td>
  </tr>
 <!--  .......  last footer ........ -->
 <tr>
  <td style="width: 100%; padding: 15px auto; background-color: #d4aeae;">
      <p style="margin-top: 20px;padding-bottom: 15px; text-align: center; font-size: 14px; color: rgba(0,0,0,0.9); ">Copyright @ all right reserved by  <a style="text-decoration: underline; color: blue;" href="https//:axzonshomecare.com"> Axons Home Care </a> </p>
  </td>
</tr>
  </table>
</center>
</body>
</html>
  `;
}
