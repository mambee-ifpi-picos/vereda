import ProtectedRoute from '../components/protectedRoute'

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <h2>Logged In</h2>
    </ProtectedRoute>
  )
}

export default DashboardPage
