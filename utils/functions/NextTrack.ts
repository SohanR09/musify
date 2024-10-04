function NextTrack({
  playListArray,
  trackId,
}: {
  playListArray: any;
  trackId: string;
}) {
  if (playListArray?.length > 0 && trackId !== "") {
    let nextTrack;
    // / Find the index of the object with the matching id
    const currentIndex = playListArray.findIndex(
      ({ track }: { track: any }) => track?.id === trackId
    );
    // If the id is found in the array
    if (currentIndex !== -1) {
      // If it's the last object, return the first object
      if (currentIndex === playListArray.length - 1) {
        nextTrack = playListArray?.[0];
      } else {
        // Otherwise, return the next object
        nextTrack = playListArray[currentIndex + 1];
      }
    } else {
      // If no matching id is found, return null
      return null;
    }
    if (nextTrack) {
      window.sessionStorage.setItem("playerId", nextTrack?.track?.id); // Dispatch a custom event to notify the player component
      window.dispatchEvent(new Event("trackIdUpdated"));
    }
  }
}
export default NextTrack;
