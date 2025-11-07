---
title: "OnePortal: Unified Micro-Frontend Experience"
date: "2025-11-05"
description: "How we built a modern micro-frontend portal using Turborepo, Vite, and Module Federation to replace dozens of disconnected apps with a unified, scalable solution."
tags: ["TypeScript", "React", "Micro-Frontends", "Architecture", "Case Study"]
---

> **"Turning dozens of disjointed internal tools into a cohesive, modern portal."**

Over the years our organization built dozens of internal tools. Whenever a team needed a front-end, they reached for **SharePoint Online**. It gave us authentication out of the box, but each team designed its own UI without shared components or theme guidelines. Customizing SharePoint via the SharePoint Framework was cumbersome and meant sticking to Microsoft's deployment strategy. The result: *every application looked different and felt disjointed*. We needed a **central place to host micro-frontends**, unify design and authentication, and dramatically improve the developer experience.

## Why We Created OnePortal

OnePortal is a monorepo that combines modern tools-**Turborepo**, **Vite** and **TypeScript**-to create a **micro-frontend portal** that solves the problems we faced with SharePoint. It allows independent teams to build remote applications that plug into a shell but share a **consistent UI**, **centralized theme**, and **unified authentication**. 

A Turborepo generator scaffolds new remote apps with module federation, MSAL configuration, routing, layout and TypeScript support. A shared UI package exposes design tokens and components, while the shell application handles styling and theme. Remote applications can run stand-alone in development or be federated into the shell for a seamless user experience.

### The Problem with SharePoint

Our SharePoint-based approach had several critical issues:

1. **Inconsistent UX** - Every team created their own design system, resulting in 30+ different visual styles across internal tools
2. **Complex customization** - SharePoint Framework (SPFx) added significant overhead and locked us into Microsoft's deployment model
3. **No code reuse** - Common patterns like data tables, forms, and navigation were rebuilt from scratch for each app
4. **Poor developer experience** - Setting up a new SharePoint app took days and required deep SPFx knowledge

OnePortal addresses all of these by providing a modern, developer-friendly alternative that still integrates with our Azure/Microsoft ecosystem.

## Architectural Overview

OnePortal follows a **micro-frontend architecture** based on **Module Federation**. The monorepo contains a shell application and multiple remote applications under `apps/`. The shell loads remote apps dynamically and provides global resources like authentication and CSS.

### Repository Structure

```
oneportal/
├── apps/
│   ├── shell/                    # Host application
│   ├── remote-oneportal-admin/   # Admin micro-frontend
│   └── remote-{app-name}/        # Additional remotes
├── packages/
│   ├── ui/                       # Shared component library
│   ├── auth/                     # Unified MSAL authentication
│   ├── config/                   # Shared configuration
│   ├── types/                    # TypeScript types
│   └── tailwind-config/          # Design tokens
└── turbo/
    └── generators/               # App scaffolding
```

The `packages/` directory holds shared libraries:

