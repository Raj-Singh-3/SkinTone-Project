// import React, { useState } from 'react';
// import axios from 'axios';
// import ImageUpload from './components/ImageUpload';
// import ColorPalette from './components/ColorPalette';

// function App() {
//   const [result, setResult] = useState(null);

//   return (
//     <div style={{ textAlign: 'center', padding: '20px' }}>
//       <h1>Skin Tone Dress Color Recommender</h1>
//       <ImageUpload setResult={setResult} />
//       <ColorPalette setResult={setResult} />
//       {result && (
//         <div>
//           <h2>Detected Skin Color: {result.detectedSkin}</h2>
//           <h3>Recommended Dress Colors:</h3>
//           <ul>
//             {result.recommendations.map((color, index) => (
//               <li key={index} style={{color: color.toLowerCase()}}>
//                 {color}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageUpload from './components/ImageUpload';
import ColorPalette from './components/ColorPalette';

// Hardcoded products and recommendation logic
const products = [
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
  { name: 'Scarlet shirt', tag: 'scarlet-male-top', gender: 'male', color: 'scarlet', type: 'top' },
  { name: 'Scarlet blouse', tag: 'scarlet-female-top', gender: 'female', color: 'scarlet', type: 'top' },
  { name: 'Olive tee', tag: 'olive-male-top', gender: 'male', color: 'olive', type: 'top' },
  { name: 'Olive blouse', tag: 'olive-female-top', gender: 'female', color: 'olive', type: 'top' },
  { name: 'Amber shirt', tag: 'amber-male-top', gender: 'male', color: 'amber', type: 'top' },
  { name: 'Amber blouse', tag: 'amber-female-top', gender: 'female', color: 'amber', type: 'top' },
  { name: 'Chestnut shirt', tag: 'chestnut-male-top', gender: 'male', color: 'chestnut', type: 'top' },
  { name: 'Chestnut blouse', tag: 'chestnut-female-top', gender: 'female', color: 'chestnut', type: 'top' },
  { name: 'Warm Gray tee', tag: 'warmgray-male-top2', gender: 'male', color: 'warm gray', type: 'top' },
  { name: 'Warm Gray blouse', tag: 'warmgray-female-top2', gender: 'female', color: 'warm gray', type: 'top' },
];
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

// New mapping for deep warm brown only
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

// New mapping for deep dark brown only
const deepDarkBrownRecommendationsByColorAndGender = {
  "scarlet": {
    "male": {
      watch: "Black or gold watch with scarlet-red dial accents",
      shoes: "Scarlet red sneakers",
      bag: "Deep red crossbody bag"
    },
    "female": {
      watch: "Black or gold watch with scarlet-red dial accents",
      shoes: "Red pumps or ankle-strap heels",
      bag: "Deep red clutch bag"
    }
  },
  "olive": {
    "male": {
      watch: "Olive green nylon strap watch (military/sporty)",
      shoes: "Olive leather boots",
      cap: "Olive baseball cap"
    },
    "female": {
      watch: "Olive green nylon strap watch (military/sporty)",
      shoes: "Olive block-heel sandals",
      headwear: "Olive headscarf"
    }
  },
  "amber": {
    "male": {
      necklace: "Amber stone pendant",
      bag: "Tan or amber mini-satchel",
      bracelet: "Beaded bracelet with amber/gold beads"
    },
    "female": {
      necklace: "Amber stone pendant",
      bag: "Tan or amber tote",
      bracelet: "Beaded bracelet with amber/gold beads"
    }
  },
  "chestnut": {
    "male": {
      watch: "Chestnut brown leather strap with matte black dial",
      shoes: "Chestnut loafers",
      wallet: "Chestnut leather wallet"
    },
    "female": {
      watch: "Chestnut brown leather strap with matte black dial",
      shoes: "Heeled boots or flats",
      clutch: "Chestnut leather envelope clutch"
    }
  },
  "warm gray": {
    "male": {
      shoes: "Warm gray slip-ons or sneakers",
      bag: "Taupe/warm gray structured backpack",
      scarf: "Lightweight neutral-toned scarf"
    },
    "female": {
      shoes: "Warm gray slip-ons or sneakers",
      bag: "Taupe/warm gray structured handbag",
      scarf: "Lightweight neutral-toned scarf"
    }
  }
};

// LocalStorage keys
const PURCHASE_HISTORY_KEY = 'purchaseHistoryBySkinTone';
const PURCHASE_COUNTER_KEY = 'purchaseCounterBySkinTone';

