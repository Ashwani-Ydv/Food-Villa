const Shimmer = () => {
  return (
    <div data-testId="shimmer" className="mt-20 flex justify-center flex-wrap">
      {Array(10)
        .fill("")
        .map((e, index) => (
          <div
            key={index}
            className="w-64 h-64 m-8 border-2 p-2 hover:shadow-2xl bg-gray-300"
          >
            <p></p>
            <p></p>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
