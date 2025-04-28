# Libraries and Dependencies

This document outlines the key libraries and dependencies used in the SongShare-2 project, with a focus on drag and drop functionality and list management.

## Search Functionality

### Recommended: `fuse.js` + Custom Search Implementation

We recommend using `fuse.js` as the base search library, combined with custom search implementations for specific needs. This combination provides:

- Fuzzy search capabilities
- Customizable search algorithms
- Good performance with large datasets
- Support for complex search patterns

#### Installation

```bash
npx expo install fuse.js
```

#### Key Features

- Fuzzy matching
- Weighted search
- Custom search algorithms
- Diacritic-insensitive search
- Multi-field search
- Search highlighting

## Drag and Drop Libraries

### Recommended: `@dnd-kit`

We recommend using `@dnd-kit` for drag and drop functionality in our Expo.dev application. This library is:

- Lightweight and performant
- Built with React Native in mind
- Provides excellent TypeScript support
- Has a rich ecosystem of modifiers and utilities
- Works well with Expo.dev

#### Installation

```bash
npx expo install @dnd-kit/core @dnd-kit/modifiers @dnd-kit/sortable @dnd-kit/utilities
```

#### Key Features

- Sortable lists
- Drag handles
- Custom drag overlays
- Accessibility support
- Touch device support
- Keyboard navigation

## List Management

The application will implement several types of lists that require drag and drop functionality:

### 1. Songs List

- Sortable list of songs
- Drag to reorder
- Drag to add to playlists
- Drag to remove from playlists
- Advanced search capabilities:
  - Search by title
  - Search by lyrics
  - Search by original language
  - Diacritic-insensitive search
  - Search by metadata (artist, album, etc.)
  - Search by tags/categories
  - Search by date added/modified
  - Search by popularity/usage

#### Search Implementation Example

```typescript
import Fuse from "fuse.js";

type Song = {
  id: string;
  title: string;
  lyrics: string;
  originalLanguage: string;
  metadata: {
    artist: string;
    album: string;
    tags: string[];
  };
};

// Custom search implementation for diacritic-insensitive search
function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// Create search index
const fuse = new Fuse(songs, {
  keys: [
    { name: "title", weight: 0.7 },
    { name: "lyrics", weight: 0.5 },
    { name: "originalLanguage", weight: 0.6 },
    { name: "metadata.artist", weight: 0.4 },
    { name: "metadata.album", weight: 0.3 },
    { name: "metadata.tags", weight: 0.2 },
  ],
  threshold: 0.3,
  includeScore: true,
  useExtendedSearch: true,
  ignoreLocation: true,
});

// Custom search function
function searchSongs(query: string): Song[] {
  // Normalize query for diacritic-insensitive search
  const normalizedQuery = normalizeText(query);

  // Perform search
  const results = fuse.search(normalizedQuery);

  // Return sorted results
  return results
    .sort((a, b) => (a.score || 0) - (b.score || 0))
    .map((result) => result.item);
}
```

### 2. Playlists

- Sortable list of playlists
- Drag to reorder songs within playlists
- Drag to move songs between playlists
- Drag to create new playlists

### 3. Users List

- Sortable list of users
- Drag to assign roles
- Drag to manage permissions
- Drag to organize groups

### 4. Logs List

- Sortable list of activity logs
- Drag to filter
- Drag to group by category
- Drag to prioritize

## Implementation Guidelines

### Basic List Structure

```typescript
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

type ListItem = {
  id: string;
  title: string;
  // ... other properties
};

function SortableList({ items }: { items: ListItem[] }) {
  const [items, setItems] = useState<ListItem[]>(items);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items}>
        {items.map((item) => (
          <SortableItem key={item.id} item={item} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
```

### Accessibility Considerations

- Implement proper ARIA labels
- Support keyboard navigation
- Provide visual feedback
- Ensure touch targets are large enough
- Support screen readers

### Performance Optimization

- Use `React.memo` for list items
- Implement virtualization for long lists
- Optimize re-renders
- Use proper key props
- Implement proper state management

## Search Performance Optimization

- Implement search indexing
- Use debouncing for search input
- Cache search results
- Implement progressive loading
- Use web workers for heavy search operations
- Optimize search algorithms for specific use cases

## Testing

- Test drag and drop functionality
- Test keyboard navigation
- Test touch interactions
- Test accessibility
- Test performance with large lists
- Test search functionality:
  - Test basic search
  - Test fuzzy matching
  - Test diacritic-insensitive search
  - Test multi-field search
  - Test search performance with large datasets
  - Test search highlighting
  - Test search result sorting

## Related Documentation

- [TypeScript and React Best Practices](../TYPESCRIPT_REACT_BEST_PRACTICES.md)
- [State Management Best Practices](../STATE_MANAGEMENT_BEST_PRACTICE.md)
- [Testing Guidelines](../TESTING.md)
