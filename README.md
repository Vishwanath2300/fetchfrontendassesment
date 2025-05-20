# 🐾 Pawsome - Dog Adoption Platform

## Overview

Pawsome is a modern web application that helps users find and match with their perfect canine companion. Built with React, TypeScript, and Tailwind CSS, it provides an intuitive interface for browsing, filtering, and matching with dogs available for adoption.

## 🚀 Features

- **Browse Dogs**: View available dogs with their details including breed, age, and location
- **Advanced Filtering**:
  - Filter by breed
  - Search by location (city/state)
  - Sort by name, breed, or age
- **Favorites System**: Add dogs to your match list for later consideration
- **Smart Matching**: Get matched with a compatible dog from your favorites
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## 🛠️ Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Axios for API integration
- React Router for navigation

## 📦 Project Structure

```
src/
├── components/
│   ├── dogs/
│   │   ├── DogCard.tsx
│   │   ├── DogPagination.tsx
│   │   └── MatchList.tsx
│   ├── filters/
│   │   ├── BreedFilter.tsx
│   │   └── FilterIcon.tsx
│   └── modals/
│       └── MatchedBreed.tsx
├── pages/
│   └── SearchPage.tsx
|
└── types/
    └── interfaces.ts
```

## 🚦 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Vishwanath2300/fetchfrontendassesment.git
```

2. Install dependencies:

```bash
cd pawsome
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open http://localhost:5173 to view the app

## 🎨 Features in Detail

### Dog Browsing

- Grid view of available dogs
- Pagination support
- Dynamic loading of dog information
- Responsive image handling

### Filtering System

- Breed selection dropdown
- Location-based filtering
- Sort by multiple criteria
- Real-time filter updates

### Matching System

- Add/remove dogs from match list
- View all favorited dogs
- Get matched with compatible dogs
- Match result modal

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details

## 🙏 Acknowledgments

- Dog images and data provided by Fetch API
- Icons from various open-source libraries

## 📞 Contact

Your Name - Vishwanath Chintala
Project Link: https://github.com/Vishwanath2300/fetchfrontendassesment.git
