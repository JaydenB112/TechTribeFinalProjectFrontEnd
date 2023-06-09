// import {
//     Button
//   } from "@mui/material";
  


  const Position = ({ player, round, advancePlayer, retreatPlayer }) => {
    let loseButton = round === 0 ? ''  : <button onClick={() => retreatPlayer(player)}>-</button>;
  
    return (
      <>
        <div className='position mb-2'>
          {loseButton}
          <input type='text' value={player}/>
          <button onClick={() => advancePlayer(player)}>+</button>
        </div>
      </>
    );
  };
  
  export default Position;
