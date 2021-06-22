import Home from './Pages/Home'
import PlayerPage from './Pages/PlayerPage'
import GamePage from './Pages/GamePage'
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/player" component={PlayerPage} />
      <Route exact path="/game-page" component={GamePage} />
    </Switch>
  );
}

export default App;
