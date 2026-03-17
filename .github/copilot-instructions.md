# CW Mathebula & Associates - AI Agent Instructions

## Project Overview

Law firm website built with Vite + React + TypeScript, using shadcn/ui components and a custom design system themed around navy and gold branding. Single-page application with smooth scrolling navigation.

## Architecture

### Tech Stack

- **Build**: Vite 5.4+ with SWC for fast React compilation
- **Framework**: React 18.3+ with TypeScript 5.8+
- **Routing**: React Router DOM (single Index page + NotFound catch-all)
- **UI**: shadcn/ui components (Radix primitives + Tailwind)
- **State**: TanStack Query for server state
- **Styling**: Tailwind CSS with custom design tokens

### Project Structure

```
src/
  pages/Index.tsx          # Main landing page (composition of all sections)
  components/              # Section components (Hero, About, PracticeAreas, etc.)
  components/ui/           # shadcn/ui primitives (DO NOT edit manually)
  lib/utils.ts             # cn() utility for className merging
  index.css                # Design system tokens (CSS variables)
```

## Design System

### Color Palette

All colors use HSL format with CSS custom properties defined in `src/index.css`:

- **Navy**: Primary brand color (`--navy-dark`, `--navy-primary`, `--navy-light`)
- **Gold**: Accent/secondary color (`--gold-primary`, `--gold-light`)
- Use semantic tokens: `bg-navy`, `text-gold`, `border-gold`, etc.

### Custom Tokens

- **Gradients**: `bg-gradient-hero`, `bg-gradient-primary`, `bg-gradient-gold`
- **Shadows**: `shadow-elegant`, `shadow-gold`
- **Transitions**: `transition-smooth` (300ms cubic-bezier easing)

### Typography & Spacing

- Headings: Use bold weights with gold accents for emphasis (`<span className="text-gold">`)
- Sections: Standard `py-20` padding, gold underline dividers (`h-1 bg-gold`)
- Responsive: Mobile-first with `md:` and `lg:` breakpoints

## Development Patterns

### Component Structure

All section components follow this pattern:

```tsx
const SectionName = () => {
  return (
    <section id="section-name" className="py-20 bg-navy">
      <div className="container mx-auto px-6">
        {/* Header with gold accent */}
        <h2 className="text-4xl font-bold text-primary-foreground mb-6">
          Title <span className="text-gold">Accent</span>
        </h2>
        <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
        {/* Content */}
      </div>
    </section>
  );
};
```

### Navigation

- Smooth scroll via `document.getElementById('section-id')?.scrollIntoView({ behavior: 'smooth' })`
- All sections have `id` attributes matching navigation targets
- Header uses `<button onClick={scrollToSection}>` pattern (not anchor tags)

### Image Assets

- Stored in `/public/` and `/src/assets/` directories
- Public images: Reference with `/filename.png` (no `public/` prefix)
- Asset imports: Use `import imageName from "@/assets/filename.jpg"`
- Use `img` tags with descriptive `alt` text for accessibility

### Icons

- Lucide React for icons (`import { IconName } from "lucide-react"`)
- Consistent sizing: `w-12 h-12` for section features
- Hover animations: `group-hover:scale-110 transition-transform duration-300`

## Key Workflows

### Development

```bash
npm run dev        # Start dev server on http://[::]:8080
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # ESLint check
```

### Adding shadcn/ui Components

Use the shadcn CLI (components defined in `components.json`):

```bash
npx shadcn@latest add [component-name]
```

Components auto-install to `src/components/ui/` with `@/` import alias.

### Path Aliases

- `@/` maps to `src/` (configured in `vite.config.ts` and `tsconfig.json`)
- Always use: `import { Button } from "@/components/ui/button"`

## TypeScript Configuration

### Relaxed Type Checking (Current)

- `noImplicitAny: false` - Allows implicit any types
- `strictNullChecks: false` - Null/undefined not strictly enforced
- `noUnusedParameters: false` - Unused params allowed
- `noUnusedLocals: false` - Unused variables allowed

When adding code, match this permissive style (no strict null checks required).

## Styling Conventions

### className Patterns

1. **Utility-first**: Use Tailwind utilities directly
2. **Merge with cn()**: For conditional classes: `cn("base-class", condition && "conditional-class")`
3. **Hover effects**: Always include transitions: `hover:shadow-gold transition-all duration-300`
4. **Responsive**: Mobile-first, then `md:` (768px+) and `lg:` (1024px+)

### Common Patterns

```tsx
// Card hover effect
className="group hover:shadow-gold transition-all duration-300 hover:-translate-y-2"

// Gold accent text
<span className="text-gold">Highlighted</span>

// Section heading
className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6"

// Icon animation
className="w-12 h-12 text-gold group-hover:scale-110 transition-transform duration-300"
```

## Known Constraints

- **Single Page**: All content on Index route with smooth scrolling (no multi-page routing)
- **No Mobile Menu**: Mobile hamburger button exists but not implemented (UI only)
- **Static Content**: No backend/API integration (contact form would need external service)

## When Making Changes

1. **New Sections**: Add to `src/pages/Index.tsx` and create component in `src/components/`
2. **Styling**: Extend design tokens in `src/index.css` and `tailwind.config.ts` simultaneously
3. **UI Components**: Use shadcn CLI, never manually create in `components/ui/`
4. **Navigation**: Update Header links and ensure section has matching `id` attribute
5. **Icons/Images**: Use Lucide for icons, import images from `@/assets/` or use public images with `/filename.png`

## Testing & Quality

- **No test suite configured** - Manual browser testing required
- **Linting**: ESLint configured with relaxed rules (`@typescript-eslint/no-unused-vars: off`)
- **Build check**: Always run `npm run build` before considering work complete
