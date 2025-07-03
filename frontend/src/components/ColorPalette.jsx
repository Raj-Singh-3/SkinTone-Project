import React, { useState } from 'react';
import axios from 'axios';

// Hardcoded products
const products = [
  // Existing entries (lighter skin tone)
  { name: 'Coral crop-top', tag: 'coral-female-top', gender: 'female', color: 'coral', type: 'top' },
  { name: 'Salmon shirt', tag: 'salmon-male-top', gender: 'male', color: 'salmon', type: 'top' },
  { name: 'Turquoise blouse', tag: 'turquoise-female-top', gender: 'female', color: 'turquoise', type: 'top' },
  { name: 'Champagne shirt', tag: 'champagne-male-top', gender: 'male', color: 'champagne', type: 'top' },
  { name: 'Warm Gray tee', tag: 'warmgray-male-top', gender: 'male', color: 'warm gray', type: 'top' },
  { name: 'Coral shirt', tag: 'coral-male-top', gender: 'male', color: 'coral', type: 'top' },
  { name: 'Salmon blouse', tag: 'salmon-female-top', gender: 'female', color: 'salmon', type: 'top' },
  { name: 'Turquoise shirt', tag: 'turquoise-male-top', gender: 'male', color: 'turquoise', type: 'top' },
  { name: 'Champagne blouse', tag: 'champagne-female-top', gender: 'female', color: 'champagne', type: 'top' },
  { name: 'Warm Gray top', tag: 'warmgray-female-top', gender: 'female', color: 'warm gray', type: 'top' },

  // New entries for skin tone rgb(166, 84, 0)
  { name: 'Cranberry blouse', tag: 'cranberry-female-top', gender: 'female', color: 'cranberry', type: 'top' },
  { name: 'Cranberry shirt', tag: 'cranberry-male-top', gender: 'male', color: 'cranberry', type: 'top' },
  { name: 'Army Green blouse', tag: 'armygreen-female-top', gender: 'female', color: 'army green', type: 'top' },
  { name: 'Army Green tee', tag: 'armygreen-male-top', gender: 'male', color: 'army green', type: 'top' },
  { name: 'Gold top', tag: 'gold-female-top', gender: 'female', color: 'gold', type: 'top' },
  { name: 'Gold shirt', tag: 'gold-male-top', gender: 'male', color: 'gold', type: 'top' },
  { name: 'Russet blouse', tag: 'russet-female-top', gender: 'female', color: 'russet', type: 'top' },
  { name: 'Russet shirt', tag: 'russet-male-top', gender: 'male', color: 'russet', type: 'top' },
  { name: 'Pumpkin top', tag: 'pumpkin-female-top', gender: 'female', color: 'pumpkin', type: 'top' },
  { name: 'Pumpkin tee', tag: 'pumpkin-male-top', gender: 'male', color: 'pumpkin', type: 'top' },
];


// Recommendation mapping
const recommendationMap = {
  female: {
    salmon: {
      jeans: 'High-waist white or cream trousers',
      shoes: 'Nude heels or white sneakers',
      accessories: ['Rose gold earrings', 'Light pink handbag']
    },
    turquoise: {
      jeans: 'Light wash skinny jeans',
      shoes: 'Silver sandals',
      accessories: ['Turquoise studs', 'White clutch']
    },
    champagne: {
      jeans: 'Beige palazzo pants',
      shoes: 'Champagne ballet flats',
      accessories: ['Pearl necklace', 'Gold bracelet']
    },
    coral: {
      jeans: 'White denim shorts',
      shoes: 'Tan wedges',
      accessories: ['Coral scarf', 'Beige tote']
    },
    'warm gray': {
      jeans: 'Black skinny jeans',
      shoes: 'Gray ankle boots',
      accessories: ['Silver hoops', 'Charcoal crossbody']
    }
  },
  male: {
    salmon: {
      jeans: 'Slim-fit beige chinos',
      shoes: 'Brown loafers or white sneakers',
      accessories: ['Tan leather belt', 'Silver watch']
    },
    turquoise: {
      jeans: 'Dark blue jeans',
      shoes: 'White sneakers',
      accessories: ['Turquoise tie', 'Navy cap']
    },
    champagne: {
      jeans: 'Khaki trousers',
      shoes: 'Champagne loafers',
      accessories: ['Gold cufflinks', 'Beige wallet']
    },
    coral: {
      jeans: 'Light gray jeans',
      shoes: 'White slip-ons',
      accessories: ['Coral pocket square', 'Tan backpack']
    },
    'warm gray': {
      jeans: 'Charcoal joggers',
      shoes: 'Gray sneakers',
      accessories: ['Black beanie', 'Gray messenger bag']
    }
  }
};

