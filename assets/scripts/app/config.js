import cssContent from '@/lib/css-content'

const cssConfig = cssContent.parse('body').json()

export default {
  ...cssConfig
}
