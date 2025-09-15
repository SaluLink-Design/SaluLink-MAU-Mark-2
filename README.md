# SaluLink Medical Aid User App

The SaluLink Medical Aid User App is designed to educate medical aid members about their medical aid plans, Prescribed Minimum Benefits (PMBs), Designated Service Providers (DSPs), and hospital networks. The app functions as a conversational assistant, Authi 1.0, which uses structured datasets (CSV files) combined with AI to provide explanations in simple, accessible language.

## Features

### 🏥 PMB Education

- Browse PMB categories (Brain & Nervous System, Eye, Respiratory, etc.)
- View specific PMB codes, conditions, and treatments
- Get simplified explanations of medical conditions
- Search for specific PMB conditions

### 📊 Plan Comparison

- Compare Discovery Health plan series (Executive, Comprehensive, Priority, etc.)
- View detailed plan benefits and coverage
- Calculate monthly contributions for different family sizes
- Side-by-side plan comparison

### 🗺️ DSP Education

- Explore hospital networks by plan type
- Find hospitals by province and city
- Understand network rules and co-payments
- Learn about emergency coverage

### 💬 Authi 1.0 Chat Assistant

- Ask questions about PMBs, plans, and hospitals
- Get instant answers in simple language
- Interactive learning experience

## Technology Stack

- **React 18** - Frontend framework
- **Lucide React** - Icon library
- **Papa Parse** - CSV data processing
- **OpenAI** - AI-powered explanations (simulated)
- **CSS3** - Modern styling with gradients and animations

## Installation

1. **Prerequisites**
   - Node.js (version 14 or higher)
   - npm or yarn package manager

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Development Server**

   ```bash
   npm start
   ```

4. **Open in Browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── PMBEducation.js      # PMB browsing and education
│   ├── PlanComparison.js    # Plan comparison and calculator
│   └── DSPEducation.js      # Hospital network education
├── utils/
│   └── dataProcessor.js     # CSV data processing utilities
├── App.js                   # Main application component
├── index.js                 # React entry point
└── index.css                # Global styles
```

## Data Sources

The app uses three main CSV datasets:

1. **PMB List** - Prescribed Minimum Benefit conditions and treatments
2. **Plan Comparison** - Discovery Health plan details and contributions
3. **Hospital Network** - Designated Service Provider hospitals by location

## Key Features Explained

### PMB Education

- **Hierarchical Navigation**: Browse by medical category
- **Detailed Explanations**: Simple language explanations of complex medical conditions
- **Search Functionality**: Quick search for specific PMB codes
- **Treatment Information**: Clear explanation of required treatments

### Plan Comparison

- **Interactive Calculator**: Calculate contributions for different family sizes
- **Benefit Comparison**: Side-by-side comparison of plan benefits
- **Cost Analysis**: Understand total monthly costs including MSA contributions
- **Plan Selection**: Easy selection and comparison of multiple plans

### DSP Education

- **Network Exploration**: Browse hospitals by network and location
- **Geographic Filtering**: Filter hospitals by province
- **Coverage Rules**: Clear explanation of network rules and co-payments
- **Emergency Information**: Understanding emergency coverage

### Authi 1.0 Assistant

- **Natural Language Processing**: Ask questions in plain English
- **Contextual Responses**: Answers based on the current section
- **Educational Focus**: Responses designed to educate users
- **Interactive Learning**: Encourages exploration and learning

## Usage Examples

### PMB Education

1. Select "PMB Education" from the sidebar
2. Choose a category like "Brain and Nervous System"
3. Click on a specific PMB code (e.g., "906A")
4. Read the simplified explanation of the condition and treatment

### Plan Comparison

1. Select "Plan Comparison" from the sidebar
2. Choose a plan series (e.g., "Executive")
3. Select a specific plan (e.g., "Executive Plan")
4. Use the calculator to estimate monthly contributions
5. Compare with other plans

### DSP Education

1. Select "DSP Education" from the sidebar
2. Choose a hospital network (e.g., "KeyCare Hospital Network")
3. View hospitals by province
4. Search for specific hospitals or cities
5. Learn about network rules and co-payments

### Chat with Authi 1.0

1. Type questions in the text bar at the bottom
2. Ask about PMBs: "What is PMB 906A?"
3. Ask about plans: "Which plan has the best maternity cover?"
4. Ask about hospitals: "Is Netcare a DSP hospital?"

## Customization

### Adding New Data

1. Update CSV files in the data directory
2. Modify `dataProcessor.js` to handle new data structure
3. Update components to display new information

### Styling

- Modify `index.css` for global styles
- Update component-specific styles
- Customize color scheme and branding

### AI Integration

- Replace simulated responses with actual OpenAI API calls
- Add more sophisticated natural language processing
- Implement conversation memory and context

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions, please contact the development team or create an issue in the repository.

---

**SaluLink Medical Aid App** - Bridging the gap between technical plan documents and member understanding.