const recommendationsByColorAndGender = {
  "cranberry": {
    "male": {
      watch: "Maroon leather strap with rose gold dial",
      shoes: "Burgundy suede loafers",
      bag: "Dark red leather sling bag",
      bracelet: "Matte black and red stone beads"
    },
    "female": {
      earrings: "Garnet or ruby stud earrings",
      shoes: "Cranberry block heels or ballet flats",
      bag: "Quilted maroon shoulder bag",
      necklace: "Minimal gold chain with red gemstone pendant"
    }
  },
  "army green": {
    "male": {
      watch: "Military green canvas strap with black dial",
      shoes: "Army green combat boots or casual sneakers",
      bag: "Olive green duffel or backpack",
      sunglasses: "Black/gunmetal frame with olive green tint"
    },
    "female": {
      shoes: "Olive ankle boots or slip-on sandals",
      bag: "Crossbody bag in matte olive",
      earrings: "Geometric bronze or moss green stones",
      bracelet: "Earth-toned bangles or leather wrap"
    }
  },
  "gold": {
    "male": {
      watch: "Classic gold metal strap or black with gold accents",
      shoes: "Black leather with subtle gold detail",
      sunglasses: "Gold-rimmed aviators",
      ring: "Signet ring with a brushed gold finish"
    },
    "female": {
      earrings: "Hoop or drop gold earrings",
      shoes: "Gold shimmer heels or sandals",
      bag: "Champagne-gold clutch or mini bag",
      necklace: "Bold statement gold necklace"
    }
  },
  "russet": {
    "male": {
      watch: "Rust brown leather strap with bronze case",
      shoes: "Russet-toned boots or leather brogues",
      bag: "Chestnut brown satchel",
      bracelet: "Wooden beads with russet hues"
    },
    "female": {
      shoes: "Russet leather mules or boots",
      bag: "Saddlebag in rust leather",
      earrings: "Terracotta or copper danglers",
      scarf: "Printed silk scarf with russet and beige tones"
    }
  },
  "pumpkin": {
    "male": {
      watch: "Orange-accented sports watch",
      shoes: "Tan-brown loafers or pumpkin-colored trainers",
      cap: "Light orange or neutral baseball cap",
      bracelet: "Rope band with orange detail"
    },
    "female": {
      shoes: "Pumpkin-orange espadrilles or sandals",
      bag: "Orange tote or bucket bag",
      earrings: "Orange resin earrings or enamel studs",
      hairband: "Satin pumpkin-colored knotted band"
    }
  }
};


function getRecommendations(color, gender) {
  const colorKey = color.toLowerCase().replace(/\s/g, '');
  // Normalize color keys for mapping
  const colorMap = {
    'salmon': 'salmon',
    'turquoise': 'turquoise',
    'champagne': 'champagne',
    'coral': 'coral',
    'warmgray': 'warm gray',
    'warm gray': 'warm gray',
  };
  const mappedColor = colorMap[colorKey] || colorKey;
  return (recommendationMap[gender] && recommendationMap[gender][mappedColor]) || null;
}

