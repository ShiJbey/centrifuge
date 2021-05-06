export interface Simulation {
  seed?: string | number;
  town: {
    name: string;
    founding_year?: number;
    places?: { [id: string]: any };
    people: { [id: string]: Person };
    residents?: number[];
    apartment_complexes?: number[];
    houses?: number[];
    settlers?: number[];
    departed?: number[];
    deceased?: number[];
    businesses?: number[];
    former_businesses?: number[];
    streets?: { [id: string]: any };
    lots?: { [id: string]: any };
    tracts?: { [id: string]: any };
    parcels: { [id: string]: any };
    residences?: number[];
    blocks?: { [id: string]: any };
    paths?: { [id: string]: any };
    downtown?: number;
    cemetery?: number;
    city_hall?: number;
    fire_station?: number;
    hospital?: number;
    police_station?: number;
    school?: number;
    university?: number;
  };
  events?: { [id: string]: Event };
}

export interface Occupation {
  company?: number;
  end_date?: number;
  hired_as_favor?: boolean;
  hiring?: number;
  level?: number;
  person?: number;
  preceded_by?: number;
  shift?: string;
  start_date?: number;
  succeeded_by?: number;
  supplemental?: boolean;
  terminus?: number;
  type?: string;
  vocation?: string;
}

export interface Event {
  event_id: string;
}

export interface Person {
  id: number;
  type: string;
  birth: number;
  town: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  name_suffix: string;
  maiden_name: string;
  age: number;
  sex: string;
  spouse: number;
  attracted_to: string[];
  parents: number[];
  birth_day: number;
  birth_month: number;
  birth_year: number;
  death_year: number;
  tags?: string[];
  occupation: Occupation;
  occupations: Occupation[];
  biological_mother: number;
  adult: boolean;
  friends: number[];
  enemies: number[];
  sexual_partners: number[];
  widowed: boolean;
  acquaintances: number[];
  best_friend: number;
  worst_enemy: number;
  pregnant: boolean;
  impregnated_by: number;
}
