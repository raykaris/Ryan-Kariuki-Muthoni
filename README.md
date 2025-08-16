# My Portfolio

A modern, responsive developer portfolio built with [Vite](https://vitejs.dev/), React, and Tailwind CSS.  
.

---

## Features

- **Project Showcase:** Display web and mobile projects with live demo and code links.
- **Contact Form:** Users can send you a message directly to your email via EmailJS.
- **Social Links:** Connect with GitHub, LinkedIn, Twitter, and Email.
- **WhatsApp Button:** Floating button for instant WhatsApp chat.
- **Animated UI:** Framer Motion-powered transitions and effects.
- **Responsive Design:** Looks great on all devices.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <REPO-LINK>
   cd <repo-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the project root:

   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

   > Get these values from your [EmailJS dashboard](https://dashboard.emailjs.com/).

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

---

## Usage

- **Projects:** Edit `src/components/ProjectsSection.tsx` to add or update your projects.
- **Contact Form:** Messages are sent to your email via EmailJS. Configure your template to use `{{from_name}}`, `{{from_email}}`, `{{subject}}`, and `{{message}}`.
- **Social Links:** Update `src/components/ContactSection.tsx` to change your social profiles.
- **WhatsApp Button:** The floating button opens a chat.

---

## Customization

- **Styling:** Uses Tailwind CSS for easy customization.
- **Icons:** Powered by [Lucide](https://lucide.dev/) for modern SVG icons.
- **Animations:** Framer Motion for smooth transitions.

---


## License

MIT

---

## Credits

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [EmailJS](https://www.emailjs.com/)
- [Lucide Icons](https://lucide.dev/)

---

## Contact

Feel free to reach out via the contact form or connect