// import React from 'react';
// import axios from 'axios';

// function ImageUpload({ setResult }) {
//   const handleUpload = async (e) => {
//     const formData = new FormData();
//     formData.append('image', e.target.files[0]);

//     const res = await axios.post('http://localhost:5000/upload', formData);
//     setResult(res.data);
//   };

//   return (
//     <div>
//       <h3>Upload Your Image</h3>
//       <input type="file" onChange={handleUpload} />
//     </div>
//   );
// }

// export default ImageUpload;


















import React from 'react';
import axios from 'axios';

function ImageUpload({ setResult, setIsLoading, setError }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Basic validation
    if (!file.type.match('image.*')) {
      setError('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      setError('Image size should be less than 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResult(res.data);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">Upload a photo</h3>
        <p className="mt-1 text-sm text-gray-600">
          For best results, use a well-lit photo with your face clearly visible
        </p>
        <div className="mt-6">
          <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Choose a file
            <input 
              type="file" 
              onChange={handleUpload} 
              className="sr-only"
              accept="image/*"
            />
          </label>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          JPEG, PNG up to 5MB
        </p>
      </div>
    </div>
  );
}

export default ImageUpload;