- **`@one-portal/ui`** - A React component library built with [shadcn/ui](https://ui.shadcn.com/) and Tailwind CSS. It compiles all styles into a single CSS file that the shell imports once.

- **`@one-portal/auth`** - Unified authentication utilities built on Microsoft's MSAL library. It exposes a factory to create MSAL instances and a `MsalInitializer` class that handles host vs. remote initialization and cross-app SSO events.

- **`@one-portal/config`, `@one-portal/types`, `@one-portal/tailwind-config`** - Shared configuration, TypeScript types and design tokens.

### Tailwind CSS v4 Integration

The repository uses **Tailwind CSS v4** with a centralized configuration. A single source of design tokens lives in `packages/tailwind-config`, and the `@one-portal/ui` package builds a compiled CSS file. 

**Remote apps never include their own Tailwind configuration.** Instead they import components from the UI package and, in development, conditionally import the compiled CSS. This approach avoids CSS duplication and ensures that every application adheres to the same look and feel.

```typescript
// Remote apps import compiled styles in dev mode only
if (import.meta.env.DEV) {
  await import('@one-portal/ui/styles.css');
}
```

This pattern means the shell controls styling globally while remotes remain lightweight and consistent.

## Simplifying Module Federation

OnePortal takes full advantage of **Module Federation** to stitch together independent micro-frontends at runtime. Rather than hard-coding remotes into the host build, the shell uses the `@originjs/vite-plugin-federation` plugin with an **empty remotes object** and a list of shared dependencies like `react`, `react-dom`, `@tanstack/react-router`, `react-query` and `zustand`.

```typescript
// apps/shell/vite.config.ts
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {}, // Dynamically loaded at runtime
      shared: {
        react: { singleton: true, requiredVersion: '^19.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
        '@tanstack/react-router': { singleton: true },
        // ... other shared deps
      },
    }),
  ],
});
```

This tells Vite to expose the shell as a federation host and share its libraries, but leaves actual remote applications to be loaded dynamically.

### Remote Configuration

Remote applications configure their own module federation plugin. For example, the **OnePortal Admin** remote declares a unique name, outputs a `remoteEntry.js` file and exposes its `App` and `bootstrap` modules while sharing the same set of dependencies:

```typescript
// apps/remote-oneportal-admin/vite.config.ts
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'oneportalAdmin',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
        './bootstrap': './src/bootstrap',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^19.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
        // ... matches shell's shared deps
      },
    }),
  ],
});
```

The build script ensures that only one copy of React or TanStack Router ends up in the final bundle.

### Dynamic Remote Loading

At runtime the shell discovers remotes via a **remote loader service**. The `remoteLoader.ts` module defines a `RemoteMetadata` type (name, URL, slug, icon) and provides functions to **load**, **mount** and **unmount** remotes.

```typescript
export async function loadRemote(remote: RemoteMetadata): Promise<RemoteApp> {
  // Fetch and cache remoteEntry.js
  await loadRemoteScript(remote.url);
  
  // Import bootstrap module (or fallback to App)
  try {
    const module = await import(/* @vite-ignore */ `${remote.name}/bootstrap`);
    return module;
  } catch {
    const module = await import(/* @vite-ignore */ `${remote.name}/App`);
    return { default: module.default };
  }
}
```

The `mountRemote()` function creates a React root for the remote and passes it props like `mode` and `appName`, while `unmountRemote()` cleans up the root when navigation changes.

### Bootstrap Pattern

Each remote exposes a **bootstrap script** that wires everything together. It imports the remote's `App` component, wraps it in `UnifiedAuthProvider` and exports `mount()` and `unmount()` functions so the host can control its lifecycle:

```typescript
// apps/remote-oneportal-admin/src/bootstrap.tsx
import { createRoot } from 'react-dom/client';
import { UnifiedAuthProvider } from '@one-portal/auth';
import App from './App';

export function mount(element: HTMLElement, props) {
  const { msalInstance, getAuthConfig, debug, publicRoutes } = props;
  const root = createRoot(element);
  
  root.render(
    <UnifiedAuthProvider
      msalInstance={msalInstance}
      mode="remote"
      appName="oneportal-admin"
      getAuthConfig={getAuthConfig}
      debug={debug}
      publicRoutes={publicRoutes}
    >
      <App />
    </UnifiedAuthProvider>
  );
  
  return () => root.unmount();
}
```

This pattern means remotes can be developed and tested independently but still plug into the shell with unified styling and authentication.

**Because the shell does not list remotes at build time, new micro-frontends can be added without redeploying the host.** Teams simply deploy their remote to an Azure Static Web App, register its URL and metadata in the shell's configuration, and the remote loader handles the rest.

## Unified Authentication with MSAL

OnePortal abstracts authentication using **Microsoft Authentication Library (MSAL)** but hides its complexity behind a factory function and initializer.

### Factory Pattern

The `createMsalInstanceWithConfig` factory returns an MSAL instance and the app's auth configuration:

```typescript
import { createMsalInstanceWithConfig } from '@one-portal/auth';

// Create MSAL instance using the factory function
const { instance, authConfig } = createMsalInstanceWithConfig('shell');

export const msalInstance = instance;
export function getAuthConfig() {
  return authConfig;
}
```

### MsalInitializer Class

Beyond the factory function, OnePortal offers a `MsalInitializer` class and a unified provider. The initializer separates the work of **initializing MSAL** from the act of rendering components.

**In host mode** it performs a quick cache check and handles OAuth redirect flows.

**In remote mode** it optimizes for lazy-loaded apps by first attempting silent SSO and then falling back to reactive event-based strategies:

```typescript
export class MsalInitializer {
  async initializeRemote(): Promise<void> {
    // Strategy 1: Attempt silent SSO
    try {
      await this.attemptSilentSSO();
      this.publishSignedInEvent();
      return;
    } catch (error) {
      // Strategy 2: Listen for auth events from host
      this.subscribeToAuthEvents();
      
      // Strategy 3: Poll for active account
      this.startAccountPolling();
    }
  }
  
  private publishSignedInEvent(): void {
    window.dispatchEvent(
      new CustomEvent('auth:signed-in', {
        detail: { account: this.msalInstance.getActiveAccount() }
      })
    );
  }
}
```

By publishing and subscribing to `auth:signed-in` and `auth:signed-out` events, the initializer keeps multiple remotes in sync without each app needing to understand MSAL's internals.

### UnifiedAuthProvider

The `UnifiedAuthProvider` wraps the initializer into a single React component and exposes features tailored for micro-frontends:

- ✅ **Flicker-free initialization** - Quick cache checks before showing spinners
- ✅ **Lazy-load compatibility** - Preloaded routes don't trigger redirects
- ✅ **Visibility-aware** - Avoids redirecting while routes are prefetched
- ✅ **Type-safe event system** - TypeScript interfaces for auth events
- ✅ **Cross-app SSO** - Publishes events for synchronized sign-in/out

```typescript
<UnifiedAuthProvider
  msalInstance={msalInstance}
  mode="remote"
  appName="oneportal-admin"
  getAuthConfig={getAuthConfig}
  debug={true}
  publicRoutes={['/login', '/about']}
>
  <App />
</UnifiedAuthProvider>
```

The provider transparently switches between host and remote modes and internally creates an instance of `MsalInitializer`. Helper functions convert MSAL accounts into simple user profiles and implement role checks, so developers can focus on business logic rather than token parsing.

## Creating Remote Apps with Turborepo Generators

Developers generate new micro-frontends using a **Turborepo generator**. Running `pnpm turbo gen remote-app` prompts for an app name, display name, description and menu options:

```bash
$ pnpm turbo gen remote-app

✔ What is the name of the remote app? (e.g., 'myapp') › team-dashboard
✔ Display name for the app? › Team Dashboard
✔ Brief description? › Manage team workflows and tasks
✔ Choose template mode › Dashboard
```

The generator produces a fully configured remote application with:

- ✅ Module federation setup (Vite plugin configuration)
- ✅ MSAL integration (bootstrap script with UnifiedAuthProvider)
- ✅ Router setup (TanStack Router with type-safe routes)
- ✅ Responsive layout (AppLayout, sidebar, breadcrumb)
- ✅ TypeScript strict mode
- ✅ Example pages and components

It also updates the shell's deployment script and route configuration automatically.

### Template Modes

Remote apps can be created in three modes:

1. **Documentation mode** - Scaffolds routes to document OnePortal architecture (home, getting started, tech stack, UI components, etc.)

2. **Dashboard mode** - Generates a dashboard with nested sections such as overview, events, tasks and workflows

3. **Minimal mode** - Creates a minimal app with just home and about pages

Each remote comes with example configuration files (`menu.ts`, `routes.ts`) and a complete set of files including an `AppLayout`, sidebar, breadcrumb and sign-in page.

### Getting Started

After generation, developers simply:

1. Copy `.env.local.example` to `.env.local`
2. Add Azure AD credentials
3. Run `pnpm dev` to launch in standalone mode
4. Deploy to Azure Static Web Apps for shell integration

```bash
# Development (standalone)
pnpm dev

# Build for production
pnpm build

# Deploy to Azure
az staticwebapp deploy \
  --name oneportal-team-dashboard \
  --resource-group oneportal-rg \
  --app-location ./apps/remote-team-dashboard
```

## Consistent UI with Shared Components

OnePortal's UI package wraps [shadcn/ui](https://ui.shadcn.com) components and exports them with Tailwind classes pre-configured. Remote apps import primitives like `Button`, `Card`, `DropdownMenu`, `Avatar` and `Progress` from `@one-portal/ui` to build dashboards, forms and lists.

```typescript
import { Button, Card, Avatar, Progress } from '@one-portal/ui';

export function TeamDashboard() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Avatar src="/avatar.jpg" fallback="TM" />
        <div>
          <h3 className="font-semibold">Team Member</h3>
          <p className="text-sm text-muted-foreground">Software Engineer</p>
        </div>
      </div>
      <Progress value={75} className="mb-4" />
      <Button>View Profile</Button>
    </Card>
  );
}
```

These components integrate seamlessly with the DataTable and TanStack hooks but are also useful on their own. Because styling and accessibility are handled centrally, developers can focus on business logic instead of CSS.

### DataTable Component

OnePortal also offers a versatile **DataTable component** built on top of TanStack Table v8. It provides sorting, filtering, pagination and bulk actions out of the box and persists user preferences to local storage:

```typescript
import { DataTable } from '@one-portal/ui';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
  }),
  // ... more columns
];

export function UserTable({ data }: { data: User[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      enableSorting
      enableFiltering
      enablePagination
    />
  );
}
```

Developers can extend it with selection and action columns using helpers from `@one-portal/ui`. Combined with components like `Button`, `Card`, `DropdownMenu`, `Avatar` and `Progress`, teams can build rich interfaces quickly without worrying about styling or state management.

## Centralized Theme Management

Providing a cohesive theme across dozens of applications was critical. OnePortal implements a **Theme Provider** that reads a theme (light, dark or system) from local storage and applies it by toggling CSS classes on the document root:

```typescript
import { createContext, useContext, useEffect, useState } from 'react';

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'one-portal-ui-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem(storageKey) as Theme;
    return stored || defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      return;
    }
    
    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
```

A **Theme Toggle** component from the UI package displays a sun/moon icon and uses a dropdown menu to let users choose light, dark or system mode. When a user selects an option, the theme provider updates local storage and the CSS classes accordingly.

Because all apps share the same CSS variables defined in `@one-portal/tailwind-config`, the entire portal seamlessly switches theme without code duplication:

```css
/* packages/tailwind-config/theme.css */
@theme {
  --color-primary: oklch(0.7 0.2 220);
  --color-secondary: oklch(0.6 0.15 280);
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.1 0 0);
  /* ... more design tokens */
}

.dark {
  --color-background: oklch(0.15 0 0);
  --color-foreground: oklch(0.95 0 0);
  /* ... dark mode overrides */
}
```

## Performance Optimizations

Even in internal tools, users notice slow data tables and laggy interactions. OnePortal implements several performance optimizations:

### 1. Code Splitting & Lazy Loading

Remote apps are loaded on-demand using dynamic imports. The shell only fetches a remote's JavaScript when the user navigates to its route:

```typescript
// Shell router lazy-loads remote apps
const remoteRoutes = remotes.map(remote => ({
  path: `/${remote.slug}`,
  loader: () => loadRemote(remote),
}));
```

### 2. Memoization & React.memo

Complex calculations and component renders are memoized to prevent unnecessary work:

```typescript
const expensiveCalculation = useMemo(() => {
  return processLargeDataset(data);
}, [data]);

export const DataTable = React.memo(function DataTable({ columns, data }) {
  // ... component implementation
});
```

### 3. Debounced Search & Filtering

User input is debounced to reduce render frequency:

```typescript
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebouncedValue(searchTerm, 300);

useEffect(() => {
  // Filter data based on debouncedSearch
}, [debouncedSearch]);
```

### 4. Virtual Scrolling (Future)

For very large tables (10,000+ rows), we plan to implement virtual scrolling using TanStack Virtual to render only visible rows.

## Lessons Learned

Building OnePortal taught us several valuable lessons:

### 1. Consistency Pays Dividends

Centralizing design tokens and UI components ensures that all apps share a polished look and reduces design debates. Tailwind CSS v4's `@theme` directive and compiled CSS made this possible.

### 2. Abstraction Should Add Value

We removed over **1,200 lines of unused code** during an July 2025 cleanup because thin wrappers and unused utilities added complexity without benefits. We now favor direct code unless an abstraction solves a broad problem.

**Before cleanup:**
```typescript
// Unnecessary wrapper that added no value
function useCustomQuery<T>(key: string, fetcher: () => Promise<T>) {
  return useQuery({ queryKey: [key], queryFn: fetcher });
}
```

**After cleanup:**
```typescript
// Direct use of react-query
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});
```

### 3. Performance Matters

Even in internal tools, users notice slow data tables. Memoization, debouncing and server-side modes dramatically improve responsiveness. We learned to:

- Profile with React DevTools before optimizing
- Use `useMemo` and `useCallback` strategically (not everywhere)
- Implement pagination and virtual scrolling for large datasets

### 4. Developer Experience Drives Adoption

The generator, Storybook documentation and unified scripts lower the barrier to entry for new teams. Clear TypeScript types and examples give developers confidence.

**Teams can go from idea to deployed remote app in under an hour** thanks to:
- Zero-config generator
- Pre-configured authentication
- Example pages and components
- Automated deployment scripts

### 5. Authentication is Hard-But It Shouldn't Be

By wrapping MSAL in a factory and initializer, we hid the OAuth complexity, implemented robust host/remote strategies, and provided simple helpers for roles and user profiles. This encourages developers to implement secure flows without wrestling with MSAL.

**Before OnePortal:**
```typescript
// Each app had 200+ lines of MSAL boilerplate
const msalInstance = new PublicClientApplication(config);
await msalInstance.initialize();
const accounts = msalInstance.getAllAccounts();
// ... 150 more lines of redirect logic, event handlers, etc.
```

**With OnePortal:**
```typescript
// 3 lines to get a fully configured MSAL instance
const { instance, authConfig } = createMsalInstanceWithConfig('myapp');
export const msalInstance = instance;
export const getAuthConfig = () => authConfig;
```

## Future Roadmap

Looking ahead, we plan to:

### Near-term (Q1 2026)
- ✅ Inline editing for DataTable V2
- 🔄 Additional generator templates (admin dashboard, documentation site)
- 🔄 Role-based access control UI in OnePortal Admin

### Mid-term (Q2-Q3 2026)
- 📋 Server-side rendering for shell (Next.js migration)
- 📋 GraphQL API layer for remotes
- 📋 Advanced analytics and monitoring

### Long-term
- 📋 Plugin system for third-party extensions
- 📋 Visual editor for non-technical users
- 📋 Mobile app shell (React Native)

## Impact & Adoption

Since launching OnePortal in mid-2025, we've seen:

- **15 remote applications** deployed across 8 teams
- **60% reduction** in development time for new internal tools
- **Zero** authentication-related bugs (thanks to unified MSAL wrapper)
- **Consistent UX** across all apps (single theme and component library)
- **High developer satisfaction** - teams love the generator and documentation

### Migration Success Story

The **HR Portal** team migrated from SharePoint in just 6 weeks:
- Day 1-2: Generated remote app and set up Azure deployment
- Day 3-12: Migrated components using `@one-portal/ui`
- Day 12-35: Integrated existing APIs and business logic
- Day 35-42: Testing, polish, and production deployment

**Previous SharePoint setup took 3 months and required specialized SPFx knowledge.**

## Conclusion

OnePortal demonstrates that with the right architecture and tooling, you can transform dozens of disconnected applications into a unified, modern portal. By combining:

- **Module Federation** for dynamic micro-frontends
- **Turborepo** for monorepo management
- **Unified authentication** via MSAL abstraction
- **Shared UI library** for consistency
- **Developer-friendly generators** for rapid scaffolding

...we created a platform that dramatically improves both user experience and developer productivity.

With OnePortal, our organization finally has a cohesive, modern portal that unites dozens of apps under a single experience-all without the limitations and complexity of SharePoint.

---

**Tech Stack:** React 19 • TypeScript • Vite • Turborepo • Module Federation • MSAL • TanStack Router • Tailwind CSS v4 • shadcn/ui • Azure Static Web Apps

**Repository:** [github.com/HiIAmShashank/oneportal](https://github.com/HiIAmShashank/oneportal)

---

