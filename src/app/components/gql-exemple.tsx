import React from "react";
import {gql, useQuery} from "@apollo/client";
import {IconLoader} from "@tabler/icons";
import "./gql-example.scss";

const CHARACTERS = gql`
  query Characters {
    characters { results { id name image } }
  }
`;

const LOCATIONS = gql`
  query Locations {
    locations { results { id name type } }
  }
`;

export const GQLExample = () => {

  const { loading, data } = useQuery(CHARACTERS);

  if (loading) return <IconLoader />;

  return (
    <ul className="rm-char-list">
      {data.characters.results.slice(0, 4).map(char =>
        <li key={char.id} className="a-char">
          <img src={char.image} alt={char.name} />
          <span className="name">{char.name}</span>
        </li>)
      }
    </ul>);

}

export const ClientOnlyGQLExample = () => {

  const { loading, data } = useQuery(LOCATIONS, {
    ssr: false
  });

  if (loading) return <IconLoader />

  return (
    <ul className="rm-loc-list">
      {data.locations.results.map(loc =>
        <li key={loc.id} className="a-loc">{loc.name} ({loc.type})</li>)
      }
    </ul>);

}
