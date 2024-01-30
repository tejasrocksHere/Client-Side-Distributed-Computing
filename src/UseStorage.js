import { useEffect, useState } from 'react';
import { projectStorage, projectFirestore, timestamp } from './Config';

function useStorage({ file, setFile }) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (file) {
      const storageRef = projectStorage.ref(file.name);
  
      const uploadTask = storageRef.put(file);
  
      // Update progress during the upload
      uploadTask.on(
        'state_changed',
        (snap) => {
          const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        },
        (err) => {
          setError(err); // Capture and log the error
        },
        async () => {
          // File uploaded successfully
          try {
            const downloadURL = await storageRef.getDownloadURL();
            setUrl(downloadURL);
            console.log(url);
  
            // Add metadata to Firestore
  
            // Clear the file state to prevent multiple uploads
            setFile(null);
          } catch (err) {
            setError(err); // Capture and log any errors during URL retrieval
          }
        }
      );
    }
  }, [file, setFile]);
  

  return { progress, url, error };
}

export default useStorage;
