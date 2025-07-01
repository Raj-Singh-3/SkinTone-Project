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


















import React, { useState } from 'react';
import axios from 'axios';
import ImageUpload from './components/ImageUpload';
import ColorPalette from './components/ColorPalette';

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReset = () => {
    setResult(null);
    setError(null);
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
            <ColorPalette 
              setResult={setResult} 
              setIsLoading={setIsLoading}
              setError={setError}
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