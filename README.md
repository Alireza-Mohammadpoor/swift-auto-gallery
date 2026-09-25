# Swift Auto Gallery

A premium bilingual automotive showroom website for **Swift Auto Gallery**, located in Kish Island, Iran.

The website is designed to provide a cinematic and modern digital showroom experience while allowing the gallery administrator to manage the vehicle inventory through a secure private admin panel.

## ✨ Features

* 🇮🇷 Persian RTL interface
* 🇬🇧 English LTR interface
* Premium automotive showroom design
* Responsive design for mobile, tablet, and desktop
* Vehicle inventory management
* Vehicle details pages
* Featured and available vehicle states
* Vehicle image management
* Secure admin authentication
* Supabase PostgreSQL database
* Supabase Storage for vehicle images
* Row Level Security (RLS)
* SEO-friendly structure
* Open Graph metadata
* Structured data
* WhatsApp integration
* Phone and Instagram contact options
* Loading, empty, and error states
* Optimized production build

## 🛠️ Tech Stack

* React
* TypeScript
* Vite
* React Router
* Tailwind CSS
* shadcn/ui
* Lucide Icons
* Supabase
* PostgreSQL
* Supabase Storage
* Supabase Authentication

## 📁 Main Routes

### Public

```text
/
├── /vehicles
├── /vehicles/:id
├── /services
├── /about
└── /contact
```

### Admin

```text
/admin/login
/admin
/admin/vehicles
/admin/vehicles/new
/admin/vehicles/:id/edit
```

## 🚗 Vehicle Management

The admin panel allows the gallery administrator to:

* Add vehicles
* Edit vehicle information
* Delete vehicles
* Publish/unpublish vehicles
* Mark vehicles as featured
* Change availability
* Upload vehicle images
* Delete vehicle images
* Reorder vehicle images

Vehicle information includes:

* Brand
* Model
* Trim
* Year
* Price in AED
* Mileage
* Fuel type
* Transmission
* Engine
* Engine size
* Body type
* Color
* Regional specification
* Country
* Persian description
* English description
* Vehicle images
* Availability
* Featured status
* Published status

## 🔐 Authentication

The admin panel uses **Supabase Authentication**.

Only the authorized administrator should have access to the management panel.

No administrator credentials are hardcoded into the frontend.

## 🗄️ Database

The project uses Supabase PostgreSQL for vehicle inventory data.

Row Level Security (RLS) is used to control database access.

Public visitors can access published vehicle information, while administrative operations require authenticated access.

## 🖼️ Image Storage

Vehicle images are stored using **Supabase Storage**.

Images are uploaded and managed directly through the admin panel.

No external vehicle image API is required.

## 🌐 Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Never commit the `.env` file to Git.

For deployment, configure the same environment variables in the hosting provider.

## 🚀 Local Development

Clone the repository:

```bash
git clone https://github.com/Alireza-Mohammadpoor/swift-auto-gallery.git
```

Enter the project:

```bash
cd swift-auto-gallery
```

Install dependencies:

```bash
npm install
```

Create your `.env` file and add the required Supabase variables.

Start the development server:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

## 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🏢 Business Information

**Swift Auto Gallery**

Kish Island, Iran
Next to Goldis Gas Station

Phone:

```text
09347699899
```

Instagram:

```text
@swift.autogallery
```

## 📞 Customer Contact

Customers can contact Swift Auto Gallery through:

* Phone
* WhatsApp
* Instagram

The website does not require a customer registration system or customer inquiry form.

## 💰 Currency

All vehicle prices are displayed in:

**AED — United Arab Emirates Dirham**

No currency conversion or exchange-rate API is used.

## 🚫 External Vehicle API

The project intentionally does not depend on:

* Vehicle marketplace APIs
* Dubizzle
* DubiCars
* Scraping services
* External vehicle databases
* Third-party vehicle inventory APIs

All inventory is managed directly through the Swift Auto Gallery admin panel.

## 📱 PWA

This project does not use PWA functionality or service workers.

## 📄 License

This project is developed for Swift Auto Gallery.

All business content, branding, vehicle information, images, and related materials belong to their respective owners.
