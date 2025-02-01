import styles from "../styles/home.module.scss"

import NavBar from "../components/NavBar"

export default function Home() {
    return (
        <>
            <div className={styles.main}>
                <NavBar></NavBar>
            </div>
        </>
    )
}