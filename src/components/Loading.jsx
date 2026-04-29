function Loading({ message = 'Carregando...' }) {
  return (
    <div className="loading">
      <div className="spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  )
}
export default Loading
