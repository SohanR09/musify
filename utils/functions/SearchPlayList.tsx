const serachPlayList = ({
  tempfinalPLayList,
  searchQuery,
}: {
  tempfinalPLayList: any;
  searchQuery: string;
}) => {
  let tempSearch;

  tempfinalPLayList?.length > 0 &&
    searchQuery?.length > 0 &&
    (tempSearch = tempfinalPLayList?.filter(({ name }: { name: string }) =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    ));

  if (tempSearch?.length > 0) return tempSearch;
};

export default serachPlayList;
