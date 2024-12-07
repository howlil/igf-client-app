# IGF (Indonesia Game Fest) Client Application

## Overview
The IGF Client Application is a web-based platform designed to facilitate the Indonesia Game Fest event operations. This application manages company profiles, user registrations, schedules, and event-related activities for participants and organizers.

## Features
- **User Authentication & Authorization**
  - Secure login and registration system
  - Role-based access control (Admin, Company, User)

- **Company Management**
  - Company profile creation and management
  - Filtering companies by various categories:
    - Key Product Line
    - Country
    - Business Type
    - Preferred Platform
    - Preferred Genre
  - Advanced search functionality

- **Schedule Management**
  - Event scheduling system
  - Meeting coordination between participants
  - Time slot management

- **Responsive Design**
  - Mobile-first approach
  - Adaptive layout for different screen sizes
  - Optimized user interface for both desktop and mobile devices

## Tech Stack
- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS
- **State Management**: React Hooks & Context
- **API Integration**: Axios
- **UI Components**: Custom components with Tailwind
- **Notifications**: SweetAlert2

## Project Structure
```
igf-client-app/
├── src/
│   ├── components/
│   │   ├── company/
│   │   │   ├── FilterSection.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── CompanyGrid.jsx
│   │   └── Layout.jsx
│   ├── utils/
│   │   └── api.js
│   └── pages/
│       └── CompanyUser.jsx
├── public/
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Git

### Installation
1. Clone the repository:
```bash
git clone https://github.com/howlil/igf-client-app.git
```

2. Navigate to the project directory:
```bash
cd igf-client-app
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open your browser and visit `http://localhost:3000`

## Usage

### Company Management
- Use the filter sidebar to narrow down company listings
- Search for specific companies using the search bar
- View detailed company profiles by clicking on company cards

### Schedule Management
- Access the schedule section to view available time slots
- Book meetings with participating companies
- Manage your meeting schedule

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Configuration
Create a `.env` file in the root directory with the following variables:
```env
VITE_API_URL=your_api_url_here
```

## API Integration
The application uses Axios for API integration. API configurations can be found in `src/utils/api.js`.

## Deployment
The application can be built for production using:
```bash
npm run build
# or
yarn build
```

This will create an optimized build in the `dist` directory.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
Project Link: [https://github.com/howlil/igf-client-app](https://github.com/howlil/igf-client-app)

## Acknowledgments
- React.js community
- Tailwind CSS
- Contributors and maintainers