const palette = [
  // Light tones (1-50)
  'rgb(255, 236, 214)', 'rgb(255, 227, 200)', 'rgb(255, 218, 185)', 
  'rgb(255, 209, 171)', 'rgb(255, 200, 157)', 'rgb(255, 191, 143)',
  'rgb(255, 182, 129)', 'rgb(255, 173, 115)', 'rgb(255, 164, 101)',
  'rgb(255, 155, 87)', 'rgb(255, 146, 73)', 'rgb(255, 137, 59)',
  'rgb(255, 228, 196)', 'rgb(255, 219, 176)', 'rgb(255, 210, 156)',
  'rgb(255, 201, 136)', 'rgb(255, 192, 116)', 'rgb(255, 183, 96)',
  'rgb(255, 174, 76)', 'rgb(255, 165, 56)', 'rgb(255, 156, 36)',
  'rgb(255, 147, 16)', 'rgb(250, 235, 215)', 'rgb(245, 225, 195)',
  'rgb(240, 215, 175)', 'rgb(235, 205, 155)', 'rgb(230, 195, 135)',
  'rgb(225, 185, 115)', 'rgb(220, 175, 95)', 'rgb(215, 165, 75)',
  'rgb(210, 155, 55)', 'rgb(205, 145, 35)', 'rgb(200, 135, 15)',
  'rgb(248, 222, 193)', 'rgb(242, 212, 178)', 'rgb(236, 202, 163)',
  'rgb(230, 192, 148)', 'rgb(224, 182, 133)', 'rgb(218, 172, 118)',
  'rgb(212, 162, 103)', 'rgb(206, 152, 88)', 'rgb(200, 142, 73)',
  'rgb(194, 132, 58)', 'rgb(188, 122, 43)', 'rgb(182, 112, 28)',
  'rgb(176, 102, 13)', 'rgb(253, 213, 179)', 'rgb(248, 203, 164)',
  'rgb(243, 193, 149)', 'rgb(238, 183, 134)', 'rgb(233, 173, 119)',

  // Medium-light tones (51-100)
  'rgb(241, 194, 125)', 'rgb(239, 184, 110)', 'rgb(237, 174, 95)',
  'rgb(235, 164, 80)', 'rgb(233, 154, 65)', 'rgb(231, 144, 50)',
  'rgb(229, 134, 35)', 'rgb(227, 124, 20)', 'rgb(225, 114, 5)',
  'rgb(223, 104, 0)', 'rgb(221, 194, 160)', 'rgb(216, 184, 145)',
  'rgb(211, 174, 130)', 'rgb(206, 164, 115)', 'rgb(201, 154, 100)',
  'rgb(196, 144, 85)', 'rgb(191, 134, 70)', 'rgb(186, 124, 55)',
  'rgb(181, 114, 40)', 'rgb(176, 104, 25)', 'rgb(171, 94, 10)',
  'rgb(166, 84, 0)', 'rgb(198, 134, 66)', 'rgb(193, 124, 56)',
  'rgb(188, 114, 46)', 'rgb(183, 104, 36)', 'rgb(178, 94, 26)',
  'rgb(173, 84, 16)', 'rgb(168, 74, 6)', 'rgb(163, 64, 0)',
  'rgb(158, 54, 0)', 'rgb(153, 44, 0)', 'rgb(210, 170, 120)',
  'rgb(205, 160, 110)', 'rgb(200, 150, 100)', 'rgb(195, 140, 90)',
  'rgb(190, 130, 80)', 'rgb(185, 120, 70)', 'rgb(180, 110, 60)',
  'rgb(175, 100, 50)', 'rgb(170, 90, 40)', 'rgb(165, 80, 30)',
  'rgb(160, 70, 20)', 'rgb(155, 60, 10)', 'rgb(150, 50, 0)',
  'rgb(145, 40, 0)', 'rgb(140, 30, 0)', 'rgb(135, 20, 0)',
  'rgb(130, 10, 0)', 'rgb(125, 0, 0)', 'rgb(192, 152, 108)',
  'rgb(187, 142, 98)', 'rgb(182, 132, 88)', 'rgb(177, 122, 78)',

  // Medium tones (101-150)
  'rgb(141, 85, 36)', 'rgb(136, 75, 31)', 'rgb(131, 65, 26)',
  'rgb(126, 55, 21)', 'rgb(121, 45, 16)', 'rgb(116, 35, 11)',
  'rgb(111, 25, 6)', 'rgb(106, 15, 1)', 'rgb(101, 5, 0)',
  'rgb(96, 0, 0)', 'rgb(180, 120, 60)', 'rgb(175, 110, 55)',
  'rgb(170, 100, 50)', 'rgb(165, 90, 45)', 'rgb(160, 80, 40)',
  'rgb(155, 70, 35)', 'rgb(150, 60, 30)', 'rgb(145, 50, 25)',
  'rgb(140, 40, 20)', 'rgb(135, 30, 15)', 'rgb(130, 20, 10)',
  'rgb(125, 10, 5)', 'rgb(120, 0, 0)', 'rgb(168, 112, 72)',
  'rgb(163, 102, 67)', 'rgb(158, 92, 62)', 'rgb(153, 82, 57)',
  'rgb(148, 72, 52)', 'rgb(143, 62, 47)', 'rgb(138, 52, 42)',
  'rgb(133, 42, 37)', 'rgb(128, 32, 32)', 'rgb(123, 22, 27)',
  'rgb(118, 12, 22)', 'rgb(113, 2, 17)', 'rgb(108, 0, 12)',
  'rgb(156, 96, 84)', 'rgb(151, 86, 79)', 'rgb(146, 76, 74)',
  'rgb(141, 66, 69)', 'rgb(136, 56, 64)', 'rgb(131, 46, 59)',
  'rgb(126, 36, 54)', 'rgb(121, 26, 49)', 'rgb(116, 16, 44)',
  'rgb(111, 6, 39)', 'rgb(106, 0, 34)', 'rgb(144, 84, 60)',
  'rgb(139, 74, 55)', 'rgb(134, 64, 50)', 'rgb(129, 54, 45)',
  'rgb(124, 44, 40)', 'rgb(119, 34, 35)', 'rgb(114, 24, 30)',
  'rgb(109, 14, 25)', 'rgb(104, 4, 20)', 'rgb(99, 0, 15)',

  // Medium-dark tones (151-200)
  'rgb(120, 60, 36)', 'rgb(115, 55, 31)', 'rgb(110, 50, 26)',
  'rgb(105, 45, 21)', 'rgb(100, 40, 16)', 'rgb(95, 35, 11)',
  'rgb(90, 30, 6)', 'rgb(85, 25, 1)', 'rgb(80, 20, 0)',
  'rgb(75, 15, 0)', 'rgb(132, 72, 48)', 'rgb(127, 67, 43)',
  'rgb(122, 62, 38)', 'rgb(117, 57, 33)', 'rgb(112, 52, 28)',
  'rgb(107, 47, 23)', 'rgb(102, 42, 18)', 'rgb(97, 37, 13)',
  'rgb(92, 32, 8)', 'rgb(87, 27, 3)', 'rgb(82, 22, 0)',
  'rgb(77, 17, 0)', 'rgb(144, 84, 60)', 'rgb(139, 79, 55)',
  'rgb(134, 74, 50)', 'rgb(129, 69, 45)', 'rgb(124, 64, 40)',
  'rgb(119, 59, 35)', 'rgb(114, 54, 30)', 'rgb(109, 49, 25)',
  'rgb(104, 44, 20)', 'rgb(99, 39, 15)', 'rgb(94, 34, 10)',
  'rgb(89, 29, 5)', 'rgb(84, 24, 0)', 'rgb(156, 96, 72)',
  'rgb(151, 91, 67)', 'rgb(146, 86, 62)', 'rgb(141, 81, 57)',
  'rgb(136, 76, 52)', 'rgb(131, 71, 47)', 'rgb(126, 66, 42)',
  'rgb(121, 61, 37)', 'rgb(116, 56, 32)', 'rgb(111, 51, 27)',
  'rgb(106, 46, 22)', 'rgb(101, 41, 17)', 'rgb(96, 36, 12)',
  'rgb(91, 31, 7)', 'rgb(86, 26, 2)', 'rgb(81, 21, 0)',
  'rgb(76, 16, 0)', 'rgb(168, 108, 84)', 'rgb(163, 103, 79)',
  'rgb(158, 98, 74)', 'rgb(153, 93, 69)', 'rgb(148, 88, 64)',

  // Dark tones (201-250)
  'rgb(96, 48, 36)', 'rgb(91, 43, 31)', 'rgb(86, 38, 26)',
  'rgb(81, 33, 21)', 'rgb(76, 28, 16)', 'rgb(71, 23, 11)',
  'rgb(66, 18, 6)', 'rgb(61, 13, 1)', 'rgb(56, 8, 0)',
  'rgb(51, 3, 0)', 'rgb(108, 60, 48)', 'rgb(103, 55, 43)',
  'rgb(98, 50, 38)', 'rgb(93, 45, 33)', 'rgb(88, 40, 28)',
  'rgb(83, 35, 23)', 'rgb(78, 30, 18)', 'rgb(73, 25, 13)',
  'rgb(68, 20, 8)', 'rgb(63, 15, 3)', 'rgb(58, 10, 0)',
  'rgb(53, 5, 0)', 'rgb(120, 72, 60)', 'rgb(115, 67, 55)',
  'rgb(110, 62, 50)', 'rgb(105, 57, 45)', 'rgb(100, 52, 40)',
  'rgb(95, 47, 35)', 'rgb(90, 42, 30)', 'rgb(85, 37, 25)',
  'rgb(80, 32, 20)', 'rgb(75, 27, 15)', 'rgb(70, 22, 10)',
  'rgb(65, 17, 5)', 'rgb(60, 12, 0)', 'rgb(132, 84, 72)',
  'rgb(127, 79, 67)', 'rgb(122, 74, 62)', 'rgb(117, 69, 57)',
  'rgb(112, 64, 52)', 'rgb(107, 59, 47)', 'rgb(102, 54, 42)',
  'rgb(97, 49, 37)', 'rgb(92, 44, 32)', 'rgb(87, 39, 27)',
  'rgb(82, 34, 22)', 'rgb(77, 29, 17)', 'rgb(72, 24, 12)',
  'rgb(67, 19, 7)', 'rgb(62, 14, 2)', 'rgb(57, 9, 0)',
  'rgb(52, 4, 0)', 'rgb(144, 96, 84)', 'rgb(139, 91, 79)',
  'rgb(134, 86, 74)', 'rgb(129, 81, 69)', 'rgb(124, 76, 64)',

  // Very dark/rich tones (251-300+)
  'rgb(72, 36, 36)', 'rgb(67, 31, 31)', 'rgb(62, 26, 26)',
  'rgb(57, 21, 21)', 'rgb(52, 16, 16)', 'rgb(47, 11, 11)',
  'rgb(42, 6, 6)', 'rgb(37, 1, 1)', 'rgb(32, 0, 0)',
  'rgb(27, 0, 0)', 'rgb(84, 48, 48)', 'rgb(79, 43, 43)',
  'rgb(74, 38, 38)', 'rgb(69, 33, 33)', 'rgb(64, 28, 28)',
  'rgb(59, 23, 23)', 'rgb(54, 18, 18)', 'rgb(49, 13, 13)',
  'rgb(44, 8, 8)', 'rgb(39, 3, 3)', 'rgb(34, 0, 0)',
  'rgb(96, 60, 60)', 'rgb(91, 55, 55)', 'rgb(86, 50, 50)',
  'rgb(81, 45, 45)', 'rgb(76, 40, 40)', 'rgb(71, 35, 35)',
  'rgb(66, 30, 30)', 'rgb(61, 25, 25)', 'rgb(56, 20, 20)',
  'rgb(51, 15, 15)', 'rgb(46, 10, 10)', 'rgb(41, 5, 5)',
  'rgb(36, 0, 0)', 'rgb(108, 72, 72)', 'rgb(103, 67, 67)',
  'rgb(98, 62, 62)', 'rgb(93, 57, 57)', 'rgb(88, 52, 52)',
  'rgb(83, 47, 47)', 'rgb(78, 42, 42)', 'rgb(73, 37, 37)',
  'rgb(68, 32, 32)', 'rgb(63, 27, 27)', 'rgb(58, 22, 22)',
  'rgb(53, 17, 17)', 'rgb(48, 12, 12)', 'rgb(43, 7, 7)',
  'rgb(38, 2, 2)', 'rgb(120, 84, 84)', 'rgb(115, 79, 79)',
  'rgb(110, 74, 74)', 'rgb(105, 69, 69)', 'rgb(100, 64, 64)',
  'rgb(95, 59, 59)', 'rgb(90, 54, 54)', 'rgb(85, 49, 49)',
  'rgb(80, 44, 44)', 'rgb(75, 39, 39)', 'rgb(70, 34, 34)',
  'rgb(65, 29, 29)', 'rgb(60, 24, 24)', 'rgb(55, 19, 19)',
  'rgb(50, 14, 14)', 'rgb(45, 9, 9)', 'rgb(40, 4, 4)',
  'rgb(35, 0, 0)', 'rgb(132, 96, 96)', 'rgb(127, 91, 91)',
  'rgb(122, 86, 86)', 'rgb(117, 81, 81)', 'rgb(112, 76, 76)',
  'rgb(107, 71, 71)', 'rgb(102, 66, 66)', 'rgb(97, 61, 61)',
  'rgb(92, 56, 56)', 'rgb(87, 51, 51)', 'rgb(82, 46, 46)',
  'rgb(77, 41, 41)', 'rgb(72, 36, 36)', 'rgb(67, 31, 31)',
  'rgb(62, 26, 26)', 'rgb(57, 21, 21)', 'rgb(52, 16, 16)',
  'rgb(47, 11, 11)', 'rgb(42, 6, 6)', 'rgb(37, 1, 1)',
  'rgb(32, 0, 0)', 'rgb(144, 108, 108)', 'rgb(139, 103, 103)',
  'rgb(134, 98, 98)', 'rgb(129, 93, 93)', 'rgb(124, 88, 88)',
  'rgb(119, 83, 83)', 'rgb(114, 78, 78)', 'rgb(109, 73, 73)',
  'rgb(104, 68, 68)', 'rgb(99, 63, 63)', 'rgb(94, 58, 58)',
  'rgb(89, 53, 53)', 'rgb(84, 48, 48)', 'rgb(79, 43, 43)',
  'rgb(74, 38, 38)', 'rgb(69, 33, 33)', 'rgb(64, 28, 28)',
  'rgb(59, 23, 23)', 'rgb(54, 18, 18)', 'rgb(49, 13, 13)',
  'rgb(44, 8, 8)', 'rgb(39, 3, 3)', 'rgb(34, 0, 0)'
];

