import cssContent from '@/lib/css-content'

const config = cssContent.parse('body').json()

export default {
  ...config
}
