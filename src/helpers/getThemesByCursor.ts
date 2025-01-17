
import {ITheme} from 'src/garden'

import fetchGists, {IGraphqlPageQuery, IGraphqlPageInfo} from './fetchGists'
import safeReadJson from './safeReadJson'
import isValidTheme from './isValidTheme'


export default async function getThemesByCursor (query: IGraphqlPageQuery = {}): Promise<{
    themes: ITheme[]
    pageInfo: IGraphqlPageInfo
}> {
    const {gists, pageInfo} = await fetchGists(query)

    const themes: ITheme[] = gists.map(({name: id, files}) => ({
        id,
        theme: `/api/theme/${id}`,
        manifest: safeReadJson(files.find(file => file.name === 'manifest.json')?.text, {}),
    })).filter(isValidTheme)

    return {
        themes,
        pageInfo,
    }
}
