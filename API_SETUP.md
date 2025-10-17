# Zabka MB Solutions - Contact Form API Setup

## Environment Variables Required

Create a `.env.local` file in your project root with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/zabka-contacts

# SMTP Configuration
SMTP_HOST_NAME=smtp.gmail.com
SMTP_PORT=587
SECURE=false
SMTP_MAIL=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Vercel Deployment

1. Install dependencies:
```bash
npm install
```

2. Deploy to Vercel:
```bash
vercel
```

3. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to Environment Variables
   - Add all the variables from the `.env.local` file

## API Endpoints

### Contact Form API
- Local: `http://localhost:3000/api/contactApis`
- Production: `https://your-domain.vercel.app/api/contactApis`

### Partner Registration API
- Local: `http://localhost:3000/api/partnerApis`
- Production: `https://your-domain.vercel.app/api/partnerApis`

### Career Application API
- Local: `http://localhost:3000/api/careerApis`
- Production: `https://your-domain.vercel.app/api/careerApis`

## Features

- ✅ Form validation with Joi
- ✅ MongoDB integration for data storage
- ✅ Email notifications (both to customer and admin)
- ✅ Duplicate email/phone prevention
- ✅ Responsive email templates
- ✅ Error handling and user feedback
- ✅ SweetAlert2 integration for better UX

## Email Templates

The API sends two types of emails:
1. **Customer Confirmation**: Sent to the customer who submitted the form
2. **Admin Notification**: Sent to the admin with form details

Both emails are styled with Zabka MB Solutions branding and colors.

## Form Fields

### Contact Form
- `name` - Full name (required)
- `email` - Email address (required, validated)
- `number` - Phone number (required, 10 digits)
- `message` - Message content (required)

### Partner Registration Form
- `name` - Full name (required)
- `email` - Email address (required, validated)
- `phone` - Phone number (required, 10 digits)
- `interests` - Array of selected interests (required, at least one)
- `notes` - Additional notes/area details (optional)

### Career Application Form
- `fullName` - Full name (required)
- `email` - Email address (required, validated)
- `phone` - Phone number (required, 10 digits)
- `position` - Position applied for (required)
- `experience` - Work experience (required)
- `location` - Preferred location (required)
- `skills` - Skills and qualifications (required)
- `coverLetter` - Cover letter (required)
- `resume` - Resume link (optional)