// Initialize from localStorage or default
function loadFromLocalStorage(key, defaultValue) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

// Default structure
const defaultHistory = {
  'rgb(255, 200, 157)': [],
  'rgb(166, 84, 0)': [],
  'rgb(75, 15, 0)': []
};
const defaultCounter = {
  'rgb(255, 200, 157)': 0,
  'rgb(166, 84, 0)': 0,
  'rgb(75, 15, 0)': 0
};

// On server close (fresh load), reset counters to 0 if not present
const initialHistory = loadFromLocalStorage(PURCHASE_HISTORY_KEY, defaultHistory);
const initialCounter = loadFromLocalStorage(PURCHASE_COUNTER_KEY, defaultCounter);

function getRecommendations(skinTone, color, gender) {
  if (skinTone && skinTone.replace(/\s/g, '').toLowerCase() === 'rgb(166,84,0)') {
    return recommendationsByColorAndGender[color.toLowerCase()]?.[gender] || {};
  } else if (skinTone && skinTone.replace(/\s/g, '').toLowerCase() === 'rgb(75,15,0)') {
    return deepDarkBrownRecommendationsByColorAndGender[color.toLowerCase()]?.[gender] || {};
  } else if (skinTone && skinTone.replace(/\s/g, '').toLowerCase() === 'rgb(255,200,157)') {
    return recommendationMap[gender]?.[color.toLowerCase()] || {};
  }
  return {};
}