// 50 very light skin tones
// 50 light-medium tones
// 50 medium tones
// 50 medium-dark tones
// 50 dark tones
// 50+ very dark/rich tones

function ColorPalette({ setResult, setIsLoading, setError, gender, setGender }) {
  const [selected, setSelected] = useState(null);

  const handleSubmit = async () => {
    if (!selected) {
      setError('Please select a skin tone from the palette');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post('http://localhost:5050/palette', {
        skinColor: selected
      });
      setResult(res.data);
    } catch (err) {
      setError('Failed to get recommendations. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Group colors into categories for better organization
  const colorCategories = [
    { name: 'Fair', colors: palette.slice(0, 50) },
    { name: 'Light', colors: palette.slice(50, 100) },
    { name: 'Medium', colors: palette.slice(100, 150) },
    { name: 'Tan', colors: palette.slice(150, 200) },
    { name: 'Deep', colors: palette.slice(200, 250) },
    { name: 'Dark', colors: palette.slice(250) }
  ];

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Select your skin tone</h3>
        <p className="text-sm text-gray-600">
          Click on the shade that most closely matches your skin tone
        </p>
      </div>

      {colorCategories.map((category, catIndex) => (
        <div key={catIndex} className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">{category.name}</h4>
          <div className="grid grid-cols-10 gap-1">
            {category.colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelected(color)}
                className={`h-8 w-8 rounded-full border-2 ${selected === color ? 'border-black ring-2 ring-offset-2 ring-indigo-500' : 'border-white'}`}
                style={{ backgroundColor: color }}
                aria-label={`Skin tone ${category.name} shade ${index + 1}`}
                title={color}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="mt-8 text-center">
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${selected ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-300 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          Get Color Recommendations
        </button>
      </div>
    </div>
  );
}

export default ColorPalette;