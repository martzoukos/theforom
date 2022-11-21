import styles from './Container.module.css';

export default function Container({ isNarrow, children }) {
  return (
    <div className={[
      styles.container, 
      isNarrow ? styles.containerNarrow : ''
      ].join(" ")}
    >
      {children}
    </div>
  )
}