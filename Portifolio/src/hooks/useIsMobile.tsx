import { useState, useEffect } from 'react';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    // Verifica o tamanho da tela assim que o componente é montado
    handleResize();
    
    window.addEventListener('resize', handleResize);
    
    // Remove o listener quando o componente é desmontado
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}
