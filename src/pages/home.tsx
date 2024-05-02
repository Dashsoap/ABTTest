import logo from '../logo.svg';
import MyCard from '../components/my-card';

function Home() {
  return (
    <header className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
      <MyCard />
    </header>
  );
}

export default Home;
