
import {GetStaticProps, InferGetStaticPropsType} from 'next'

import Head from 'components/head'
import markdownToHtml from 'src/helpers/markdownToHtml'
import Fabric from 'src/components/fabric'
import Markdown, {IMarkdown} from 'src/components/markdown'
import style from './about.module.scss'


export const getStaticProps: GetStaticProps<IMarkdown, any> = async () => {
    const m0dule = await import('README.md')
    return {
        props: {
            content: await markdownToHtml(m0dule.default),
        },
    }
}

const About = (markdown: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <Fabric className={style['markdown-wrapper']} clearfix>
            <Fabric className={style.markdown} clearfix>
                <Head title="About | CSS Zen Garden" description="Originates from mezzoblue/csszengarden.com" />
                <Markdown {...markdown} />
            </Fabric>
        </Fabric>
    )
}

export default About