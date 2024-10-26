# Interactive Card Gallery

A beautiful and interactive card gallery built with React, featuring drag-and-drop functionality, image previews, and automatic saving.

## Features

- Responsive grid layout with 3 cards in the first row and 2 in the second
- Drag and drop reordering of cards
- Image preview modal with ESC key support
- Automatic saving every 5 seconds
- Loading indicators for images and save status
- Time indicator for last save

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Usage

- Drag and drop cards to reorder them (Click drag icon on right top)
- Click on a card to view the full image
- Press ESC or click the close button to exit the image preview
- Changes are automatically saved every 5 seconds when modifications are made
- The save indicator shows the current save status and time since last save

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- react-beautiful-dnd
- date-fns
- Lucide React icons