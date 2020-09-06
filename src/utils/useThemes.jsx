import React, {createContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';

const themes = {
  dark: {
    backgroundColor: 'rgba(170, 164, 164, 0.8)',
    color: 'white'
  },
  light: {
    backgroundColor: 'rgba(61, 26, 26, 0.8)',
    color: 'black'
  }
}

const initialState = {
  dark: false,
  theme: themes.light,
  toggle: () => {}
}
const ThemeContext = createContext(initialState);

const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('dark') === 'true'
    setDark(isDark)
  }, [dark])

  const toggle = () => {
    const isDark = !dark;
    localStorage.setItem('dark', JSON.stringify(isDark))
    setDark(isDark)
  }

  const theme = !dark ? themes.dark : themes.light

  return (
    <ThemeContext.Provider value={{ theme, dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node
}

ThemeProvider.defaultprops = {
  children: <div/>
}


export { ThemeProvider, ThemeContext }