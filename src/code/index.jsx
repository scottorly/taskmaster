import styles from './styles.module.css'

const Code = ({ children, attributes: { snippet, dataline }}) => (
    <>
        <p>
            {children}
        </p>
        <figure className={styles.small}>
                <pre data-line={dataline} >
                    <code className={`${styles.code} language-swift`}>
                        { snippet }
                    </code>
                </pre>
        </figure>
    </>
)

const SideCode = ({ attributes: { snippet }}) => (
    <pre>
        <code className={`${styles.code} language-swift`}>
            { snippet }
        </code>
    </pre>
)

export { Code as default, SideCode }