// Helper to get allowed product colors for current skin tone
function getAllowedColorsForSkinTone(skinTone) {
  const tone = skinTone && skinTone.replace(/\s/g, '').toLowerCase();
  if (tone === 'rgb(255,200,157)') {
    return ['coral', 'salmon', 'turquoise', 'champagne', 'warm gray'];
  } else if (tone === 'rgb(166,84,0)') {
    return ['cranberry', 'army green', 'gold', 'russet', 'pumpkin'];
  } else if (tone === 'rgb(75,15,0)') {
    return ['scarlet', 'olive', 'amber', 'chestnut', 'warm gray'];
  }
  return [];
}

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gender, setGender] = useState('female');
  const [showOutfit, setShowOutfit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [purchaseHistoryBySkinTone, setPurchaseHistoryBySkinTone] = useState(initialHistory);
  const [purchaseCounterBySkinTone, setPurchaseCounterBySkinTone] = useState(initialCounter);

  // On mount, ensure localStorage is initialized (reset to 0 if not present)
  useEffect(() => {
    if (!localStorage.getItem(PURCHASE_COUNTER_KEY)) {
      saveToLocalStorage(PURCHASE_COUNTER_KEY, defaultCounter);
      setPurchaseCounterBySkinTone(defaultCounter);
    }
    if (!localStorage.getItem(PURCHASE_HISTORY_KEY)) {
      saveToLocalStorage(PURCHASE_HISTORY_KEY, defaultHistory);
      setPurchaseHistoryBySkinTone(defaultHistory);
    }
  }, []);

  const handleReset = () => {
    setResult(null);
    setError(null);
    setShowOutfit(false);
    setSelectedProduct(null);
    setRecommendations(null);
  };

  // Add this function to reset the purchase counter
  const handleResetCounter = () => {
    setPurchaseCounterBySkinTone(defaultCounter);
    saveToLocalStorage(PURCHASE_COUNTER_KEY, defaultCounter);
    setPurchaseHistoryBySkinTone(defaultHistory);
    saveToLocalStorage(PURCHASE_HISTORY_KEY, defaultHistory);
  };

  const allowedColors = result ? getAllowedColorsForSkinTone(result.detectedSkin) : [];
  const filteredProducts = products.filter((p) => p.gender === gender && allowedColors.includes(p.color.toLowerCase()));

  // Handle product selection and show recommendations
  const handleBuy = (product) => {
    setSelectedProduct(product);
    const recs = getRecommendations(result.detectedSkin, product.color, product.gender);
    setRecommendations(recs);
    // Update purchase history and counter
    if (result && result.detectedSkin) {
      const skinTone = result.detectedSkin;
      setPurchaseHistoryBySkinTone(prev => {
        const updated = { ...prev };
        if (!updated[skinTone]) updated[skinTone] = [];
        if (!updated[skinTone].includes(product.tag)) {
          updated[skinTone] = [...updated[skinTone], product.tag];
        }
        saveToLocalStorage(PURCHASE_HISTORY_KEY, updated);
        return updated;
      });
      setPurchaseCounterBySkinTone(prev => {
        const updated = { ...prev };
        updated[skinTone] = (updated[skinTone] || 0) + 1;
        saveToLocalStorage(PURCHASE_COUNTER_KEY, updated);
        return updated;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Inclusive Color Harmony
          </h1>
          <p className="text-xl text-gray-600">
            Discover clothing colors that complement your unique skin tone
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!result ? (
          <div className="bg-white shadow rounded-lg p-8 mb-8">
            <ImageUpload 
              setResult={setResult} 
              setIsLoading={setIsLoading}
              setError={setError}
            />
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or select from palette
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center mb-6">
              <h3 className="text-lg font-semibold mb-3">Select your gender</h3>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`flex items-center gap-2 px-5 py-2 rounded-full border-2 transition 
                    ${gender === 'female' ? 'bg-indigo-600 text-white border-indigo-600 shadow' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                  onClick={() => setGender('female')}
                >
                  <span role="img" aria-label="female">♀️</span> Female
                </button>
                <button
                  type="button"
                  className={`flex items-center gap-2 px-5 py-2 rounded-full border-2 transition 
                    ${gender === 'male' ? 'bg-indigo-600 text-white border-indigo-600 shadow' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                  onClick={() => setGender('male')}
                >
                  <span role="img" aria-label="male">♂️</span> Male
                </button>
              </div>
            </div>
            <ColorPalette 
              setResult={setResult} 
              setIsLoading={setIsLoading}
              setError={setError}
              gender={gender}
              setGender={setGender}
            />
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Color Analysis</h2>
                  <p className="text-gray-600 mb-6">Based on your skin tone, these colors will complement you beautifully</p>
                </div>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Start Over
                </button>
                {/* Reset Counter Button */}
                <button
                  onClick={handleResetCounter}
                  className="ml-4 inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Reset Counter
                </button>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Detected Skin Tone</h3>
                <div className="flex items-center">
                  <div 
                    className="w-12 h-12 rounded-full border-2 border-white shadow-md mr-4"
                    style={{ backgroundColor: result.detectedSkin }}
                  ></div>
                  <span className="text-gray-700">{result.detectedSkin}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recommended Colors</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {result.recommendations.map((color, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-full h-16 rounded-md shadow-sm mb-2"
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="text-sm text-gray-600">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outfit Recommendation Toggle and Section */}
              <div className="mt-8">
                <button
                  className="mb-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 focus:outline-none"
                  onClick={() => setShowOutfit((prev) => !prev)}
                >
                  Show Recommendations
                </button>
                {showOutfit && (
                  <>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a product to purchase</h3>
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                      {filteredProducts.map((product) => {
                        const skinTone = result && result.detectedSkin;
                        const counter = skinTone ? purchaseCounterBySkinTone[skinTone] : 0;
                        const isHighlyRecommended = skinTone && counter > 0 && purchaseHistoryBySkinTone[skinTone]?.includes(product.tag);
                        return (
                          <div key={product.tag} className="flex flex-col items-center mb-4" style={{ width: '12rem' }}>
                            {isHighlyRecommended && (
                              <span className="mb-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full whitespace-nowrap z-10" style={{ marginTop: '0.25rem' }}>
                                Highly Recommended
                              </span>
                            )}
                            <div
                              className={`border rounded-lg p-4 shadow-sm flex flex-col items-center w-full min-h-[180px] bg-white relative`}
                              style={{ marginTop: 0 }}
                            >
                              <h4 className="font-semibold w-full text-left mb-2">{product.name}</h4>
                              <p className="text-sm text-gray-600 capitalize">Color: {product.color}</p>
                              <p className="text-sm text-gray-600 capitalize">Type: {product.type}</p>
                              <button
                                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none"
                                onClick={() => handleBuy(product)}
                              >
                                Buy
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {/* Recommendation Bar */}
                    {selectedProduct && recommendations && Object.keys(recommendations).length > 0 && (
                      <div className="fixed left-0 right-0 bottom-0 flex flex-row justify-center gap-8 z-50" style={{ minHeight: '120px' }}>
                        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mb-4 shadow-lg w-full max-w-2xl flex flex-col gap-4">
                          <h3 className="font-bold text-indigo-700 text-xl mb-2 text-center">People also purchased this product</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {Object.entries(recommendations).map(([item, value]) => (
                              <div key={item} className="bg-white rounded p-3 border border-gray-200 shadow-sm flex flex-col items-center">
                                <span className="font-semibold text-gray-800 mb-1">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                                <span className="text-gray-700 text-center">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Remember that these are suggestions - the most important thing is wearing colors that make you feel confident!
              </p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analyzing your colors...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;