import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Room from './pages/Room'
import { ChatContextProvider } from './contexts/chat.context'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/room',
      element: (
        <ChatContextProvider>
          <Room />
        </ChatContextProvider>
      ),
    },
  ])

  return <RouterProvider router={router} />
}

export default App
