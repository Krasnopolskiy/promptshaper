# ✨ Prompt Shaper

> A powerful tool for creating, managing, and reusing AI prompt templates with customizable placeholders.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Usage Guide](#-usage-guide)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Building for Production](#-building-for-production)
- [Code Formatting](#-code-formatting)
- [Code Standards](#-code-standards)
- [Contributing](#-contributing)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

## 🚀 Overview

Prompt Shaper is a web application that helps you create consistent AI prompts by using reusable placeholder variables.
It's designed for teams and individuals who frequently work with AI systems and need to maintain consistency in their
prompts across different use cases.

With Prompt Shaper, you can:

- Create templates with dynamic placeholders
- Reuse common prompt structures
- Fill in placeholder values for specific use cases
- Preview the final prompt in real-time

## ✨ Features

- **🔄 Reusable Placeholders**: Create and manage placeholders that can be reused across multiple prompts
- **📝 Custom Templates**: Build and save prompt templates with your placeholders for consistent results
- **👁️ Real-time Preview**: See your completed prompt with all placeholders filled in as you type
- **🎨 Color Coding**: Visually organize your placeholders with custom colors for better recognition
- **📱 Mobile Responsive**: Use on any device with an optimized mobile interface
- **💾 Local Storage**: Templates and placeholders are saved in your browser's local storage
- **🔍 Syntax Highlighting**: Easy-to-read formatting of your prompts and placeholders
- **📤 Export/Copy**: Copy your completed prompts with a single click

## 🛠️ Tech Stack

- **🧬 Frontend**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **🎨 Styling**: [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components
- **📊 State Management**: React hooks and context
- **🧭 Routing**: [React Router](https://reactrouter.com/)
- **⚡ Build Tool**: [Vite](https://vitejs.dev/)
- **💾 Data Persistence**: Local storage
- **💅 Code Quality**: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)

## 🏁 Getting Started

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

## 📝 Usage Guide

### Creating Placeholders

1. Click the "Add Placeholder" button in the placeholders panel
2. Enter a name for your placeholder (e.g., "companyName", "productFeature")
3. Customize the color if desired
4. Add default content for the placeholder if needed

### Building Templates

1. Type your prompt in the editor, using placeholders with the syntax: `<placeholderName>`
2. As you type, the placeholders will be highlighted with their respective colors
3. The editor will automatically detect new placeholders and add them to your list

### Saving Templates

1. Click the "Save" button in the header
2. Enter a name for your template
3. Your template will be saved with all placeholders and their current values

### Loading Templates

1. Click the "Load" button in the header
2. Select a template from the list
3. The editor will load the template with all placeholders

### Generating Content

1. Fill in the values for each placeholder in the placeholder panel
2. See the real-time preview with all placeholders replaced
3. Copy the complete prompt with the "Copy" button

## 📂 Project Structure

```
promptshaper/
├── public/            # Static assets
├── src/               # Source code
│   ├── components/    # React components
│   │   ├── ui/        # UI components (shadcn/ui)
│   │   └── utils/     # Component utilities
│   ├── config/        # Configuration files
│   ├── hooks/         # Custom React hooks
│   │   └── toast/     # Toast notification utilities
│   ├── pages/         # Page components
│   ├── styles/        # CSS styles
│   ├── types/         # TypeScript type definitions
│   └── lib/           # Utility functions
├── .editorconfig      # Editor configuration
├── .eslintrc.json     # ESLint configuration
├── .prettierrc.json   # Prettier configuration
└── tailwind.config.ts # Tailwind CSS configuration
```

## 💻 Development

### Code Standards

This project follows strict code standards:

- Maximum file length: 200 lines
- Maximum function length: 10 lines
- Comprehensive documentation for all code

### Development Workflow

1. Create a feature branch from `main`
2. Make your changes
3. Run formatting and linting
4. Write or update tests
5. Submit a pull request

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run preview` - Preview production build locally

## 🏗️ Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory. You can preview the production build with:

```bash
npm run preview
```

## 💅 Code Formatting

This project uses Prettier for code formatting. The configuration is defined in `.prettierrc.json` and enforced across editors with `.editorconfig`.

### Prettier Configuration

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "trailingComma": "es5",
  "jsxSingleQuote": false,
  "plugins": [
    "prettier-plugin-tailwindcss"
  ]
}
```

### Formatting Commands

```bash
# Format all files
npm run format

# Check if files are formatted correctly
npm run format:check
```

### Editor Integration

VS Code users: Install the [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension for automatic formatting on save.

## 📏 Code Standards

The codebase follows these standards:

1. **File Organization**:

- Related components stay together
- Utilities properly separated into their own modules
- Consistent naming conventions

2. **Documentation**:

- All functions have JSDoc comments
- Complex logic is explained
- React components are documented with their props

3. **Performance Considerations**:

- Memoization where appropriate
- Efficient state management
- Avoiding unnecessary renders

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

Please make sure your code follows the project's coding standards, is well-documented, and passes all tests.

## ❓ Troubleshooting

### Common Issues

- **Placeholder not updating**: Make sure the placeholder name in the editor matches exactly (including case)
- **Template not saving**: Check if local storage is available in your browser
- **Styling issues**: Clear browser cache and reload

### Getting Help

If you encounter any issues, please:

1. Check the existing [issues](https://github.com/yourusername/promptshaper/issues) to see if it's already reported
2. Create a new issue with detailed information if needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide Icons](https://lucide.dev/) - Beautiful SVG icons
- [react-textarea-code-editor](https://github.com/uiwjs/react-textarea-code-editor) - Code editor component

