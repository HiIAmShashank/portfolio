---
title: "React's New Activity Component: A Deep Dive into State Preservation"
date: "2025-11-08"
excerpt: "Explore React's Activity component - a powerful new API for preserving component state and DOM across visibility changes, enabling better performance and user experience."
tags: ["React", "Performance", "State Management", "React 19"]
---

# React's New Activity Component: A Deep Dive into State Preservation

React 19.2 introduces a powerful new component called `Activity` that solves a common problem in modern web applications: preserving component state and DOM when toggling visibility. Let's explore how this component works and when you should use it.

## The Problem: State Loss on Unmounting

Traditionally, when you conditionally render components in React, hiding them means unmounting them entirely. This causes:

- **Loss of component state** - Form inputs, scroll positions, and local state disappear
- **Loss of DOM state** - Video playback position, audio state, iframe content reset
- **Performance overhead** - Re-creating components and DOM on every visibility toggle

Consider a typical tab interface where switching tabs destroys and recreates content, losing user progress and requiring expensive re-renders.

## The Solution: Activity Component

The `Activity` component wraps your content and preserves it when hidden, rather than unmounting it:

```jsx
import { Activity } from 'react';

function TabPanel({ isActive, children }) {
  return (
    <Activity mode={isActive ? "visible" : "hidden"}>
      {children}
    </Activity>
  );
}
```

## Core Use Cases

### 1. State Preservation

When you need to maintain component state across visibility changes:

```jsx
function Sidebar({ isOpen }) {
  return (
    <Activity mode={isOpen ? "visible" : "hidden"}>
      <SidebarContent />
    </Activity>
  );
}
```

The `SidebarContent` component keeps its state (form inputs, selections, etc.) even when the sidebar is closed.

### 2. DOM State Preservation

Particularly valuable for media elements and iframes:

```jsx
function VideoPlayer({ isVisible }) {
  return (
    <Activity mode={isVisible ? "visible" : "hidden"}>
      <video src="tutorial.mp4" controls />
    </Activity>
  );
}
```

The video maintains its playback position when toggled - no need for manual state management!

### 3. Pre-rendering for Performance

Pre-render expensive components before showing them to users:

```jsx
function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <>
      <Activity mode={activeTab === 'overview' ? "visible" : "hidden"}>
        <Overview />
      </Activity>
      <Activity mode={activeTab === 'analytics' ? "visible" : "hidden"}>
        <ExpensiveAnalytics />
      </Activity>
    </>
  );
}
```

Both tabs are rendered but only one is visible - switching is instant!

### 4. Server-Side Rendering & Hydration Optimization

On the server, `Activity` renders all content regardless of mode. During hydration, React only hydrates the visible content, deferring hidden content until it becomes visible:

```jsx
// Server renders both, client only hydrates visible initially
<Activity mode="hidden">
  <ExpensiveChart data={data} />
</Activity>
```

This optimizes initial page load while keeping content ready to show instantly.

## Important Caveats

### Cleanup Requirements

When components become hidden, React **does not automatically clean up side effects**. You must handle cleanup in your Effects:

```jsx
function VideoComponent() {
  useEffect(() => {
    const video = videoRef.current;
    
    return () => {
      // Clean up: pause video when hidden
      video.pause();
    };
  }, []);
  
  return <video ref={videoRef} />;
}
```

### Text-Only Components

Components that only return text won't render when hidden:

```jsx
// Won't work - returns text directly
function TextOnly() {
  return "Just text";
}

// Works - wrapped in an element
function WrappedText() {
  return <span>Wrapped text</span>;
}
```

### View Transitions

The `Activity` component doesn't currently integrate with the View Transitions API. For animated transitions, you'll need to implement them separately.

## Working with Suspense

`Activity` works seamlessly with Suspense boundaries:

```jsx
<Activity mode={isVisible ? "visible" : "hidden"}>
  <Suspense fallback={<Spinner />}>
    <AsyncComponent />
  </Suspense>
</Activity>
```

Hidden content can load asynchronously without blocking the visible UI.

## When to Use Activity vs. CSS

**Use `Activity` when:**
- You need to preserve component state (forms, local state)
- You're working with media elements (video, audio) or iframes
- You want to pre-render expensive components
- You need optimized SSR hydration

**Use CSS `display: none` or `visibility: hidden` when:**
- State preservation isn't needed
- Components are cheap to re-render
- You want simpler code for basic visibility toggling

## Practical Example: Tab Navigation

Here's a complete example implementing a tab interface with state preservation:

```jsx
import { Activity } from 'react';
import { useState } from 'react';

function TabbedInterface() {
  const [activeTab, setActiveTab] = useState('editor');

  return (
    <div>
      <nav>
        <button onClick={() => setActiveTab('editor')}>Editor</button>
        <button onClick={() => setActiveTab('preview')}>Preview</button>
        <button onClick={() => setActiveTab('settings')}>Settings</button>
      </nav>

      <Activity mode={activeTab === 'editor' ? "visible" : "hidden"}>
        <CodeEditor />
      </Activity>
      
      <Activity mode={activeTab === 'preview' ? "visible" : "hidden"}>
        <Preview />
      </Activity>
      
      <Activity mode={activeTab === 'settings' ? "visible" : "hidden"}>
        <Settings />
      </Activity>
    </div>
  );
}

function CodeEditor() {
  const [code, setCode] = useState('');
  
  // State is preserved when switching tabs!
  return (
    <textarea 
      value={code} 
      onChange={(e) => setCode(e.target.value)}
      placeholder="Write your code..."
    />
  );
}
```

Switching between tabs is instant, and the editor content is never lost!

## Conclusion

React's `Activity` component is a powerful addition to the framework's toolkit, solving real-world problems around state preservation and performance optimization. By understanding when to use it versus traditional conditional rendering or CSS visibility, you can build more performant and user-friendly applications.

Key takeaways:
- Use `Activity` to preserve state and DOM across visibility changes
- Remember to clean up side effects in your components
- Leverage pre-rendering for expensive components
- Combine with Suspense for optimal loading experiences

For more details, check out the [official React documentation on Activity](https://react.dev/reference/react/Activity).

---
