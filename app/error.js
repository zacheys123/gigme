"use client";
const ErrorPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <h2>An Error has Occured</h2>
      <h3>The cause might be:</h3>
      <ul>
        <li>Network problems,check that you are connected to the internet.</li>
        <li>
          Check your Time And Date settings,make sure they are correct
        </li>{" "}
        <li>Check with the service provider to see the problem</li>{" "}
        <li>Check whether its the correct URL</li>
      </ul>
    </div>
  );
};
export default ErrorPage;
