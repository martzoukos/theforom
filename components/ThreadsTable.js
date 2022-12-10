import styles from "./ThreadsTable.module.css"
import ThreadsTableRow from "./ThreadsTableRow"

export default function ThreadsTable({ threads }) {
  return(
    <div className={styles.tableContainer}>
      <div className={styles.scrollable}>
        <table cellPadding='0' cellSpacing='0' width='100%' className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.headerCell}>Topic</th>
              <th className={styles.headerCell}>Categories</th>
              <th className={styles.headerCell}>Replies</th>
              <th className={styles.headerCell}>Latest</th>
            </tr>
          </thead>
          <tbody>
            {threads.map((thread, i) => (
              <ThreadsTableRow thread={thread} key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}