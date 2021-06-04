import type {ReactNode, ReactEventHandler} from 'react'
import styles from './popup.module.scss'

interface IProps {
    children?: ReactNode
    toggle?: () => void
}


export default function Popup ({children, toggle}: IProps) {
    const onClick = () => {
        return toggle && toggle()
    }
    const stopDefault: ReactEventHandler<HTMLDivElement> = e => {
        e.stopPropagation()
    }
    return (
        <div className={styles.modal} onClick={onClick}>
            <div className={styles.modal_content} onClick={stopDefault}>
                {children}
            </div>
        </div>
    )
}
