import { AlbumInterface } from "../interfaces";

export function validateAlbums(albums: AlbumInterface[]) {
  let validatedAlbums: AlbumInterface[] = [];

  console.log(validatedAlbums);

  albums.forEach(album => {
    const filterAlbumsByName = validatedAlbums.filter((item) =>
      item.name.toUpperCase() === album.name.toUpperCase()
    );

    const checkAlbumVersion =
      album.name.toUpperCase().includes("DELUXE") ||
      album.name.toUpperCase().includes("KARAOKE") ||
      album.name.toUpperCase().includes("EDITION") ||
      album.name.toUpperCase().includes("TOUR") ||
      album.name.toUpperCase().includes("LIVE FROM") ||
      album.name.toUpperCase().includes("STUDIO SESSION") ||
      album.name.toUpperCase().includes("RELEASE SPECIAL");

    if(!filterAlbumsByName.length && !checkAlbumVersion) {
      validatedAlbums.push(album)
    }
  });

  return validatedAlbums;
}
