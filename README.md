# Prompt Shaper

A powerful tool for creating, managing, and reusing AI prompt templates with customizable placeholders.

## Overview

Prompt Shaper is a web application that helps you create consistent AI prompts by using reusable placeholder variables. It's designed for teams and individuals who frequently work with AI systems and need to maintain consistency in their prompts across different use cases.

## Features

- **Reusable Placeholders**: Create and manage placeholders that can be reused across multiple prompts
- **Custom Templates**: Build and save prompt templates with your placeholders for consistent results
- **Real-time Preview**: See your completed prompt with all placeholders filled in as you type
- **Color Coding**: Visually organize your placeholders with custom colors for better recognition
- **Mobile Responsive**: Use on any device with an optimized mobile interface

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React hooks and context
- **Routing**: React Router
- **Build Tool**: Vite
- **Data Persistence**: Local storage

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/promptshaper.git
   cd promptshaper
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Create Placeholders**: Define reusable variables like customer names, product features, or specific parameters
2. **Build Templates**: Create prompt templates that incorporate your custom placeholders
3. **Fill in Values**: Replace placeholders with actual values for each specific use case
4. **Generate Content**: Use your completed prompt to generate perfect AI content every time

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)