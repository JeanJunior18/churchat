import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  function handleCreateRoom() {
    navigate('/room');
  }

  function handleIngressRoom() {}

  return (
    <div>
      <h1>Churchat</h1>
      <button onClick={handleCreateRoom}>Criar Sala</button>
      <button onClick={handleIngressRoom}>Entrar em uma sala</button>
    </div>
  );
}
