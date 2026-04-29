function ErrorMessage({ message = 'Algo deu errado.' }) {
  return <div className="error-banner">⚠️ {message}</div>
}
export default ErrorMessage
