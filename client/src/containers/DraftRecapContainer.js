import React, { useState } from 'react';

import DraftRecapTable from '../components/DraftRecapTable';

import styled from 'styled-components';

function DraftRecapContainer(props) {
  const [sortMode, setSortMode] = useState('round');
  const [ejsChecked, setChecked] = useState(false);

  // Adjusting raw data, calculating difference
  const data = props.data.map((player) => {
    const team = props.teams.filter((team) => team.teamId === player.teamId);
    const ranking = ejsChecked
      ? player.rankingSeason
      : player.rankingNoEjsSeason;
    const rating = ejsChecked ? player.ratingSeason : player.ratingNoEjsSeason;
    const difference = player.pickNumber - ranking;

    return {
      ...player,
      fullTeamName: team[0].fullTeamName,
      ranking: ranking,
      rating: rating,
      difference: difference,
    };
  });

  const sortList = ['round', 'team', 'ranking', 'difference'];

  const handleSortChange = (e) => {
    setSortMode(e.target.value);
  };

  const handleCheckbox = (e) => {
    setChecked(!ejsChecked);
  };

  return (
    <Container>
      <Forms>
        <DropDown value={sortMode} onChange={handleSortChange}>
          {sortList.map((mode) => {
            const capital = mode[0].toUpperCase() + mode.slice(1)
            return (
              <option value={mode} key={mode}>
                Sort By {capital}
              </option>
            );
          })}
        </DropDown>
        <Checkbox>
          <input
            type='checkbox'
            checked={ejsChecked}
            onChange={handleCheckbox}
          />
          Count Ejections
        </Checkbox>
      </Forms>
      <DraftRecapTable data={data} sortMode={sortMode} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Forms = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-bottom: 1rem;
`;

const DropDown = styled.select`
  margin: 0 0.1rem;
`;

const Checkbox = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  input {
    height: 16px;
    width: 16px;
    margin: 0 0.25rem;
  }
`;

export default DraftRecapContainer;
