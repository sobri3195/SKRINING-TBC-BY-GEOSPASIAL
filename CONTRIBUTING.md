# Contributing to Sistem Skrining TBC Geospasial

Terima kasih atas minat Anda untuk berkontribusi! 🎉

## Development Setup

1. **Fork & Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/SKRINING-TBC-BY-GEOSPASIAL.git
   cd SKRINING-TBC-BY-GEOSPASIAL
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## Code Style

### TypeScript
- Gunakan TypeScript untuk type safety
- Definisikan types di `src/types/`
- Hindari `any` type

### React
- Gunakan Functional Components dengan Hooks
- Gunakan Context API untuk state management
- Tidak menggunakan class components

### Naming Conventions
- **Components**: PascalCase (e.g., `DashboardPage.tsx`)
- **Files**: camelCase untuk utils, PascalCase untuk components
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE

### Imports
```typescript
// External libraries first
import React from 'react';
import { Box, Typography } from '@mui/material';

// Internal modules
import { useData } from '../../contexts/DataContext';
import { TBCase } from '../../types';
```

## Project Structure

```
src/
├── modules/         # Feature modules (satu folder per fitur)
├── components/      # Reusable components
├── contexts/       # Context providers
├── data/           # Mock data
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Adding New Features

### 1. Create Module
```bash
mkdir src/modules/new-feature
touch src/modules/new-feature/NewFeaturePage.tsx
```

### 2. Add Types
```typescript
// src/types/index.ts
export interface NewFeature {
  id: string;
  name: string;
  // ...
}
```

### 3. Add Mock Data
```typescript
// src/data/mockData.ts
export const mockNewFeatures: NewFeature[] = [
  // ...
];
```

### 4. Create Context (if needed)
Jika fitur memerlukan state management global, tambahkan di Context API.

### 5. Add Route
```typescript
// src/App.tsx
<Route path="/new-feature" element={<NewFeaturePage />} />
```

### 6. Add Menu Item
```typescript
// src/components/Layout.tsx
{ text: 'New Feature', icon: <Icon />, path: '/new-feature' }
```

## Material-UI Guidelines

- Gunakan MUI v6 components
- Gunakan `sx` prop untuk styling
- Konsisten dengan theme yang ada
- Gunakan Grid untuk layout responsif

```typescript
<Box sx={{ p: 3, bgcolor: 'background.paper' }}>
  <Typography variant="h4">Title</Typography>
</Box>
```

## Testing

Saat ini project menggunakan demo mode tanpa unit tests.
Untuk production, disarankan menambahkan:
- Jest + React Testing Library
- E2E tests dengan Cypress

## Git Workflow

1. **Create Branch**
   ```bash
   git checkout -b feature/nama-fitur
   ```

2. **Commit Messages**
   Gunakan conventional commits:
   ```
   feat: add new dashboard widget
   fix: resolve map rendering issue
   docs: update README
   refactor: improve code structure
   ```

3. **Push & Pull Request**
   ```bash
   git push origin feature/nama-fitur
   ```
   Kemudian buat PR di GitHub.

## Code Review Checklist

Before submitting PR:
- [ ] Code berfungsi tanpa error
- [ ] TypeScript compile tanpa error
- [ ] Build berhasil (`npm run build`)
- [ ] Responsive di mobile & desktop
- [ ] Konsisten dengan style guide
- [ ] Tidak ada console.log yang tersisa
- [ ] Comments untuk logic yang kompleks

## Common Issues

### Grid API Issues
Material-UI v6 menggunakan Grid dengan `item` prop:
```typescript
<Grid container spacing={3}>
  <Grid item xs={12} md={6}>
    Content
  </Grid>
</Grid>
```

### Leaflet CSS
Pastikan leaflet CSS dimuat di `index.html`:
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
```

### Context API
Selalu wrap consumers dengan Provider:
```typescript
<AuthProvider>
  <DataProvider>
    <App />
  </DataProvider>
</AuthProvider>
```

## Resources

- [React Documentation](https://react.dev/)
- [Material-UI Docs](https://mui.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Router](https://reactrouter.com/)
- [Leaflet](https://leafletjs.com/)

## Questions?

Jika ada pertanyaan, silakan:
1. Cek dokumentasi di README.md
2. Buka issue di GitHub
3. Hubungi maintainer

---

Terima kasih telah berkontribusi! 🙏
