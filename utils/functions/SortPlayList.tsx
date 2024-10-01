import { useEffect, useState } from "react";

const SortedPlayList = ({
  playlists,
  user,
}: {
  playlists: any;
  user: string;
}) => {
  let playlists1;

  if (user) {
    let tempPLayList;
    let tempPLayList2;
    if (user && playlists) {
      tempPLayList = playlists?.filter(
        ({ owner }: { owner: any }) => user === owner?.display_name
      );
      tempPLayList2 = playlists?.filter(
        ({ owner }: { owner: any }) => user != owner?.display_name
      );
      const temp = tempPLayList.concat(tempPLayList2);
      temp?.length > 0 && (playlists1 = temp);
    }
  }
  return playlists1;
};

export default SortedPlayList;
