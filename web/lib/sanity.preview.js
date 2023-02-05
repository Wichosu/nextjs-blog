import { dataset, projectId } from 'lib/sanity.api'
import { definePreview } from 'next-sanity/preview'

let alerted = false
export const usePreview = definePreview({
  projectId,
  dataset,
  onPublicAccessOnly: () => {
    // You can opt to throw an error here instead of using `window.alert`, and customize how it displays by wrapping the component calling `usePreview` in an ErrorBoundary
    // https://reactjs.org/docs/error-boundaries.html
    if (!alerted) {
      // eslint-disable-next-line no-alert
      alert('You are not logged in. You will only see public data.')
      alerted = true
    }
  },
})