import mongoose from "mongoose";
import joi from "joi";
import nodemailer from "nodemailer";

// ENV VARIABLES IMPORT
const { SMTP_HOST_NAME, SMTP_PORT, SECURE, MONGODB_URI, SMTP_MAIL, SMTP_PASS } =
  process.env;

// MONGODB DATABASE CONNECTION
let cached = null;
const dbConnection = async () => {
  try {
    if (cached) {
      return cached;
    }
    cached = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      tls: true,
    });
    return cached;
  } catch (error) {
    console.log("Error While Connecting Database");
  }
};

// MONGODB SCHEMA
const partnerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "* Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "* Email is required"],
      lowercase: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "* Phone is required"],
    },
    interests: {
      type: [String],
      required: [true, "* At least one interest is required"],
      validate: {
        validator: function(v) {
          return v && v.length > 0;
        },
        message: "* At least one interest is required"
      }
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// MONGODB MODELS
const PartnerModel =
  mongoose.models.partnerModel || mongoose.model("partnerModel", partnerSchema);

// VALIDATION SCHEMA
const partnerValidationSchema = joi.object({
  name: joi.string().required().messages({
    "string.base": "* Name Must Be String",
    "string.required": "* Name Is Required",
  }),
  phone: joi.string().required().messages({
    "string.base": "* Phone Must Be String",
    "string.required": "* Phone Is Required",
  }),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "* Email Must Be String",
      "string.required": "* Email is required",
    }),
  interests: joi.array().min(1).required().messages({
    "array.min": "* At least one interest is required",
    "any.required": "* At least one interest is required",
  }),
  notes: joi.string().allow('').optional(),
});

// TRANSPORTER
const transporter = nodemailer.createTransport({
  host: SMTP_HOST_NAME,
  auth: {
    user: SMTP_MAIL,
    pass: SMTP_PASS,
  },
  port: parseInt(SMTP_PORT),
  secure: SECURE === 'true',
});

// SEND MAIL
const sendMail = async (from, to, subject, template) => {
  try {
    let info = await transporter.sendMail({
      to,
      from,
      subject,
      html: template,
    });
    if (info) {
      console.log("Mail Sent Successfully");
    }
  } catch (error) {
    console.log("Error While Sending Mail", error);
  }
};

