import axios from "axios";
import { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import styles from './CategoriesInput.module.css'

export default function CategoriesInput({ categories, setCategories}) {
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => { 
    setLoading(true)
    const fetchData = async () => {
      const { data } = await axios.get('/api/category')
      const categoriesArray = data.map(c => {
        return {
          id: c.id,
          description: `${c.name} (${c._count.threads} threads)`,
        }
      })
      setOptions(categoriesArray)
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleOnBlur = () => {
    if (searchTerm !== '') {
      const index = categories.findIndex(c => c.description === searchTerm)
      if (index > -1) {
        categories[index] = {
          id: 0,
          description: searchTerm
        }
      } else {
        categories.push({
          id: 0,
          description: searchTerm
        })
      }
    }
  }

  return(
    <div className={styles.container}>
      <label htmlFor="categories-input" className={styles.label}>
        Categories
      </label>
      <label htmlFor="categories-input">
        <div className='rbt-override'>
          <Typeahead
            id='categories-input'
            labelKey='description'
            options={options}
            selected={categories}
            onChange={setCategories}
            onInputChange={setSearchTerm}
            emptyLabel={`Will create a new category named '${searchTerm}'`}
            inputProps={{ 
              id: 'categories-input',
            }}
            onBlur={handleOnBlur}
            multiple={true}
            disabled={loading}
            placeholder={loading && 'loading categories...'}
          />
        </div>
      </label>
    </div>
  )
}