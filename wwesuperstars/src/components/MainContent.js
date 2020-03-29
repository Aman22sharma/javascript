import React from 'react';
import Data from './Data';
import Card from './Card';

class MainContent extends React.Component {
  render() {
    Data.wrestlers.forEach(item => {
      let name = item.name;
      name = name.toLowerCase();
      name = name.replace(/ /g, '+');
      name = name.replace(/'/g, '');
      name = name.replace(/-/g, '');
      name = `wwe+${name}`;
      item.query = name;
    });
    const cards = Data.wrestlers.map(wrestler => <Card key={wrestler.name} name={wrestler.name} src={wrestler.query} alt={wrestler.name} />);
    return (
      <main className='main'>
        {cards}
      </main>
    );
  }
}

export default MainContent;