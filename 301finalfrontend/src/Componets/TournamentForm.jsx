import React, { useState } from "react";
import {
  Modal,
  Button,
  FormControl,
  TextField,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
// import BrackDisplay from "./BracketDisplay";


function TournamentForm({setPlayers, setGameName, fetchTournament, setTournamentChoices}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tournamentName, setTournamentName] = useState("");
  const [maxCompetitors, setMaxCompetitors] = useState("");
  const [competitorName, setCompetitorName] = useState("");
  const [competitorsList, setCompetitorsList] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);

  const handleGetTournaments = async () => {
    const res = await fetch("https://ttbackend-29bg.onrender.com/boards");
    const data = await res.json();
    console.log(data)
    setTournamentChoices(data);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      tournamentName,
      competitorsList,
      replacementList,
    };
    const newPlayerList = competitorsList.map((playerName, i) => {
      return {name: playerName, round: 0, position: i}
    })

    setSubmittedData(data);
    handleCloseModal();
    setPlayers(newPlayerList)
    setGameName(tournamentName)
  };
  
  const handleAddCompetitor = () => {
    if (competitorName.trim() !== "") {
      if (competitorsList.length >= maxCompetitors) {
        // Add the competitor to the replacement list if the roster is full
        setReplacementList([...replacementList, competitorName]);
      } else {
        // Add the competitor to the roster list if there is still space
        setCompetitorsList([...competitorsList, competitorName]);
      }
      setCompetitorName("");
    }
  };

  const handleChange = (event) => {
    setMaxCompetitors(event.target.value);
  };

  const [replacementList, setReplacementList] = useState([]);

  return (
    <>
      <Button className="mx-4" variant="contained" color="success" onClick={handleOpenModal}>
        make tournament
      </Button>

      <Button variant="contained" color="success" onClick={handleGetTournaments}>
        get tournament
      </Button>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <form className="form-container" onSubmit={handleSubmit}>
          <FormControl>
            <h2>Tournament Form</h2>
            <TextField
              id="outlined-basic"
              label="tournament name"
              variant="outlined"
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
            />
            <br/>
            <FormControl>
              <InputLabel id="demo-simple-select-label">
                number of competitors
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={maxCompetitors}
                label="number of competitors"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={32}>32</MenuItem>
                <MenuItem value={64}>64</MenuItem>
              </Select>
            </FormControl>
            <br />
            <TextField
              id="outlined-basic"
              label="competitor name"
              variant="outlined"
              value={competitorName}
              onChange={(e) => setCompetitorName(e.target.value)}
            />
            <br/>
            <Button variant="contained" type="button" onClick={handleAddCompetitor}>
              add competitor
            </Button>
            <br/>
            <div className="list-container">
              <ol className="scrollable-list">
                <h3>Tournament Roster</h3>
                {competitorsList.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ol>
            </div>
            <br />
            <Button variant="contained" type="submit">Submit</Button>
            <br/>
          </FormControl>
        </form>
      </Modal>
      {/* <BrackDisplay submittedData={submittedData} /> */}
    </>
  );
}

export default TournamentForm;

// import React, { useState } from "react";
// import {
//   Modal,
//   Button,
//   FormControl,
//   FormControlLabel,
//   TextField,
//   Switch,
//   MenuItem,
//   Select,
//   InputLabel,
// } from "@mui/material";
// import BrackDisplay from "./BracketDisplay";


// function TournamentForm() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [tournamentName, setTournamentName] = useState("");
//   const [maxCompetitors, setMaxCompetitors] = useState("");
//   const [competitorName, setCompetitorName] = useState("");
//   const [competitorsList, setCompetitorsList] = useState([]);
//   const [submittedData, setSubmittedData] = useState(null);


//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = {
//       tournamentName,
//       competitorsList,
//       replacementList,
//     };
//     setSubmittedData(data);
//     handleCloseModal();
//   };
  
//   const handleAddCompetitor = () => {
//     if (competitorName.trim() !== "") {
//       if (competitorsList.length >= maxCompetitors) {
//         // Add the competitor to the replacement list if the roster is full
//         setReplacementList([...replacementList, competitorName]);
//       } else {
//         // Add the competitor to the roster list if there is still space
//         setCompetitorsList([...competitorsList, competitorName]);
//       }
//       setCompetitorName("");
//     }
//   };

//   const handleChange = (event) => {
//     setMaxCompetitors(event.target.value);
//   };

//   const [replacementList, setReplacementList] = useState([]);

//   return (
//     <>
//       <Button variant="contained" color="success" onClick={handleOpenModal}>
//         make tournament
//       </Button>

//       <Modal open={isModalOpen} onClose={handleCloseModal}>
//         <form className="form-container" onSubmit={handleSubmit}>
//           <FormControl>
//             <h2>Tournament Form</h2>
//             <TextField
//               id="outlined-basic"
//               label="tournament name"
//               variant="outlined"
//               value={tournamentName}
//               onChange={(e) => setTournamentName(e.target.value)}
//             />
//             <br/>
//             <FormControl>
//               <InputLabel id="demo-simple-select-label">
//                 number of competitors
//               </InputLabel>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 value={maxCompetitors}
//                 label="number of competitors"
//                 onChange={handleChange}
//               >
//                 <MenuItem value="">
//                   <em>None</em>
//                 </MenuItem>
//                 <MenuItem value={4}>4</MenuItem>
//                 <MenuItem value={8}>8</MenuItem>
//                 <MenuItem value={16}>16</MenuItem>
//                 <MenuItem value={32}>32</MenuItem>
//                 <MenuItem value={64}>64</MenuItem>
//               </Select>
//             </FormControl>
//             <br />
//             <TextField
//               id="outlined-basic"
//               label="competitor name"
//               variant="outlined"
//               value={competitorName}
//               onChange={(e) => setCompetitorName(e.target.value)}
//             />
//             <br/>
//             <Button variant="contained" type="button" onClick={handleAddCompetitor}>
//               add competitor
//             </Button>
//             <br/>
//             <ol>
//               <h3>Tournament Roster</h3>
//               {competitorsList.map((name, index) => (
//                 <li key={index}>{name}</li>
//               ))}
//             </ol>
//             <br/>
//             <ol>
//               <h3>Roster Competitor Replacement</h3>
//               {replacementList.map((name, index) => (
//                 <li key={index}>{name}</li>
//               ))}
//             </ol>
//             <br />
//             <FormControlLabel control={<Switch />} label="double elimination" />
//             <br/>
//             <Button variant="contained" type="submit">Submit</Button>
//             <br/>
//           </FormControl>
//         </form>
//       </Modal>
//       <BrackDisplay submittedData={submittedData} />
//     </>
//   );
// }

// export default TournamentForm;

