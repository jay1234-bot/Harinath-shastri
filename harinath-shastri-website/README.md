# Harinath Shastri - Astrological Website

This is a fully animated website for Harinath Shastri, featuring astrological services, user authentication, and contact information.

## Features

- Responsive design with animations
- User authentication with Supabase (email/phone login)
- Services showcase
- Contact form with Tally.so integration
- Privacy policy page
- Modern UI with smooth animations

## Setup Instructions

### 1. Image Placement

You need to add the following images to complete the website:

- **Logo**: Add your logo image to the `img` folder and update the reference in the navbar logo-circle in `index.html`
- **Background Images**: 
  - Main background: Update the background-image URL in `styles.css` (line 36)
  - Hero section background: Update the background-image URL in `styles.css` (line 195)
  - Privacy policy background: Update the background-image URL in `privacy-policy.css` (line 8)

### 2. Supabase Setup

The website is already configured with your Supabase credentials:
- URL: https://difwpejnqdmwopgkxzzq.supabase.co
- API Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpZndwZWpucWRtd29wZ2t4enpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNDgwOTEsImV4cCI6MjA1ODkyNDA5MX0.aE_otzbxot5eOBZ3U8aZX16KH8knbxfpWEwN4MTly6Y

You need to create a `profiles` table in your Supabase database with the following columns:
- `id` (uuid, primary key)
- `full_name` (text)
- `email` (text, nullable)
- `phone` (text, nullable)
- `created_at` (timestamp with timezone)

### 3. Hosting

You can host this website on any static web hosting service like:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

## File Structure

```
harinath-shastri-website/
├── index.html           # Main website page
├── styles.css           # Main CSS styles
├── script.js            # Main JavaScript functionality
├── login.html           # Login/Signup page
├── login-styles.css     # Login page styles
├── login-script.js      # Login functionality with Supabase
├── privacy-policy.html  # Privacy policy page
├── privacy-policy.css   # Privacy policy styles
└── img/                 # Images directory
    ├── login.svg        # Login page illustration
    └── register.svg     # Register page illustration
```

## Customization

Feel free to customize the website by:
1. Changing the color scheme in the CSS variables (`:root` section in `styles.css`)
2. Adding more services or sections to the homepage
3. Updating the content to match your specific requirements
4. Adding more animations or interactive elements

## Contact

For any questions or support, please contact the developer.
