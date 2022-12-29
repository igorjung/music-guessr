export * from './artist.service'
export * from './search.service'
export * from './game.service'
export * from './modal.service'

import { ArtistService } from './artist.service'
import { SearchService } from './search.service'
import { GameService } from './game.service'
import { ModalService } from './modal.service'

export const services = [
  ArtistService,
  SearchService,
  GameService,
  ModalService,
];

export default services;
