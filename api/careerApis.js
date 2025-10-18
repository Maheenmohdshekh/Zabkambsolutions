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
const careerSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "* Full Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "* Email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "* Phone is required"],
    },
    position: {
      type: String,
      required: [true, "* Position is required"],
      trim: true,
    },
    experience: {
      type: String,
      required: [true, "* Experience is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "* Location is required"],
      trim: true,
    },
    skills: {
      type: String,
      required: [true, "* Skills are required"],
      trim: true,
    },
    coverLetter: {
      type: String,
      required: [true, "* Cover Letter is required"],
      trim: true,
    },
    resume: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// MONGODB MODELS
const CareerModel =
  mongoose.models.careerModel || mongoose.model("careerModel", careerSchema);

// VALIDATION SCHEMA
const careerValidationSchema = joi.object({
  fullName: joi.string().required().messages({
    "string.base": "* Full Name Must Be String",
    "string.required": "* Full Name Is Required",
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
  position: joi.string().required().messages({
    "string.base": "* Position Must Be String",
    "string.required": "* Position is required",
  }),
  experience: joi.string().required().messages({
    "string.base": "* Experience Must Be String",
    "string.required": "* Experience is required",
  }),
  location: joi.string().required().messages({
    "string.base": "* Location Must Be String",
    "string.required": "* Location is required",
  }),
  skills: joi.string().required().messages({
    "string.base": "* Skills Must Be String",
    "string.required": "* Skills are required",
  }),
  coverLetter: joi.string().required().messages({
    "string.base": "* Cover Letter Must Be String",
    "string.required": "* Cover Letter is required",
  }),
  resume: joi.string().allow('').optional(),
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
  let { fullName, email, phone, position, experience, location, skills, coverLetter, resume } = data;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Career Application - Zabka MB Solutions</title>
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
          .cover-letter-cell {
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
            <h2><span class="emoji">💼</span> New Career Application</h2>
            <p class="highlight">You have received a new career application with the following details:</p>
            <table>
              <tr>
                <th>Full Name</th>
                <td>${fullName}</td>
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
                <th>Position Applied</th>
                <td>${position}</td>
              </tr>
              <tr>
                <th>Experience</th>
                <td>${experience}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>${location}</td>
              </tr>
              <tr>
                <th>Skills</th>
                <td>${skills}</td>
              </tr>
              <tr>
                <th>Cover Letter</th>
                <td class="cover-letter-cell">${coverLetter}</td>
              </tr>
              ${resume ? `<tr>
                <th>Resume</th>
                <td><a href="${resume}" target="_blank">View Resume</a></td>
              </tr>` : ''}
            </table>
          </div>
          <div class="footer">
            This email was automatically generated by your website's career application form.
            <span class="footer-note">Please do not reply directly to this email.</span>
          </div>
        </div>
      </body>
    </html>
      `;
};

// User Template (for applicant)
const userTemplate = (data) => {
  let { fullName, email, phone, position, experience, location, skills, coverLetter, resume } = data;
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Your Application - Zabka MB Solutions</title>
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
      .application-details {
        background-color: #f0f9ff;
        border-radius: 12px;
        padding: 20px;
        margin: 20px 0;
      }
      .application-details h3 {
        margin-top: 0;
        color: #1e40af;
        font-size: 18px;
      }
      .detail-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        padding-bottom: 8px;
        border-bottom: 1px solid #e0f2fe;
      }
      .detail-label {
        font-weight: 600;
        color: #1e40af;
      }
      .detail-value {
        color: #555;
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
        .detail-row {
          flex-direction: column;
        }
        .detail-label {
          margin-bottom: 4px;
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
        <h2><span class="emoji">💼</span> Thank You for Your Application</h2>
        <p class="highlight">Dear ${fullName}, thank you for your interest in joining Zabka MB Solutions! We've received your application for the ${position} position and appreciate your interest in our company.</p>
        
        <div class="application-details">
          <h3>Application Summary</h3>
          <div class="detail-row">
            <span class="detail-label">Position Applied:</span>
            <span class="detail-value">${position}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Experience:</span>
            <span class="detail-value">${experience}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Location:</span>
            <span class="detail-value">${location}</span>
          </div>
        </div>
        
        <p>We wanted to let you know that your application has been successfully received. Our HR team will review your application and get back to you within 5-7 business days.</p>
        
        <div class="message-box">
          <h3>What happens next?</h3>
          <p>Our HR team will carefully review your application and qualifications. If your profile matches our requirements, we will contact you for the next steps, which may include:</p>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Initial phone screening</li>
            <li>Technical/HR interview</li>
            <li>Final interview with management</li>
            <li>Reference checks</li>
          </ul>
        </div>
        
        <p>We're excited about the possibility of you joining our team and contributing to our mission of providing excellent financial and digital solutions.</p>
        
        <center><a href="http://zabkambsolutions.in/" class="button">Visit Our Website</a></center>
        
        <div class="divider"></div>
        
        <p>If you have any questions about your application, please don't hesitate to contact us at <strong><a href="tel:+911171218473">+91 117121 8473</a></strong> or <strong><a href="mailto:info@zabkambsolutions.in">info@zabkambsolutions.in</a></strong>.</p>
      </div>
      <div class="footer">
        <div class="social-links">
          <a href="mailto:info@zabkambsolutions.in">Email Us</a> • 
          <a href="tel:+911171218473">Call Us</a>
        </div>
        Thank you for choosing Zabka MB Solutions.
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
    let { fullName, phone, email, position, experience, location, skills, coverLetter, resume } = req.body;
    let { error } = careerValidationSchema.validate({ fullName, phone, email, position, experience, location, skills, coverLetter, resume });
    if (error) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "Validation Error", error });
    }

    let newCareer = new CareerModel(req.body);
    let isSaved = await newCareer.save();
    if (isSaved) {
      await Promise.all([
        await sendMail(
          SMTP_MAIL,
          email,
          "Thank You for Your Application - Zabka MB Solutions",
          userTemplate(req.body)
        ),
        await sendMail(
          SMTP_MAIL,
          SMTP_MAIL,
          `New Career Application from ${fullName}`,
          firmTemplate(req.body)
        ),
      ]);
      res.status(201).json({
        isSuccess: true,
        message: "Career Application Submitted Successfully",
      });
    } else {
      return res.status(400).json({
        isSuccess: false,
        message: "Error While Submitting Career Application",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ isSuccess: false, message: "Internal Server Error" });
  }
};

export default handler;

