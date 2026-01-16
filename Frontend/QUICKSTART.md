# Quick Start Guide

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - The app will be available at `http://localhost:5173` (or the port shown in terminal)
   - Navigate between pages using the header navigation

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Troubleshooting

### Map not displaying?
- Ensure Leaflet CSS is loaded (check browser console)
- Clear browser cache and reload

### Styling issues?
- Make sure Tailwind CSS is properly configured
- Run `npm install` to ensure all dependencies are installed

### Port already in use?
- Vite will automatically try the next available port
- Or specify a port: `npm run dev -- --port 3000`
