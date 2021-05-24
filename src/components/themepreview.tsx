
import {useState, ReactEventHandler} from 'react'
import Image from 'next/image'

import {mbem} from 'src/helpers'
import {useTimer} from 'src/hooks'
import {AWS_HOST} from 'src/config'
import type {ITheme} from 'src/garden'
import {Fabric, Quote, Link} from 'src/components'
import Domino from './domino'
import styles from './themepreview.module.scss'


const bem = mbem(styles)
const IMAGE_TIMEOUT = 5000

export default function ThemePreview ({theme}: {theme: ITheme}) {
    const {id, manifest} = theme
    const snapshotSrc = `https://${AWS_HOST}/desktop/czg.vercel.app/theme/${id}.jpg`
    const snapshotApiPath = `/api/snapshot/${id}`
    const themePath = `/theme/${id}`

    const [loading, setLoading] = useState(true)
    const [usingIframe, setUsingIframe] = useState(false)

    const onComplete = () => {
        cancelTimer()
        setLoading(false)
    }

    const onError = () => {
        onComplete()
        setUsingIframe(true)
        fetch(snapshotApiPath)
    }

    const cancelTimer = useTimer(onError, IMAGE_TIMEOUT)

    const onLoad: ReactEventHandler<HTMLImageElement> = e => {
        if (e.currentTarget.src.startsWith('data:image/gif;base64')) return
        onComplete()
    }

    return (
        <Fabric className={`${bem('preview')}`} clearfix verticle grow>
            <Link className={`${bem('preview', 'frame-wrapper')}`} href={`/theme/${id}`} target="_blank">
                <Fabric className={bem('preview', 'frame')}>
                    {loading && <Domino />}
                    {usingIframe
                        ? <iframe src={themePath} className={bem('preview', 'iframe')} frameBorder="0" scrolling="no" />
                        : <Image layout="fill" onLoad={onLoad} onError={onError} src={snapshotSrc} alt={snapshotSrc} />
                    }
                </Fabric>
            </Link>
            <Fabric className={bem('preview', 'title')}><Quote inline quote={manifest.name} author={manifest.author} /></Fabric>
        </Fabric>
    )
}
