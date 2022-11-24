import Link from "next/link"
import styles from './CategoriesList.module.css'

export default function CategoriesList({ categories }) {
  return(
    <div className={styles.list}>
      {categories.map((category, i) =>
        <Link 
          key={i}
          href={`/categories/${category.name}`}
          className={styles.category}
        >
          {category.name} ({category._count.threads})
        </Link>
      )}
    </div>
  )
}