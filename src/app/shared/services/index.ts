export * from './artist.service'
export * from './search.service'
export * from './game.service'

import { ArtistService } from './artist.service'
import { SearchService } from './search.service'
import { GameService } from './game.service'

export const services = [
  ArtistService,
  SearchService,
  GameService
];

export default services;
