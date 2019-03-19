import * as React from 'react';

import MinesweeperGame from './MinesweeperGame';

class App extends React.Component {
  public render() {
    return (
      <MinesweeperGame
        rows={ 10 }
        columns={ 10 }
        mines={ 10 }
      />
    );
  }
}

export default App;
