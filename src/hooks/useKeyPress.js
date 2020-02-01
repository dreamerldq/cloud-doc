import React, {
  useState,
  useEffect
} from 'react';

const useKeyPress = (tragetKeyCode) => {
  const [keyPressed, setKeyPressed] = useState(false);
  const keyDown = ({
    keyCode
  }) => {
    if (keyCode === tragetKeyCode) {
      setKeyPressed(true)
    }
  }
  const keyUp = ({keyCode}) => {
    if (keyCode === tragetKeyCode) {
      setKeyPressed(false)
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', keyDown)
    document.addEventListener('keyup', keyUp)
    return () => {
     document.removeEventListener('keydown', keyDown)
     document.removeEventListener('keyup', keyUp)
    };
  },[]);
  return keyPressed
}
export default useKeyPress