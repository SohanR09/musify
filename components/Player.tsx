// components/Player.tsx
const Player = () => {
  return (
    <div className="bg-balck fixed bottom-0 w-full p-4 flex items-center justify-between h-20">
      <div className="flex items-center">
        <img
          src="https://via.placeholder.com/64"
          alt="Track"
          className="w-16 h-16 rounded"
        />
        <div className="ml-4">
          <h3 className="text-white">Track Title</h3>
          <p className="text-gray-400">Artist Name</p>
        </div>
      </div>
      <div className="flex space-x-4">
        <button className="bg-green-500 hover:bg-green-600 p-2 rounded-full">
          Play
        </button>
        <button className="bg-gray-600 hover:bg-gray-500 p-2 rounded-full">
          Pause
        </button>
      </div>
    </div>
  );
};

export default Player;
