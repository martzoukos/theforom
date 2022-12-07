import { useState } from "react";
import { Typeahead, Menu, MenuItem } from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import styles from './CategoriesInput.module.css'
import Pill from "./Pill";

export default function CategoriesInput() {
  const [suggestion, setSuggestions] = useState([])

  const categories = [
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
        Categories (up to 3)
      </label>
      <label htmlFor="categories-input" className={styles.fauxInput}>
        <Pill name={'Category 1'} onClick={() => {
          console.log('click')
        }} />
        <Pill name={'Category 1'} onClick={() => {
          console.log('click')
        }} />
        <Pill name={'Category 1'} onClick={() => {
          console.log('click')
        }} />
        <Typeahead
          id='category-1'
          labelKey='Category'
          onChange={setSuggestions}
          options={categories}
          selected={suggestion}
          inputProps={{ 
            id: 'categories-input',
            className: styles.typeahead 
          }}
          renderMenu={(results, menuProps) => (
            <Menu {...menuProps} className={styles.dropDown}>
              {results.map((result, index) => (
                <MenuItem 
                  option={result} 
                  position={index}
                  key={index}
                  className={styles.dropDownItem}
                >
                  {result}
                </MenuItem>
              ))}
            </Menu>
          )}
        />
      </label>
    </div>
  )
}