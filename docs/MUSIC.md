# Music Features

> **Note**: This project uses `type` instead of `interface` for TypeScript type definitions. This is a consistent pattern across the codebase.

This document outlines the music-related features and components for the application.

## Key Selection

The application should allow users to select a preferred key for songs. The key selection should include:

- All 12 chromatic notes (C, C#, D, D#, E, F, F#, G, G#, A, A#, B)
- Both major and minor modes
- Visual representation of the selected key
- Ability to transpose to different keys while maintaining the song's structure

## Scale Selection Component

The scale selection should be implemented as an interactive component where users can:

- View all 12 chromatic notes in a circular or linear layout
- Toggle individual scale degrees on/off
- See visual feedback for active/inactive scale degrees
- Select from common scale presets (Major, Minor, Pentatonic, etc.)
- Save custom scale configurations

### Scale Degree Toggle Interface

The scale degree toggle component should:

- Display all 12 chromatic notes
- Show the root note prominently
- Allow clicking/tapping to toggle each degree
- Provide visual feedback for:
  - Root note
  - Active scale degrees
  - Inactive scale degrees
  - Selected intervals

## Interval Management

The application should support interval selection relative to the root note:

### Upper Intervals

- Allow selection of intervals above the root note
- Support intervals from unison to octave
- Visual representation of selected upper intervals
- Ability to limit or expand the upper range

### Lower Intervals

- Allow selection of intervals below the root note
- Support intervals from unison to octave
- Visual representation of selected lower intervals
- Ability to limit or expand the lower range

## Technical Implementation

### Data Structure

```typescript
type ScaleConfiguration = {
  rootNote: string; // e.g., "C", "G#"
  mode: "major" | "minor" | "custom";
  activeDegrees: boolean[]; // Array of 12 booleans representing chromatic scale
  upperInterval: number; // Number of semitones above root
  lowerInterval: number; // Number of semitones below root
  customName?: string; // Optional name for custom scales
};

type IntervalRange = {
  upper: number; // Semitones above root
  lower: number; // Semitones below root
};
```

### Component Structure

```typescript
type ScaleSelectorProps = {
  rootNote: string;
  activeDegrees: boolean[];
  onDegreeToggle: (degree: number) => void;
  onRootChange: (newRoot: string) => void;
  onPresetSelect: (preset: string) => void;
};

type IntervalSelectorProps = {
  upperInterval: number;
  lowerInterval: number;
  onUpperChange: (interval: number) => void;
  onLowerChange: (interval: number) => void;
};
```

## User Experience

- Provide immediate visual feedback when toggling scale degrees
- Show the resulting scale pattern clearly
- Allow for easy switching between different keys
- Maintain the scale configuration when changing keys
- Support touch and mouse interactions
- Include tooltips or helper text for musical terms
- Provide audio feedback when toggling notes (optional)

## Accessibility

- Ensure keyboard navigation support
- Provide ARIA labels for interactive elements
- Support screen readers with appropriate descriptions
- Include high contrast mode support
- Maintain focus management during interactions

## Future Enhancements

- Save and load custom scale configurations
- Share scale configurations with other users
- Integration with music theory learning tools
- MIDI input/output support
- Audio playback of selected scales
- Scale pattern visualization
- Chord progression suggestions based on selected scale