// Firm Template (for Zabka team)
const firmTemplate = (data) => {
  let { name, email, phone, interests, notes } = data;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Partner Registration - Zabka MB Solutions</title>
        <style>
          body, html {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
          }
          * {
            box-sizing: border-box;
          }
          body {
            background-color: #f7f7f7;
            padding: 40px 20px;
          }
          .email-wrapper {
            max-width: 680px;
            margin: auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            background: #1e40af;
            background: linear-gradient(135deg, #1e40af, #3b82f6);
            padding: 35px 20px;
            color: white;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 1.5px;
            position: relative;
          }
          .header-divider {
            height: 8px;
            background: #60a5fa;
            background: linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.5), rgba(255,255,255,0.2));
          }
          .content {
            padding: 40px 50px;
          }
          h2 {
            color: #333;
            margin: 0 0 20px 0;
            font-size: 24px;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .emoji {
            font-size: 28px;
            margin-right: 10px;
          }
          p {
            color: #555;
            margin-bottom: 30px;
            font-size: 16px;
            line-height: 1.6;
          }
          .highlight {
            background-color: rgba(30, 64, 175, 0.08);
            border-left: 4px solid #1e40af;
            padding: 15px;
          }
          table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            border: none;
            border-radius: 14px;
            overflow: hidden;
            margin: 25px 0;
            box-shadow: 0 5px 15px rgba(30, 64, 175, 0.08);
            font-size: 16px;
          }
          th {
            background: #1e40af;
            background: linear-gradient(to right, #1e40af, #3b82f6);
            color: #ffffff;
            width: 30%;
            font-weight: 600;
            letter-spacing: 0.5px;
            padding: 18px 24px;
            text-align: left;
            vertical-align: top;
          }
          td {
            background-color: #ffffff;
            color: #444;
            border-bottom: 1px solid #f0f0f0;
            padding: 18px 24px;
            text-align: left;
            vertical-align: top;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:nth-child(even) td {
            background-color: #fafafa;
          }
          a {
            color: #1e40af;
            text-decoration: none;
            font-weight: 500;
          }
          .interests-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          .interest-tag {
            background-color: #e0f2fe;
            color: #1e40af;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
          }
          .notes-cell {
            line-height: 1.7;
          }
          .footer {
            margin-top: 10px;
            background-color: #fcfcfc;
            font-size: 14px;
            color: #888;
            text-align: center;
            border-top: 1px solid #eee;
            padding: 25px 40px;
          }
          .footer-note {
            display: block;
            margin-top: 8px;
            font-size: 13px;
            color: #aaa;
          }
          
          @media only screen and (max-width: 600px) {
            .content {
              padding: 30px 20px;
            }
            .header {
              padding: 25px 15px;
              font-size: 26px;
            }
            table {
              border-radius: 8px;
            }
            th, td {
              padding: 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="header">
            Zabka MB Solutions
          </div>
          <div class="header-divider"></div>
          <div class="content">
            <h2><span class="emoji">🤝</span> New Partner Registration</h2>
            <p class="highlight">You have received a new partner registration with the following details:</p>
            <table>
              <tr>
                <th>Name</th>
                <td>${name}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td><a href="tel:+91${phone}">${phone}</a></td>
              </tr>
              <tr>
                <th>Areas of Interest</th>
                <td>
                  <div class="interests-list">
                    ${interests.map(interest => `<span class="interest-tag">${interest}</span>`).join('')}
                  </div>
                </td>
              </tr>
              <tr>
                <th>Notes / Area Details</th>
                <td class="notes-cell">${notes || 'No additional notes provided'}</td>
              </tr>
            </table>
          </div>
          <div class="footer">
            This email was automatically generated by your website's partner registration form.
            <span class="footer-note">Please do not reply directly to this email.</span>
          </div>
        </div>
      </body>
    </html>
      `;
};

// User Template (for partner)
const userTemplate = (data) => {
  let { name, email, phone, interests, notes } = data;
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Your Partner Registration - Zabka MB Solutions</title>
    <style>
      body, html {
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
      }
      * {
        box-sizing: border-box;
      }
      body {
        background-color: #f7f7f7;
        padding: 40px 20px;
      }
      .email-wrapper {
        max-width: 680px;
        margin: auto;
        background-color: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        background: #1e40af;
        background: linear-gradient(135deg, #1e40af, #3b82f6);
        padding: 35px 20px;
        color: white;
        font-size: 32px;
        font-weight: 700;
        letter-spacing: 1.5px;
        position: relative;
      }
      .header-divider {
        height: 8px;
        background: #60a5fa;
        background: linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.5), rgba(255,255,255,0.2));
      }
      .content {
        padding: 40px 50px;
      }
      h2 {
        color: #333;
        margin: 0 0 20px 0;
        font-size: 24px;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .emoji {
        font-size: 28px;
        margin-right: 10px;
      }
      p {
        color: #555;
        margin-bottom: 20px;
        font-size: 16px;
        line-height: 1.6;
      }
      .highlight {
        background-color: rgba(30, 64, 175, 0.08);
        border-left: 4px solid #1e40af;
        padding: 15px;
        margin-bottom: 25px;
      }
      .message-box {
        background-color: #f9f9f9;
        border-radius: 12px;
        padding: 25px;
        margin: 30px 0;
        border: 1px solid #eee;
      }
      .message-box h3 {
        margin-top: 0;
        color: #1e40af;
        font-size: 18px;
      }
      .interests-section {
        background-color: #f0f9ff;
        border-radius: 12px;
        padding: 20px;
        margin: 20px 0;
      }
      .interests-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 10px;
      }
      .interest-tag {
        background-color: #1e40af;
        color: white;
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
      }
      .button {
        display: inline-block;
        background: linear-gradient(to right, #1e40af, #3b82f6);
        color: white;
        text-decoration: none;
        padding: 12px 28px;
        border-radius: 50px;
        font-weight: 600;
        margin: 15px 0;
        text-align: center;
      }
      .divider {
        height: 1px;
        background-color: #eee;
        margin: 30px 0;
      }
      .footer {
        margin-top: 10px;
        background-color: #fcfcfc;
        font-size: 14px;
        color: #888;
        text-align: center;
        border-top: 1px solid #eee;
        padding: 25px 40px;
      }
      .social-links {
        margin: 20px 0;
      }
      .social-links a {
        display: inline-block;
        margin: 0 10px;
        color: #1e40af;
        text-decoration: none;
      }
      .footer-note {
        display: block;
        margin-top: 8px;
        font-size: 13px;
        color: #aaa;
      }
      
      @media only screen and (max-width: 600px) {
        .content {
          padding: 30px 20px;
        }
        .header {
          padding: 25px 15px;
          font-size: 26px;
        }
        .message-box {
          padding: 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <div class="header">
        Zabka MB Solutions
      </div>
      <div class="header-divider"></div>
      <div class="content">
        <h2><span class="emoji">🤝</span> Thank You for Your Partner Registration</h2>
        <p class="highlight">Dear ${name}, thank you for your interest in becoming a partner with Zabka MB Solutions! We've received your registration and are excited about the potential collaboration.</p>
        
        <p>We wanted to let you know that your partner registration has been successfully received. Our partnership team will review your application and get back to you within 2-3 business days.</p>
        
        <div class="interests-section">
          <h3>Your Areas of Interest:</h3>
          <div class="interests-list">
            ${interests.map(interest => `<span class="interest-tag">${interest}</span>`).join('')}
          </div>
        </div>
        
        <div class="message-box">
          <h3>What happens next?</h3>
          <p>Our partnership team will review your application and contact you to discuss the next steps. This may include:</p>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Initial discussion about partnership opportunities</li>
            <li>Documentation and verification process</li>
            <li>Training and onboarding sessions</li>
            <li>Agreement finalization</li>
          </ul>
        </div>
        
        <p>We're committed to building strong partnerships and look forward to working with you to provide excellent services to our customers.</p>
        
        <center><a href="http://zabkambsolutions.in/" class="button">Visit Our Website</a></center>
        
        <div class="divider"></div>
        
        <p>If you have any questions about the partnership process, please don't hesitate to contact us at <strong><a href="tel:+911171218473">+91 117121 8473</a></strong> or <strong><a href="mailto:info@zabkambsolutions.in">info@zabkambsolutions.in</a></strong>.</p>
      </div>
      <div class="footer">
        <div class="social-links">
          <a href="mailto:info@zabkambsolutions.in">Email Us</a> • 
          <a href="tel:+911171218473">Call Us</a>
        </div>
        Thank you for choosing Zabka MB Solutions as your business partner.
        <span class="footer-note">© 2025 Zabka MB Solutions. All rights reserved.</span>
      </div>
    </div>
  </body>
</html>`;
};

// MAIN FUNCTION
const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ isSuccess: false, message: "Only Post Method Is Allowed" });
  }
  try {
    await dbConnection();
    let { name, phone, email, interests, notes } = req.body;
    let { error } = partnerValidationSchema.validate({ name, phone, email, interests, notes });
    if (error) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "Validation Error", error });
    }
    let isDataExist = await PartnerModel.findOne({
      $or: [
        { email },
        { phone },
      ],
    });
    if (isDataExist) {
      return res
        .status(409)
        .json({ isSuccess: false, message: "Data Is Already Exist" });
    }

    let newPartner = new PartnerModel(req.body);
    let isSaved = await newPartner.save();
    if (isSaved) {
      await Promise.all([
        await sendMail(
          SMTP_MAIL,
          email,
          "Thank You for Your Partner Registration - Zabka MB Solutions",
          userTemplate(req.body)
        ),
        await sendMail(
          SMTP_MAIL,
          SMTP_MAIL,
          `New Partner Registration from ${name}`,
          firmTemplate(req.body)
        ),
      ]);
      res.status(201).json({
        isSuccess: true,
        message: "Partner Registration Submitted Successfully",
      });
    } else {
      return res.status(400).json({
        isSuccess: false,
        message: "Error While Submitting Partner Registration",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ isSuccess: false, message: "Internal Server Error" });
  }
};

export default handler;
