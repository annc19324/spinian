# Spinian 🎡

Spinian is a modern, interactive, and customizable spinner wheel application built with **React** and **Vite**. Whether you need to pick a lucky winner, distribute prizes, or just have fun making random decisions, Spinian provides a polished and engaging experience.

## ✨ Features

- **Multiple Game Modes**:
  - **Quay Tên (Names)**: Perfect for picking a random person from a group.
  - **Quay Thưởng (Prizes)**: Distribute rewards or gifts.
  - **Quay Lì Xì (Lucky Money)**: Add excitement to holidays or events.
- **Fully Customizable**:
  - **Edit Content**: Easily add, remove, or modify items on the wheel.
  - **Visual Themes**: Choose from multiple color themes (Purple, Red, Blue, Green, Orange) or use the dynamic "Random" outcome.
  - **Spin Settings**: Control spin duration (fixed time or random range) and toggle content visibility during the spin.
- **Engaging Effects**:
  - **Sound Effects**: Realistic ticking sounds during the spin and a victory chord upon completion.
  - **Visuals**: Smooth animations and a confetti celebration for the winner.
- **Persistent Data**: Your custom lists and settings are automatically saved to your browser's storage.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: CSS Modules / Vanilla CSS with Variables
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1.  **Clone the repository** (if applicable) or download the source code.
2.  **Install dependencies**:

    ```bash
    npm install
    ```

### Running Locally

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

To create a production-ready build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 📖 Usage

1.  **Select a Mode**: Choose from the tabs at the top (Names, Prizes, Lucky Money).
2.  **Spin**: Click the **SPIN** button or the wheel itself to start.
3.  **Customize**:
    - Click **"Chỉnh sửa & Cài đặt"** (Edit & Settings) to open the configuration panel.
    - Adjust spin time, toggle "Hide results during spin", or change the color theme.
    - Edit the text area to update the items on the wheel (one item per line).
4.  **Reset**: Use the reset button to restore default items if needed.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the application.

## 📄 License

This project is open-source and available for personal and educational use.
