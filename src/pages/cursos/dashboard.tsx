import ProtectedRoute from '../../components/ProtectedRoute'

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <h2>Logged In</h2>
    </ProtectedRoute>
  )
}

export default DashboardPage
