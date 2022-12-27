import styles from './FormAddField.module.css'

export default function FormAddField({
  type='text',
  id,
  label,
  notes,
  register,
  validations={},
  errors,
}) {
  return(
    <div>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input 
        className={styles.input}
        type={type}
        id={id}
        {...register(id, validations)}
      />
      {notes?.map((note, i) => {
        return(
          <p className={styles.note} key={i}>
            {note}
          </p>
        )
      })}
      {errors[id]?.type === 'validate' && 
        <p className={styles.error}>{errors[id].message}</p>
      }
      {errors[id]?.type === 'required' && 
        <p className={styles.error}>This field is required</p>
      }
    </div>
  )
}