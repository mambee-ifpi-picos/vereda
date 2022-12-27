import ProtectedRoute from '../../components/ProtectedRoute'

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <h2>Dashboard</h2>
    </ProtectedRoute>
  )
}

export default DashboardPage
