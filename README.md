# Dashboard Pilot - React Dashboard with Botpress Integration

A modern, responsive dashboard application built with React, TypeScript, and Material UI, featuring seamless integration with Botpress for intelligent data management and chatbot capabilities.

<img width="1840" height="1191" alt="image" src="https://github.com/user-attachments/assets/5d945a6f-7354-4245-b92e-f9b4314a07b3" />




## 🚀 Features

- **Modern Dashboard Interface**: Built with Material UI components and responsive design
- **Multiple Dashboard Templates**: Including analytics, employee management, and data visualization
- **Botpress Integration**: Upload dashboard data to Botpress tables for AI-powered insights
- **TypeScript Support**: Full type safety throughout the application
- **Fast Development**: Powered by Vite with HMR and optimized build process

## 🛠️ Built With

- **[React](https://reactjs.org/)** - Frontend library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vitejs.dev/)** - Build tool and dev server
- **[Material UI](https://mui.com/)** - UI component library
- **[Material UI Templates](https://mui.com/material-ui/getting-started/templates/)** - Dashboard templates and components
- **[Botpress](https://botpress.com/)** - Conversational AI platform integration

## 🎨 Dashboard Templates

This project leverages several Material UI dashboard templates:
- Analytics Dashboard
- Employee Management (CRUD operations)
- Data Visualization Charts
- User Authentication (Sign-in/Sign-up)
- Profile Management

## 🤖 Botpress Integration

Connect your dashboard data with Botpress to create intelligent chatbots that can answer questions about your business data:
- Automatic data sync to Botpress tables
- Support for multiple data sources (employees, analytics, statistics, sessions)
- Bulk upload capabilities
- Real-time data formatting and validation

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dashboard-pilot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Botpress credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📝 Environment Configuration

Create a `.env.local` file with your Botpress credentials:

```bash
VITE_BOTPRESS_BOT_ID=your_bot_id_here
VITE_BOTPRESS_TOKEN=your_personal_access_token_here
VITE_BOTPRESS_WORKSPACE_ID=your_workspace_id_here
```

See `.env.example` for detailed setup instructions.

## 📚 Development Setup

Currently, two official Vite plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## 🏗️ Project Structure

```
src/
├── botpress/           # Botpress integration components
├── dashboard/          # Main dashboard components
├── crud-dashboard/     # Employee management features
├── shared-theme/       # Material UI theme configuration
├── sign-in/           # Authentication components
└── examples/          # Usage examples
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Material UI](https://mui.com/) for the excellent component library and templates
- [Botpress](https://botpress.com/) for the powerful conversational AI platform
- The React and TypeScript communities for their amazing tools and resources

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
