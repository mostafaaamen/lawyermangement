import { useState, useEffect } from 'react';
import { LANGUSED } from '../assets/lang.js';
const useLanguage = (dataLang) => {
  const [lang, setLang] = useState({});
  useEffect(() => {
    if (LANGUSED && dataLang[LANGUSED]) {
      setLang(dataLang[LANGUSED]);
    } else {
      setLang(dataLang['en']); 
    }
  }, [LANGUSED]);
  return lang; 
};

export default useLanguage;





