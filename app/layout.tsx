import { Layout } from './_components/Layout'
import { AuthProvider } from './_providers/Auth'

import './styles/globals.css'

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className="h-full bg-white">
      <body className="h-full text-gray-600">
        <AuthProvider
          // To toggle between the REST and GraphQL APIs,
          // change the `api` prop to either `rest` or `gql`
          api="rest" // change this to `gql` to use the GraphQL API
        >
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  )
}
