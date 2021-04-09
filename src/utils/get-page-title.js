const title = '晓春服装管理系统'

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`
    } else {
        `${title}`
    }
}