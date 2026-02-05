# Modern Portfolio Website

A beautiful, responsive personal portfolio website built with Next.js and Tailwind CSS.

## Features

- 🎨 Modern, clean design with dark mode support
- 📱 Fully responsive for all devices
- ⚡ Fast loading with Next.js optimization
- 🎯 Smooth scrolling navigation
- 📧 Contact form with validation
- 🚀 Easy to customize and deploy

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Personal Information

1. Update your name and tagline in `components/hero-section.tsx`
2. Replace the profile image and bio in `components/about-section.tsx`
3. Update contact information in `components/contact-section.tsx`

### Projects

Add your projects by editing the `projects` array in `components/projects-section.tsx` or use the `data/projects.json` file:

\`\`\`json
{
  "title": "Your Project",
  "description": "Project description",
  "image": "/path/to/image.jpg",
  "technologies": ["React", "Node.js"],
  "liveUrl": "https://yourproject.com",
  "githubUrl": "https://github.com/username/project"
}
\`\`\`

### Skills

Update your skills in the `skills` array in `components/about-section.tsx`.

### Social Links

Update social media links in:
- `components/hero-section.tsx`
- `components/contact-section.tsx`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with one click

### Netlify

1. Build the project:
\`\`\`bash
npm run build
\`\`\`

2. Deploy the `out` folder to [Netlify](https://netlify.com)

### GitHub Pages

1. Install gh-pages:
\`\`\`bash
npm install --save-dev gh-pages
\`\`\`

2. Add to package.json:
\`\`\`json
{
  "scripts": {
    "deploy": "gh-pages -d out"
  }
}
\`\`\`

3. Deploy:
\`\`\`bash
npm run build
npm run deploy
\`\`\`

## Technologies Used

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Fonts:** Geist Sans & Geist Mono
- **Theme:** next-themes for dark mode

## License

MIT License - feel free to use this template for your own portfolio!
