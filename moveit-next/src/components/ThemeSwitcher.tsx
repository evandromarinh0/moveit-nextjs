import styles from '../styles/components/ThemeSwitcher.module.css';
import Switch from 'react-switch';
import { useTheme } from 'next-themes';

export function ThemeSwitcher() {
  const {theme, setTheme} = useTheme();

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light' );
  }

  return(
    <div className={styles.container}>
      <Switch 
        onChange={toggleTheme}
        checked={theme === 'dark'}
        checkedIcon={false}
        uncheckedIcon={false}
        height={15}
        width={40}
        offHandleColor='#DCDDE0'
        handleDiameter={20}
        offColor='#666'
        onColor='#1f1b24'

      />
    </div>
  );
}