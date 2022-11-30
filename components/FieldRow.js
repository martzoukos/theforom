import styles from './FieldRow.module.css';

export default function FieldRow({ 
  label, 
  name,
  type='text',
  defaultValue,
  registerFunc,
  inputParams,
}) {
  return (
    <div className={styles.row}>
      { label && 
        <label 
          className={styles.label} 
          htmlFor={name}
        >
          { label }
        </label>
      }
      {type === 'textarea'
      ? <textarea
          type={type}
          name={name}
          id={name}
          {...registerFunc(name)}
          defaultValue={defaultValue}
        />
      :
        <input 
          type={type}
          name={name}
          id={name}
          {...inputParams}
          defaultValue={defaultValue}
          {...registerFunc(name)}
        />
      }
    </div>
  )
};