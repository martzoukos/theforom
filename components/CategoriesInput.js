import { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import styles from './CategoriesInput.module.css'

export default function CategoriesInput() {
  const [selection, setSelection] = useState([])
  const [categories, setCategories] = useState([])

  const options = [
    'general',
    'generals',
    'generallisimo',
    'generalto',
    'animals',
    'fun',
    'sports',
    'it',
  ]

  return(
    <div className={styles.container}>
      <label htmlFor="categories-input" className={styles.label}>
        Categories
      </label>
      <label htmlFor="categories-input" className={styles.fauxInput}>
        <div className='rbt-override'>
          <Typeahead
            id='categories-input'
            labelKey='Category'
            options={options}
            onChange={setSelection}
            selected={selection}
            inputProps={{ 
              id: 'categories-input',
            }}
            multiple={true}
          />
        </div>
      </label>
    </div>
  )
}

const upsert = (array, element) => {
  const i = array.findIndex(_element => _element.id === element.id)
  console.log('index', i)
  if (i > -1) {
    array[i] = element
  } else {
    console.log('are we pushing?')
    array.push(element)
  }
  console.log(array, element)
  return array
}